/* =========================================================================
   icons.js — inline SVG icon set for design-preview mockups.
   Renders any <i data-icon="name"></i> as an inline SVG (stroke-based, 1.5w).
   Names loosely mirror FontAwesome solid icons used by web-svelte so the
   migration to real FA classes is a 1:1 swap. No external requests.
   ========================================================================= */
(function () {
	const paths = {
		// navigation / general
		'grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
		'home': '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>',
		'gauge': '<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="m13.4 10.6 4-4"/><path d="M4 18a8 8 0 1 1 16 0"/>',
		'comments': '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/>',
		'key': '<circle cx="8" cy="8" r="5"/><path d="m11.5 11.5 8 8"/><path d="m17 17 2-2"/><path d="m14 14 2-2"/>',
		'cube': '<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="m3 7 9 5 9-5"/><path d="M12 22V12"/>',
		'microchip': '<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
		'chart-line': '<path d="M3 3v18h18"/><path d="m7 14 3-3 3 2 5-6"/>',
		'chart-bar': '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="8" rx="1"/><rect x="10.5" y="7" width="3" height="12" rx="1"/><rect x="16" y="13" width="3" height="6" rx="1"/>',
		'plus': '<path d="M12 5v14M5 12h14"/>',
		'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
		'arrow-up': '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
		'arrow-down': '<path d="M12 5v14"/><path d="m6 13 6 6 6-6"/>',
		'chevron-down': '<path d="m6 9 6 6 6-6"/>',
		'chevron-right': '<path d="m9 6 6 6-6 6"/>',
		'chevron-left': '<path d="m15 6-6 6 6 6"/>',
		'xmark': '<path d="M6 6l12 12M18 6 6 18"/>',
		'check': '<path d="m5 12 5 5L19 7"/>',
		'circle-check': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
		'circle-info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
		'triangle-exclamation': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
		'magnifying-glass': '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
		'gear': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.8.4l-.1.1a2 2 0 1 1-2.8-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 9a1.7 1.7 0 0 0-.4-1.8l-.1-.1a2 2 0 1 1 2.9-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.4l.1-.1a2 2 0 1 1 2.8 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
		'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
		'users': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 21a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 7"/><path d="M18.5 21a6.5 6.5 0 0 0-3-5.5"/>',
		'user-plus': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 21a6.5 6.5 0 0 1 13 0"/><path d="M19 8v6M22 11h-6"/>',
		'building': '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M10 21v-3h4v3"/>',
		'shield': '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/>',
		'shield-halved': '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="M12 4v16" opacity=".4"/>',
		'download': '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
		'upload': '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
		'bolt': '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
		'fire': '<path d="M12 2c1 3-1 4-2 6s0 4 1 4 1-2 2-2 2 2 1 4-3 3-4 3a6 6 0 0 1-6-6c0-4 4-5 4-9 0 0 3 1 4 0Z"/>',
		'wand-sparkles': '<path d="m3 21 12-12"/><path d="M18 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/><path d="M21 3v4M23 5h-4M6 3v2M7 4H5M19 14v2M20 15h-2"/>',
		'paper-plane': '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/>',
		'paperclip': '<path d="m21 11-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L16 6"/>',
		'copy': '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
		'trash': '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M10 11v6M14 11v6"/>',
		'pencil': '<path d="m4 20 0-4L16 4l4 4L8 20H4Z"/><path d="m14 6 4 4"/>',
		'dots': '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
		'filter': '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
		'sort': '<path d="M7 4v16"/><path d="m4 7 3-3 3 3"/><path d="M17 20V4"/><path d="m14 17 3 3 3-3"/>',
		'circle-dot': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>',
		'pause': '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
		'play': '<path d="M7 5v14l12-7L7 5Z"/>',
		'refresh': '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
		'folder': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
		'file': '<path d="M14 3v5h5"/><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z"/>',
		'link': '<path d="M10 14a4 4 0 0 0 6 .5l3-3a4 4 0 0 0-5.6-5.6L12 7"/><path d="M14 10a4 4 0 0 0-6-.5l-3 3a4 4 0 0 0 5.6 5.6L12 17"/>',
		'book': '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
		'database': '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
		'server': '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
		'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
		'bell': '<path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
		'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.5 3.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5"/>',
		'moon': '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
		'spinner': '<path d="M12 3a9 9 0 1 0 9 9" style="fill:none"/>',
		'tag': '<path d="M3 3h7l11 11-7 7L3 10V3Z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
		'star': '<path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.6 1-6L3.3 9.4l6-.9L12 3Z"/>',
		'eye': '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
		'grip': '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
		'lock': '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
		'envelope': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
		'sign-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
		'code-branch': '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="8" r="2.5"/><path d="M6 8.5v7"/><path d="M18 10.5c0 4-6 2-6 6"/>',
		'terminal': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/>',
		'plug': '<path d="M9 2v6M15 2v6"/><path d="M7 8h10v3a5 5 0 0 1-10 0V8Z"/><path d="M12 16v6"/>',
		'list': '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
		'image': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
		'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
	};

	function render() {
		document.querySelectorAll('i[data-icon], span[data-icon]').forEach(function (el) {
			const name = el.getAttribute('data-icon');
			const svg = paths[name];
			if (!svg) { el.textContent = '·'; return; }
			const size = el.getAttribute('data-size') || '1em';
			el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="display:block">' + svg + '</svg>';
			el.style.display = 'inline-flex';
			el.style.alignItems = 'center';
			el.style.justifyContent = 'center';
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', render);
	} else {
		render();
	}
	// expose for re-render after dynamic DOM changes
	window.__renderIcons = render;
})();
