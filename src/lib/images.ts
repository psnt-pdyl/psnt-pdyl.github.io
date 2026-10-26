import type { ImageMetadata } from 'astro';

// Every image in src/assets/img, imported so Astro's <Image> can resize and convert it at build time.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{png,jpg,jpeg,webp}', { eager: true });

/** Look up an image by the path used in the content data, e.g. 'img/p1-workflow.png' → src/assets/img/p1-workflow.png. */
export function image(path: string): ImageMetadata {
	const file = files[`../assets/${path}`];
	if (!file) throw new Error(`Image not found: src/assets/${path}`);
	return file.default;
}
