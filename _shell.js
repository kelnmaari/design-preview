/* =========================================================================
   _shell.js — shared app shell (sidebar + topbar) for page mockups.
   A page sets <body data-page="dashboard"> and calls EmberShell.mount().
   The shell reads the page id to highlight the active nav item.
   ========================================================================= */
(function () {
	const NAV = [
		{ section: 'Workspace' },
		{ id: 'dashboard', label: 'Dashboard', icon: 'gauge', href: 'dashboard.html' },
		{ id: 'chat', label: 'Chat', icon: 'comments', href: 'chat.html' },
		{ id: 'history', label: 'History', icon: 'clock', href: '#' },
		{ id: 'api-keys', label: 'API Keys', icon: 'key', href: 'api-keys.html', badge: '3' },
		{ id: 'files', label: 'Files', icon: 'folder', href: '#' },
		{ section: 'Platform' },
		{ id: 'models', label: 'Models', icon: 'microchip', href: '#' },
		{ id: 'rag', label: 'RAG', icon: 'database', href: '#' },
		{ id: 'mcp', label: 'MCP', icon: 'plug', href: '#' },
		{ id: 'gitlab', label: 'GitLab', icon: 'code-branch', href: '#' },
		{ id: 'monitor', label: 'Monitor', icon: 'chart-line', href: '#' },
		{ section: 'Admin' },
		{ id: 'users', label: 'Users', icon: 'users', href: 'admin-users.html' },
		{ id: 'admin-models', label: 'Models', icon: 'cube', href: 'admin-models-before-after.html' },
		{ id: 'settings', label: 'Settings', icon: 'gear', href: '#' },
	];

	const SHELL_CSS = `
	.app-shell { display: flex; min-height: 100vh; }
	.sidebar { width: 232px; flex: none; background: var(--color-card); border-right: 1px solid var(--color-border); display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; }
	.sidebar-brand { padding: .875rem 1rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: .625rem; text-decoration: none; }
	.sidebar-brand .logo { width: 30px; height: 30px; border-radius: 8px; background-image: linear-gradient(135deg, #F59E0B, #F43F5E); display: grid; place-items: center; color: #fff; font-weight: 800; font-size: 15px; box-shadow: 0 2px 14px rgb(244 63 94 / .35); flex: none; }
	.sidebar-brand .brand-name { font-size: 14px; font-weight: 600; color: var(--color-foreground); }
	.sidebar-brand .brand-sub { font-size: 10px; color: var(--color-subtle); font-family: var(--font-mono); }
	.sidebar-nav { padding: .5rem; flex: 1; overflow-y: auto; }
	.sidebar-section-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: var(--color-subtle); padding: .875rem .5rem .375rem; }
	.nav-item { display: flex; align-items: center; gap: .625rem; padding: .4rem .5rem; border-radius: var(--radius-sm); font-size: 13px; color: var(--color-muted-foreground); text-decoration: none; transition: background-color .12s ease, color .12s ease; margin-bottom: 1px; }
	.nav-item:hover { background: var(--color-accent); color: var(--color-foreground); }
	.nav-item.active { background: rgb(var(--tw-primary) / 0.12); color: var(--color-primary); }
	.nav-item .nav-icon { width: 16px; display: inline-flex; justify-content: center; opacity: .85; }
	.nav-badge { margin-left: auto; font-size: 10px; font-family: var(--font-mono); padding: 1px 5px; border-radius: 9999px; background: var(--color-muted); color: var(--color-muted-foreground); }
	.nav-item.active .nav-badge { background: rgb(var(--tw-primary) / 0.2); color: var(--color-primary); }
	.sidebar-footer { padding: .625rem; border-top: 1px solid var(--color-border); }
	.user-chip { display: flex; align-items: center; gap: .5rem; padding: .4rem; border-radius: var(--radius-sm); text-decoration: none; transition: background-color .12s ease; }
	.user-chip:hover { background: var(--color-accent); }
	.user-chip .avatar { width: 26px; height: 26px; font-size: 10px; }
	.user-chip .u-name { font-size: 12.5px; font-weight: 500; color: var(--color-foreground); }
	.user-chip .u-role { font-size: 10.5px; color: var(--color-subtle); }

	.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
	.topbar { height: 52px; flex: none; background: rgb(var(--tw-card) / 0.82); backdrop-filter: blur(10px); border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: .75rem; padding: 0 1rem; position: sticky; top: 0; z-index: 10; }
	.topbar-search { flex: 1; max-width: 360px; height: 30px; background: var(--color-background); border: 1px solid var(--color-border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: .5rem; padding: 0 .625rem; font-size: 12.5px; color: var(--color-subtle); }
	.topbar-search .kbd-hint { margin-left: auto; display: flex; gap: 2px; }
	.topbar-spacer { flex: 1; }
	.icon-btn { width: 30px; height: 30px; border-radius: var(--radius-sm); display: grid; place-items: center; color: var(--color-muted-foreground); transition: background-color .12s ease, color .12s ease; }
	.icon-btn:hover { background: var(--color-accent); color: var(--color-foreground); }
	.content { flex: 1; padding: 1.5rem; width: 100%; }
	.content-tight { padding: 1rem 1.5rem; }
	@media (max-width: 880px) { .sidebar { display: none; } }
	`;

	const EmberShell = {
		mount(target) {
			const page = document.body.getAttribute('data-page') || '';
			// inject shell css
			const style = document.createElement('style');
			style.textContent = SHELL_CSS;
			document.head.appendChild(style);

			const navHTML = NAV.map(item => {
				if (item.section) return `<div class="sidebar-section-label">${item.section}</div>`;
				const active = item.id === page || (page === 'admin-users' && item.id === 'users') ? ' active' : '';
				const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
				return `<a href="${item.href}" class="nav-item${active}"><span class="nav-icon"><i data-icon="${item.icon}" data-size="15"></i></span>${item.label}${badge}</a>`;
			}).join('');

			const shell = document.createElement('div');
			shell.className = 'app-shell';
			shell.innerHTML = `
				<aside class="sidebar">
					<a href="tokens.html" class="sidebar-brand">
						<div class="logo">E</div>
						<div>
							<div class="brand-name">AIGateway</div>
							<div class="brand-sub">v7.0.0 · ember</div>
						</div>
					</a>
					<nav class="sidebar-nav">${navHTML}</nav>
					<div class="sidebar-footer">
						<a href="#" class="user-chip">
							<span class="avatar">AK</span>
							<div style="min-width:0">
								<div class="u-name truncate">Alex Kim</div>
								<div class="u-role">admin · acme</div>
							</div>
							<i data-icon="chevron-right" data-size="13" class="text-subtle" style="margin-left:auto"></i>
						</a>
					</div>
				</aside>
				<div class="main">
					<header class="topbar">
						<button class="icon-btn"><i data-icon="grid" data-size="16"></i></button>
						<div class="topbar-search">
							<i data-icon="magnifying-glass" data-size="14"></i>
							<span>Search or jump to…</span>
							<span class="kbd-hint"><kbd>⌘</kbd><kbd>K</kbd></span>
						</div>
						<div class="topbar-spacer"></div>
						<button class="icon-btn"><i data-icon="download" data-size="15"></i></button>
						<button class="icon-btn"><i data-icon="bell" data-size="15"></i></button>
						<div class="divider-vertical" style="height:20px"></div>
						<button class="icon-btn"><i data-icon="sun" data-size="15"></i></button>
					</header>
					<main class="content" id="ember-content"></main>
				</div>`;
			// Preserve any existing content into the content slot
			const existing = target || document.getElementById('page-root');
			if (existing) {
				document.body.insertBefore(shell, existing);
				const contentSlot = document.getElementById('ember-content');
				contentSlot.innerHTML = existing.innerHTML;
				existing.remove();
			} else {
				document.body.appendChild(shell);
			}
			if (window.__renderIcons) window.__renderIcons();
		}
	};
	window.EmberShell = EmberShell;
})();
