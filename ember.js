/* =========================================================================
   ember.js — Ember v2 interaction library (zero dependencies)
   Theme · spotlight · reveal-on-scroll · counters · bars · command
   palette · tabs · dropdowns · copy-to-clipboard · toasts.
   Auto-initializes on DOMContentLoaded. Safe to include on every page.
   >> SVELTE: logic mirrors sveltekit/src/lib/ember/actions.svelte.ts
   ========================================================================= */
(function () {
	'use strict';

	const $ = (sel, root) => (root || document).querySelector(sel);
	const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

	/* ------------------------------------------------------------------
	   1. THEME — persisted dark/light, html.ember <-> html.ember-light
	------------------------------------------------------------------ */
	const THEME_KEY = 'ember-theme';
	const THEME_ORDER = ['ember', 'midnight', 'forest', 'light', 'frost', 'sand'];
	const THEME_CLASSES = ['ember', 'ember-midnight', 'ember-forest', 'ember-light', 'ember-frost', 'ember-sand'];
	const THEME_MODES = { ember: 'dark', midnight: 'dark', forest: 'dark', light: 'light', frost: 'light', sand: 'light' };
	const EmberTheme = {
		get() {
			try {
				const raw = localStorage.getItem(THEME_KEY) || 'ember';
				if (raw === 'dark') return 'ember'; // legacy value
				return THEME_ORDER.includes(raw) ? raw : 'ember';
			} catch (e) { return 'ember'; }
		},
		apply(theme) {
			if (!THEME_ORDER.includes(theme)) theme = 'ember';
			const root = document.documentElement;
			THEME_CLASSES.forEach(c => root.classList.remove(c));
			root.classList.add(theme === 'ember' ? 'ember' : 'ember-' + theme);
			root.style.colorScheme = THEME_MODES[theme];
			$$('[data-theme-pill] button').forEach(b => {
				b.classList.toggle('active', b.dataset.themeBtn === theme);
			});
			$$('[data-theme-icon]').forEach(el => {
				el.setAttribute('data-icon', THEME_MODES[theme] === 'light' ? 'moon' : 'sun');
			});
			if (window.__renderIcons) window.__renderIcons();
		},
		toggle() {
			const order = THEME_ORDER;
			const next = order[(order.indexOf(this.get()) + 1) % order.length];
			try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
			this.apply(next);
			return next;
		},
		init() {
			this.apply(this.get());
			document.addEventListener('click', (e) => {
				const t = e.target.closest('[data-theme-toggle]');
				if (t) { this.toggle(); return; }
				const pill = e.target.closest('[data-theme-pill] button');
				if (pill && pill.dataset.themeBtn) {
					try { localStorage.setItem(THEME_KEY, pill.dataset.themeBtn); } catch (err) {}
					this.apply(pill.dataset.themeBtn);
				}
			});
		}
	};

	/* ------------------------------------------------------------------
	   2. SPOTLIGHT — cursor-tracking glow for .spotlight / .spotlight-border
	------------------------------------------------------------------ */
	function initSpotlight() {
		const cards = $$('.spotlight, .spotlight-border');
		if (!cards.length) return;
		cards.forEach(card => {
			card.addEventListener('pointermove', (e) => {
				const r = card.getBoundingClientRect();
				card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
				card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
			});
		});
	}

	/* ------------------------------------------------------------------
	   3. REVEAL-ON-SCROLL — .reveal gains .in via IntersectionObserver
	   Stagger: data-reveal-delay="80" (ms) or parent [data-reveal-group]
	------------------------------------------------------------------ */
	function initReveal() {
		const els = $$('.reveal:not(.in)');
		if (!els.length) return;
		$$('[data-reveal-group]').forEach(group => {
			Array.from(group.querySelectorAll('.reveal')).forEach((child, i) => {
				if (!child.style.getPropertyValue('--reveal-delay')) {
					child.style.setProperty('--reveal-delay', (i * 70) + 'ms');
				}
			});
		});
		if (!('IntersectionObserver' in window)) {
			els.forEach(el => el.classList.add('in'));
			return;
		}
		const io = new IntersectionObserver((entries) => {
			entries.forEach(en => {
				if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
		els.forEach(el => io.observe(el));
	}

	/* ------------------------------------------------------------------
	   4. ANIMATED COUNTERS — <span data-count="2418" data-format="int">
	   formats: int (2,418) · compact (84.2k) · plain
	------------------------------------------------------------------ */
	function formatNum(v, fmt) {
		if (fmt === 'compact') {
			if (v >= 1e6) return (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
			if (v >= 1e4) return (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
			if (v >= 1e3) return (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
			return String(Math.round(v));
		}
		if (fmt === 'plain') return String(Math.round(v));
		return Math.round(v).toLocaleString('en-US');
	}
	function initCounters() {
		const els = $$('[data-count]');
		if (!els.length) return;
		const run = (el) => {
			if (el.dataset.done) return;
			el.dataset.done = '1';
			const target = parseFloat(el.dataset.count);
			const fmt = el.dataset.format || 'int';
			const dur = 1100;
			const t0 = performance.now();
			const tick = (t) => {
				const p = Math.min(1, (t - t0) / dur);
				const eased = 1 - Math.pow(1 - p, 3);
				el.textContent = formatNum(target * eased, fmt);
				if (p < 1) requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		};
		if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
		const io = new IntersectionObserver((entries) => {
			entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
		}, { threshold: 0.4 });
		els.forEach(el => io.observe(el));
	}

	/* ------------------------------------------------------------------
	   5. ANIMATED BARS — .bars.animate staggers .bar grow; hover tips
	------------------------------------------------------------------ */
	function initBars() {
		$$('.bars.animate').forEach(wrap => {
			Array.from(wrap.querySelectorAll('.bar')).forEach((bar, i) => {
				bar.style.animationDelay = Math.min(i * 28, 900) + 'ms';
			});
		});
		// range switcher: [data-range-btn="7|30|90"] regenerates sibling bars
		$$('[data-range-btn]').forEach(btn => {
			btn.addEventListener('click', () => {
				const group = btn.closest('[data-range-group]');
				if (group) $$('[data-range-btn]', group).forEach(b => b.classList.toggle('active', b === btn));
				const target = document.querySelector(btn.dataset.rangeTarget || '#token-bars');
				if (!target) return;
				const n = parseInt(btn.dataset.rangeBtn, 10) || 30;
				const bars = Array.from(target.querySelectorAll('.bar'));
				// deterministic pseudo-random heights (seeded, stable per range)
				let seed = n * 7919 + 13;
				const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
				bars.forEach((bar, i) => {
					const on = i < n || (bars.length <= 31 && n === 30);
					bar.style.display = (bars.length > n && i >= n && n !== 30) ? 'none' : '';
					if (!on && bars.length > n) return;
					const h = 24 + Math.round(rnd() * 68);
					bar.style.height = h + '%';
					bar.style.opacity = h > 88 ? '1' : (h > 70 ? '.75' : '.55');
					bar.style.animation = 'none';
					void bar.offsetWidth;
					bar.style.animation = '';
					bar.style.animationDelay = Math.min(i * 18, 700) + 'ms';
					const tip = bar.querySelector('.bar-tip');
					if (tip) tip.textContent = (h * 1.9).toFixed(1) + 'k tok';
				});
				const total = btn.dataset.rangeTotal;
				if (total) $$('[data-range-total]').forEach(el => { el.textContent = total; });
			});
		});
	}

	/* ------------------------------------------------------------------
	   6. TABS — .tabs > .tab toggles .active (+ [data-tab-panel] panels)
	------------------------------------------------------------------ */
	function initTabs() {
		$$('.tabs').forEach(tabs => {
			const list = Array.from(tabs.querySelectorAll('.tab'));
			list.forEach(tab => {
				tab.addEventListener('click', () => {
					list.forEach(t => t.classList.toggle('active', t === tab));
					const panels = tabs.parentElement ? tabs.parentElement.querySelectorAll('[data-tab-panel]') : [];
					if (panels.length) {
						const idx = list.indexOf(tab);
						panels.forEach((p, i) => p.classList.toggle('hidden', i !== idx));
					}
				});
			});
		});
	}

	/* ------------------------------------------------------------------
	   7. DROPDOWNS — .dropdown > [data-menu-btn] toggles .open
	------------------------------------------------------------------ */
	function initDropdowns() {
		document.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-menu-btn]');
			const open = $('.dropdown.open');
			if (btn) {
				const dd = btn.closest('.dropdown');
				const willOpen = dd && !dd.classList.contains('open');
				if (open) open.classList.remove('open');
				if (dd && willOpen) dd.classList.add('open');
				e.stopPropagation();
				return;
			}
			if (open && !e.target.closest('.dropdown')) open.classList.remove('open');
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') $$('.dropdown.open').forEach(d => d.classList.remove('open'));
		});
	}

	/* ------------------------------------------------------------------
	   8. COPY-TO-CLIPBOARD — [data-copy] copies value/text + toast
	------------------------------------------------------------------ */
	function initCopy() {
		document.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-copy]');
			if (!btn) return;
			const text = btn.dataset.copy || (btn.closest('[data-copy-wrap]') || {}).textContent || btn.textContent;
			const done = () => {
				EmberToast.success('Copied to clipboard', (text || '').trim().slice(0, 42));
				if (window.__renderIcons) window.__renderIcons();
			};
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText((text || '').trim()).then(done).catch(done);
			} else { done(); }
		});
	}

	/* ------------------------------------------------------------------
	   9. TOASTS — EmberToast.success/info/warning/error(title, desc)
	------------------------------------------------------------------ */
	const EmberToast = {
		show(kind, title, desc, ms) {
			let stack = $('#ember-toasts');
			if (!stack) {
				stack = document.createElement('div');
				stack.id = 'ember-toasts';
				document.body.appendChild(stack);
			}
			const icons = { success: 'circle-check', info: 'circle-info', warning: 'triangle-exclamation', error: 'xmark' };
			const el = document.createElement('div');
			el.className = 'toast toast-' + (kind || 'info');
			el.innerHTML = '<div class="t-icon"><i data-icon="' + (icons[kind] || 'circle-info') + '" data-size="14"></i></div>' +
				'<div class="min-w-0"><div class="t-title"></div>' + (desc ? '<div class="t-desc"></div>' : '') + '</div>';
			el.querySelector('.t-title').textContent = title || '';
			if (desc) el.querySelector('.t-desc').textContent = desc;
			stack.appendChild(el);
			if (window.__renderIcons) window.__renderIcons();
			setTimeout(() => {
				el.classList.add('leaving');
				setTimeout(() => el.remove(), 280);
			}, ms || 3400);
		},
		success(t, d, ms) { this.show('success', t, d, ms); },
		info(t, d, ms) { this.show('info', t, d, ms); },
		warning(t, d, ms) { this.show('warning', t, d, ms); },
		error(t, d, ms) { this.show('error', t, d, ms); }
	};

	/* ------------------------------------------------------------------
	   10. COMMAND PALETTE — Cmd+K. Items from [data-cmdk-items] JSON or default.
	------------------------------------------------------------------ */
	const DEFAULT_COMMANDS = [
		{ group: 'Pages', label: 'Dashboard', hint: 'overview', icon: 'gauge', href: 'dashboard.html' },
		{ group: 'Pages', label: 'Chat', hint: 'thread', icon: 'comments', href: 'chat.html' },
		{ group: 'Pages', label: 'API Keys', hint: '156 keys', icon: 'key', href: 'api-keys.html' },
		{ group: 'Pages', label: 'Admin · Users', hint: '248 users', icon: 'users', href: 'admin-users.html' },
		{ group: 'Pages', label: 'Design Tokens', hint: 'system', icon: 'fire', href: 'tokens.html' },
		{ group: 'Pages', label: 'Components', hint: 'library', icon: 'cube', href: 'components.html' },
		{ group: 'Pages', label: 'Before / After', hint: 'case study', icon: 'wand-sparkles', href: 'admin-models-before-after.html' },
		{ group: 'Actions', label: 'Cycle theme', hint: '6 themes', icon: 'sun', action: 'theme' },
		{ group: 'Actions', label: 'New chat', hint: 'composer', icon: 'plus', href: 'chat.html' },
		{ group: 'Actions', label: 'Create API key', hint: 'panel', icon: 'key', href: 'api-keys.html' }
	];
	const EmberPalette = {
		overlay: null, input: null, list: null, items: [], selected: 0,
		build() {
			if (this.overlay) return;
			const ov = document.createElement('div');
			ov.className = 'cmdk-overlay';
			ov.id = 'ember-cmdk';
			ov.innerHTML =
				'<div class="cmdk" role="dialog" aria-label="Command palette">' +
				'<div class="cmdk-input-row"><i data-icon="magnifying-glass" data-size="15" class="text-muted-foreground"></i>' +
				'<input placeholder="Type a command or search pages…" aria-label="Search commands" />' +
				'<kbd>esc</kbd></div>' +
				'<div class="cmdk-list"></div>' +
				'<div class="cmdk-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span></div>' +
				'</div>';
			document.body.appendChild(ov);
			this.overlay = ov;
			this.input = ov.querySelector('input');
			this.list = ov.querySelector('.cmdk-list');
			if (window.__renderIcons) window.__renderIcons();
			this.input.addEventListener('input', () => this.render(this.input.value));
			this.input.addEventListener('keydown', (e) => {
				if (e.key === 'ArrowDown') { e.preventDefault(); this.move(1); }
				else if (e.key === 'ArrowUp') { e.preventDefault(); this.move(-1); }
				else if (e.key === 'Enter') { e.preventDefault(); this.run(this.items[this.selected]); }
			});
			ov.addEventListener('click', (e) => { if (e.target === ov) this.close(); });
			this.list.addEventListener('click', (e) => {
				const row = e.target.closest('.cmdk-item');
				if (row) this.run(this.items[parseInt(row.dataset.idx, 10)]);
			});
			this.list.addEventListener('mousemove', (e) => {
				const row = e.target.closest('.cmdk-item');
				if (row) { this.selected = parseInt(row.dataset.idx, 10); this.highlight(); }
			});
		},
		allCommands() {
			const holder = $('[data-cmdk-items]');
			if (holder) {
				try {
					const extra = JSON.parse(holder.dataset.cmdkItems);
					return extra.concat(DEFAULT_COMMANDS);
				} catch (e) { /* ignore */ }
			}
			return DEFAULT_COMMANDS.slice();
		},
		open() {
			this.build();
			this.input.value = '';
			this.render('');
			this.overlay.classList.add('open');
			setTimeout(() => this.input.focus(), 30);
		},
		close() { if (this.overlay) this.overlay.classList.remove('open'); },
		move(d) {
			if (!this.items.length) return;
			this.selected = (this.selected + d + this.items.length) % this.items.length;
			this.highlight();
			const row = this.list.querySelector('[data-idx="' + this.selected + '"]');
			if (row) row.scrollIntoView({ block: 'nearest' });
		},
		highlight() {
			Array.from(this.list.querySelectorAll('.cmdk-item')).forEach(row => {
				row.classList.toggle('selected', parseInt(row.dataset.idx, 10) === this.selected);
			});
		},
		render(q) {
			const query = (q || '').trim().toLowerCase();
			const cmds = this.allCommands().filter(c => !query || c.label.toLowerCase().includes(query) || (c.group || '').toLowerCase().includes(query));
			this.items = cmds;
			this.selected = 0;
			let html = '', lastGroup = '';
			cmds.forEach((c, i) => {
				if (c.group !== lastGroup) { html += '<div class="cmdk-group">' + c.group + '</div>'; lastGroup = c.group; }
				html += '<div class="cmdk-item' + (i === 0 ? ' selected' : '') + '" data-idx="' + i + '">' +
					'<span class="cmdk-icon"><i data-icon="' + (c.icon || 'arrow-right') + '" data-size="14"></i></span>' +
					'<span></span><span class="cmdk-hint"></span></div>';
			});
			this.list.innerHTML = html || '<div class="empty-state" style="padding:1.5rem;"><p class="text-sm">No results for “' + q.replace(/</g, '&lt;') + '”</p></div>';
			Array.from(this.list.querySelectorAll('.cmdk-item')).forEach((row, i) => {
				row.querySelector('span:nth-child(2)').textContent = cmds[i].label;
				row.querySelector('.cmdk-hint').textContent = cmds[i].hint || '';
			});
			if (window.__renderIcons) window.__renderIcons();
		},
		run(cmd) {
			if (!cmd) return;
			this.close();
			if (cmd.action === 'theme') { EmberTheme.toggle(); return; }
			if (cmd.href) window.location.href = cmd.href;
		},
		init() {
			document.addEventListener('keydown', (e) => {
				if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.open(); }
				else if (e.key === 'Escape' && this.overlay && this.overlay.classList.contains('open')) { this.close(); }
				else if (e.key === '/' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); this.open(); }
			});
			document.addEventListener('click', (e) => {
				if (e.target.closest('[data-palette-open]')) this.open();
			});
		}
	};

	/* ------------------------------------------------------------------
	   11. DIALOGS — [data-dialog-open="id"] / [data-dialog-close]
	------------------------------------------------------------------ */
	function initDialogs() {
		document.addEventListener('click', (e) => {
			const opener = e.target.closest('[data-dialog-open]');
			if (opener) {
				const dlg = document.getElementById(opener.dataset.dialogOpen);
				if (dlg) dlg.classList.add('open');
				return;
			}
			if (e.target.closest('[data-dialog-close]')) {
				const dlg = e.target.closest('.dialog-overlay');
				if (dlg) dlg.classList.remove('open');
				return;
			}
			if (e.target.classList && e.target.classList.contains('dialog-overlay')) {
				e.target.classList.remove('open');
			}
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') $$('.dialog-overlay.open').forEach(d => d.classList.remove('open'));
		});
	}

	/* ------------------------------------------------------------------
	   12. TABLE ROW SELECT — checkboxes toggle tr.selected + count badge
	------------------------------------------------------------------ */
	function initTableSelect() {
		$$('table.table').forEach(table => {
			const boxes = Array.from(table.querySelectorAll('tbody input[type="checkbox"]'));
			if (!boxes.length) return;
			const head = table.querySelector('thead input[type="checkbox"]');
			const sync = () => {
				const n = boxes.filter(b => b.checked).length;
				boxes.forEach(b => b.closest('tr').classList.toggle('selected', b.checked));
				if (head) {
					head.checked = n > 0 && n === boxes.length;
					head.indeterminate = n > 0 && n < boxes.length;
				}
				$$('[data-selected-count]').forEach(el => {
					el.textContent = String(n);
					const bar = el.closest('[data-bulk-bar]');
					if (bar) bar.classList.toggle('hidden', n === 0);
				});
			};
			boxes.forEach(b => b.addEventListener('change', sync));
			if (head) head.addEventListener('change', () => { boxes.forEach(b => { b.checked = head.checked; }); sync(); });
		});
	}

	/* ------------------------------------------------------------------
	   13. TABLE FILTER — [data-table-filter] live-filters tbody rows
	------------------------------------------------------------------ */
	function initTableFilter() {
		$$('[data-table-filter]').forEach(input => {
			const table = document.querySelector(input.dataset.tableFilter);
			if (!table) return;
			input.addEventListener('input', () => {
				const q = input.value.trim().toLowerCase();
				let visible = 0;
				Array.from(table.querySelectorAll('tbody tr')).forEach(tr => {
					const hit = !q || tr.textContent.toLowerCase().includes(q);
					tr.style.display = hit ? '' : 'none';
					if (hit) visible++;
				});
				$$('[data-filter-count]').forEach(el => { el.textContent = String(visible); });
			});
		});
	}

	/* ------------------------------------------------------------------
	   BOOT
	------------------------------------------------------------------ */
	function boot() {
		EmberTheme.init();
		EmberPalette.init();
		initSpotlight();
		initReveal();
		initCounters();
		initBars();
		initTabs();
		initDropdowns();
		initCopy();
		initDialogs();
		initTableSelect();
		initTableFilter();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		boot();
	}

	window.Ember = {
		theme: EmberTheme,
		toast: EmberToast,
		palette: EmberPalette
	};
	window.EmberToast = EmberToast;
})();
