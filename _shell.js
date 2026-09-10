/* =========================================================================
   _shell.js — Ember v2 app shell (sidebar + topbar + mobile nav)
   A page sets <body data-page="dashboard"> and calls EmberShell.mount().
   New in v2: theme toggle, Cmd+K palette trigger, off-canvas mobile
   sidebar, notification dot, demo-action toasts.
   >> SVELTE: mirrors sveltekit/src/lib/ember/Shell.svelte
   ========================================================================= */
(function () {
	const NAV = [
		{ section: 'Workspace' },
		{ id: 'dashboard', label: 'Dashboard', icon: 'gauge', href: 'dashboard.html' },
		{ id: 'chat', label: 'Chat', icon: 'comments', href: 'chat.html' },
		{ id: 'history', label: 'History', icon: 'history', href: '#' },
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
	.sidebar { width: 232px; flex: none; background: rgb(var(--tw-card) / 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-right: 1px solid var(--color-border); display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; z-index: 30; }
	.sidebar-brand { padding: .875rem 1rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: .625rem; text-decoration: none; }
	.sidebar-brand .logo { width: 30px; height: 30px; border-radius: 8px; background-image: linear-gradient(135deg, #F59E0B, #F43F5E); display: grid; place-items: center; color: #fff; font-weight: 800; font-size: 15px; box-shadow: 0 2px 14px rgb(244 63 94 / .35); flex: none; transition: transform .2s var(--ease-spring, cubic-bezier(.34,1.56,.64,1)), box-shadow .2s ease; }
	.sidebar-brand:hover .logo { transform: rotate(-8deg) scale(1.05); box-shadow: 0 4px 22px rgb(244 63 94 / .5); }
	.sidebar-brand .brand-name { font-size: 14px; font-weight: 600; color: var(--color-foreground); }
	.sidebar-brand .brand-sub { font-size: 10px; color: var(--color-subtle); font-family: var(--font-mono); }
	.sidebar-nav { padding: .5rem; flex: 1; overflow-y: auto; }
	.sidebar-section-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: var(--color-subtle); padding: .875rem .5rem .375rem; }
	.nav-item { display: flex; align-items: center; gap: .625rem; padding: .42rem .5rem; border-radius: var(--radius-sm); font-size: 13px; color: var(--color-muted-foreground); text-decoration: none; transition: background-color .12s ease, color .12s ease, transform .12s ease; margin-bottom: 1px; }
	.nav-item:hover { background: var(--color-accent); color: var(--color-foreground); }
	.nav-item:active { transform: scale(.985); }
	.nav-item.active { background: rgb(var(--tw-primary) / 0.12); color: var(--color-primary); font-weight: 500; }
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
	.topbar { height: 52px; flex: none; background: rgb(var(--tw-card) / 0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: .6rem; padding: 0 1rem; position: sticky; top: 0; z-index: 10; }
	.topbar-search { flex: 1; max-width: 360px; height: 32px; background: var(--color-background); border: 1px solid var(--color-border); border-radius: var(--radius-sm); display: flex; align-items: center; gap: .5rem; padding: 0 .625rem; font-size: 12.5px; color: var(--color-subtle); cursor: pointer; transition: border-color .15s ease, box-shadow .15s ease; }
	.topbar-search:hover { border-color: var(--color-border-strong); }
	.topbar-search .kbd-hint { margin-left: auto; display: flex; gap: 2px; }
	.topbar-spacer { flex: 1; }
	.icon-btn { position: relative; }
	.icon-btn .dot { position: absolute; top: 6px; right: 7px; width: 7px; height: 7px; border-radius: 50%; background: var(--color-primary); box-shadow: 0 0 8px rgb(244 63 94 / .8); border: 1.5px solid var(--color-card); }
	.mobile-scrim { position: fixed; inset: 0; z-index: 28; background: rgb(0 0 0 / .5); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity .25s ease; }
	.mobile-scrim.open { opacity: 1; pointer-events: auto; }
	#ember-burger { display: none; }
	.content { flex: 1; padding: 1.5rem; width: 100%; max-width: 1440px; margin: 0 auto; }
	.content-tight { padding: 1rem 1.5rem; }
	@media (max-width: 880px) {
		#ember-burger { display: inline-grid; }
		.sidebar { position: fixed; top: 0; left: 0; bottom: 0; height: 100dvh; transform: translateX(-105%); transition: transform .28s cubic-bezier(.16,1,.3,1); background: var(--color-card); box-shadow: 20px 0 60px rgb(0 0 0 / .45); }
		.sidebar.open { transform: none; }
	}
	`;

	const EmberShell = {
		mount(target) {
			const page = document.body.getAttribute('data-page') || '';
			const style = document.createElement('style');
			style.textContent = SHELL_CSS;
			document.head.appendChild(style);
			document.body.classList.add('ember-atmo');

			const navHTML = NAV.map(item => {
				if (item.section) return `<div class="sidebar-section-label">${item.section}</div>`;
				const active = item.id === page || (page === 'admin-users' && item.id === 'users') || (page === 'admin-models' && item.id === 'admin-models') ? ' active' : '';
				const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
				const demo = item.href === '#' ? ' data-demo-nav' : '';
				return `<a href="${item.href}" class="nav-item${active}"${demo}><span class="nav-icon"><i data-icon="${item.icon}" data-size="15"></i></span>${item.label}${badge}</a>`;
			}).join('');

			const shell = document.createElement('div');
			shell.className = 'app-shell';
			shell.innerHTML = `
				<div class="mobile-scrim" id="ember-scrim"></div>
				<aside class="sidebar" id="ember-sidebar">
					<a href="tokens.html" class="sidebar-brand">
						<div class="logo">E</div>
						<div>
							<div class="brand-name">AIGateway</div>
							<div class="brand-sub">v7.0.0 · ember</div>
						</div>
					</a>
					<nav class="sidebar-nav">${navHTML}</nav>
					<div class="sidebar-footer">
						<a href="#" class="user-chip" data-demo-nav>
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
						<button class="icon-btn" id="ember-burger" aria-label="Menu"><i data-icon="sidebar" data-size="16"></i></button>
						<div class="topbar-search" data-palette-open role="button" tabindex="0" aria-label="Search (Cmd+K)">
							<i data-icon="magnifying-glass" data-size="14"></i>
							<span>Search or jump to…</span>
							<span class="kbd-hint"><kbd>⌘</kbd><kbd>K</kbd></span>
						</div>
						<div class="topbar-spacer"></div>
						<span class="badge badge-success badge-dot hidden" id="ember-live" style="margin-right:.25rem">live</span>
						<button class="icon-btn" data-palette-open aria-label="Commands"><i data-icon="command" data-size="15"></i></button>
						<button class="icon-btn" id="ember-bell" aria-label="Notifications"><i data-icon="bell" data-size="15"></i><span class="dot"></span></button>
						<div class="divider-vertical" style="height:20px"></div>
						<button class="icon-btn" data-theme-toggle aria-label="Toggle theme"><i data-icon="sun" data-size="15" data-theme-icon></i></button>
					</header>
					<main class="content" id="ember-content"></main>
				</div>`;
			const existing = target || document.getElementById('page-root');
			if (existing) {
				document.body.insertBefore(shell, existing);
				const contentSlot = document.getElementById('ember-content');
				contentSlot.innerHTML = existing.innerHTML;
				existing.remove();
			} else {
				document.body.appendChild(shell);
			}

			// mobile sidebar
			const sidebar = document.getElementById('ember-sidebar');
			const scrim = document.getElementById('ember-scrim');
			const setMobile = (open) => {
				sidebar.classList.toggle('open', open);
				scrim.classList.toggle('open', open);
			};
			document.getElementById('ember-burger').addEventListener('click', () => setMobile(true));
			scrim.addEventListener('click', () => setMobile(false));

			// demo nav links -> toast instead of dead-ends
			shell.addEventListener('click', (e) => {
				const demo = e.target.closest('[data-demo-nav]');
				if (demo) {
					e.preventDefault();
					setMobile(false);
					if (window.EmberToast) window.EmberToast.info('Mockup link', '“' + demo.textContent.trim().split('\n')[0] + '” isn’t part of this preview.');
				}
			});

			// notifications demo
			document.getElementById('ember-bell').addEventListener('click', () => {
				if (window.EmberToast) {
					window.EmberToast.success('All systems operational', 'p99 latency 1.2s · 0 errors in the last hour.');
				}
				const dot = document.querySelector('#ember-bell .dot');
				if (dot) dot.remove();
			});

			if (window.__renderIcons) window.__renderIcons();
		}
	};
	window.EmberShell = EmberShell;
})();
