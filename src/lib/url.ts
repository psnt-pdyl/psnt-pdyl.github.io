/**
 * Resolve a site path such as 'img/a.png' or 'projects/academic' against the site base, so it works from
 * nested routes like /projects/academic. Absolute URLs, root paths, mailto: and #hash links are returned as is.
 */
export function withBase(path: string): string {
	if (/^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(path)) return path;
	return import.meta.env.BASE_URL.replace(/\/?$/, '/') + path;
}

/**
 * Attributes for an <a>: the resolved href, plus target="_blank" for anything that leaves the page
 * (other sites and files such as PDFs). In-page #links and mailto: stay in the current tab.
 * Use as <a {...linkAttrs(href)}>.
 */
export function linkAttrs(path: string) {
	const external = !/^(?:#|mailto:|tel:)/i.test(path);
	return {
		href: withBase(path),
		...(external && { target: '_blank', rel: 'noopener noreferrer' }),
	};
}
