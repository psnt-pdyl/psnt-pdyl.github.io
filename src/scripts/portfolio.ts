// Page behaviour: project tabs and skill filter, project pop-up, figure lightbox, active sidebar link.
// All markup is rendered at build time; this only toggles attributes on it.

const projects = [...document.querySelectorAll<HTMLElement>('[data-project]')];
const uses: Record<string, string[]> = {};
for (const p of projects) uses[p.id] = p.dataset.skills!.split(' ');
const tileOf: Record<string, HTMLButtonElement> = {};
for (const t of document.querySelectorAll<HTMLButtonElement>('[data-tile]')) tileOf[t.dataset.tile!] = t;

const tabs = document.getElementById('tabs')!;
const menu = document.getElementById('skill-menu') as HTMLDetailsElement;
const chips = document.getElementById('active-filters')!;
const pm = document.getElementById('pm')!;
const lb = document.getElementById('lb')!;

// project type tabs + skill filter. A project matches when it uses any of the selected skills.
const state = {
	cat: tabs.querySelector<HTMLElement>('[aria-selected="true"]')!.dataset.cat!,
	skills: new Set<string>(),
};
function apply() {
	let shown = 0;
	for (const p of projects) {
		p.hidden =
			(state.cat !== 'all' && p.dataset.cat !== state.cat) ||
			(state.skills.size > 0 && !uses[p.id].some((k) => state.skills.has(k)));
		tileOf[p.id].hidden = p.hidden;
		if (!p.hidden) shown++;
	}
	for (const g of document.querySelectorAll<HTMLElement>('[data-group]')) {
		g.hidden = !g.querySelector('[data-tile]:not([hidden])');
	}
	document.getElementById('empty')!.hidden = shown > 0;

	// Keep the dropdown checkboxes, its count badge and the chips in step with the selection.
	for (const box of menu.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) box.checked = state.skills.has(box.value);
	const count = menu.querySelector<HTMLElement>('[data-count]')!;
	count.textContent = String(state.skills.size);
	count.hidden = state.skills.size === 0;
	for (const c of chips.querySelectorAll<HTMLElement>('[data-remove]')) c.hidden = !state.skills.has(c.dataset.remove!);
	chips.hidden = state.skills.size === 0;
}

function selectCat(cat: string) {
	for (const x of tabs.querySelectorAll('button')) x.setAttribute('aria-selected', String(x.dataset.cat === cat));
	state.cat = cat;
}

// Each tab has a URL (/projects, /projects/academic, …). Switching tabs updates the address bar without reloading.
const tabHref = (cat: string) => tabs.querySelector<HTMLElement>(`[data-cat="${cat}"]`)!.dataset.href!;
const samePath = (a: string, b: string) => a.replace(/\/$/, '') === b.replace(/\/$/, '');
// The tab the current URL stands for; other paths (the home page) use the page's default tab.
function catFromPath() {
	for (const t of tabs.querySelectorAll<HTMLElement>('[data-href]')) {
		if (samePath(t.dataset.href!, location.pathname)) return t.dataset.cat!;
	}
	return tabs.dataset.default!;
}

tabs.addEventListener('click', (e) => {
	const b = (e.target as Element).closest<HTMLButtonElement>('button');
	if (!b) return;
	selectCat(b.dataset.cat!);
	apply();
	if (!samePath(b.dataset.href!, location.pathname)) history.pushState(null, '', b.dataset.href);
});
menu.addEventListener('change', (e) => {
	const box = e.target as HTMLInputElement;
	if (box.checked) state.skills.add(box.value);
	else state.skills.delete(box.value);
	apply();
});
chips.addEventListener('click', (e) => {
	const b = (e.target as Element).closest<HTMLButtonElement>('button');
	if (!b) return;
	if (b.dataset.remove) state.skills.delete(b.dataset.remove);
	else state.skills.clear();
	apply();
	// The dismissed chip is now hidden; keep keyboard focus nearby.
	(chips.querySelector<HTMLElement>('[data-remove]:not([hidden])') ?? menu.querySelector('summary')!).focus();
});
// Close the dropdown on an outside click or Escape.
document.addEventListener('click', (e) => {
	if (menu.open && !menu.contains(e.target as Node)) menu.open = false;
});
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && menu.open) {
		menu.open = false;
		menu.querySelector('summary')!.focus();
	}
});
// Show a project that the current tab or filter hides: switch to its tab and clear the skills.
function reveal(p: HTMLElement) {
	selectCat(p.dataset.cat!);
	state.skills.clear();
	apply();
	history.replaceState(null, '', tabHref(p.dataset.cat!) + location.hash);
}

// project pop-up, one project at a time
let current: HTMLElement | null = null;
const navButtons = pm.querySelectorAll<HTMLButtonElement>('[data-d]');
const visible = () => projects.filter((x) => !x.hidden);

function openProject(p: HTMLElement, push: boolean) {
	current = p;
	for (const x of projects) {
		const on = x === p;
		x.toggleAttribute('data-open', on);
		for (const v of x.querySelectorAll('video')) on ? v.play().catch(() => {}) : v.pause();
	}
	const vis = visible();
	const i = vis.indexOf(p);
	navButtons[0].disabled = i <= 0;
	navButtons[1].disabled = i < 0 || i >= vis.length - 1;
	pm.toggleAttribute('data-open', true);
	document.body.classList.add('overflow-hidden');
	pm.scrollTop = 0;
	if (push && location.hash !== '#' + p.id) history.pushState(null, '', '#' + p.id);
}
function closeProject() {
	if (!pm.hasAttribute('data-open')) return;
	pm.removeAttribute('data-open');
	document.body.classList.remove('overflow-hidden');
	for (const v of pm.querySelectorAll('video')) v.pause();
	if (current && tileOf[current.id]) tileOf[current.id].focus({ preventScroll: true });
	if (/^#p\d+$/.test(location.hash)) history.replaceState(null, '', '#projects');
}

for (const id in tileOf) tileOf[id].addEventListener('click', () => openProject(document.getElementById(id)!, true));
pm.querySelector('[data-close]')!.addEventListener('click', closeProject);
pm.addEventListener('click', (e) => {
	if (e.target === pm) closeProject();
});
for (const b of navButtons) {
	b.addEventListener('click', () => {
		if (!current) return;
		const vis = visible();
		const n = vis[vis.indexOf(current) + Number(b.dataset.d)];
		if (n) openProject(n, true);
	});
}
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !lb.hasAttribute('data-open')) closeProject();
});

function openFromHash() {
	const el = /^#p\d+$/.test(location.hash) && document.getElementById(location.hash.slice(1));
	if (el) {
		if (el.hidden) reveal(el);
		openProject(el, false);
	} else closeProject();
}
// Back/forward: restore the tab for the URL, then open or close the pop-up for its hash.
window.addEventListener('popstate', () => {
	const cat = catFromPath();
	if (cat !== state.cat) {
		selectCat(cat);
		apply();
	}
	openFromHash();
});
window.addEventListener('hashchange', openFromHash);

// Links to #p1, #p2… open the pop-up; other in-page links from inside it close it first.
document.addEventListener('click', (e) => {
	const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
	if (!a) return;
	const h = a.getAttribute('href')!;
	if (/^#p\d+$/.test(h)) {
		e.preventDefault();
		const el = document.getElementById(h.slice(1))!;
		if (el.hidden) reveal(el);
		openProject(el, true);
	} else if (pm.contains(a)) closeProject();
});

apply();
if (/^#p\d+$/.test(location.hash)) openFromHash();
// A /projects route opens at the projects section.
else if (tabs.dataset.onRoute !== undefined && !location.hash) {
	document.getElementById('projects')!.scrollIntoView({ behavior: 'instant' });
}

// lightbox
const lbImg = lb.querySelector('img')!;
const lbCap = lb.querySelector('p')!;
document.addEventListener('click', (e) => {
	const img = (e.target as Element).closest<HTMLImageElement>('figure img');
	if (img) {
		lbImg.src = img.dataset.full ?? img.src;
		lbCap.textContent = img.parentElement!.querySelector('figcaption')?.textContent?.trim() ?? '';
		lb.toggleAttribute('data-open', true);
	} else if ((e.target as Element).closest('#lb')) lb.removeAttribute('data-open');
});
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') lb.removeAttribute('data-open');
});

// active section in sidebar
const links = document.querySelectorAll('#toc a');
const obs = new IntersectionObserver(
	(entries) => {
		for (const e of entries) {
			if (!e.isIntersecting) continue;
			for (const a of links) {
				if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'location');
				else a.removeAttribute('aria-current');
			}
		}
	},
	{ rootMargin: '-30% 0px -60% 0px' },
);
for (const s of document.querySelectorAll('main section')) obs.observe(s);
