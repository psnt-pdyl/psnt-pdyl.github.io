// Tailwind class strings shared by several components.
import type { CatKey } from '../data/portfolio';

export const catColor: Record<CatKey, string> = {
	academic: 'bg-accent-soft text-accent',
	professional: 'bg-warn-soft text-warn',
	other: 'bg-ok-soft text-ok',
};

export const lead = 'font-sans text-[14px] text-muted mb-[22px]';

/** Detail line under a CV entry. */
export const small = 'block font-sans text-[13.5px]/[normal] text-muted';

export const row = 'flex flex-wrap gap-1.5';

/** Rounded pill shape shared by the active-filter chips and the skills on project tiles. */
export const pill = 'rounded-full border border-line bg-surface font-sans font-medium';

/** Smaller and muted so it doesn't compete with the tile title. */
export const skillTag = `${pill} px-2 py-0.5 text-[11.5px]/[normal] text-muted`;
