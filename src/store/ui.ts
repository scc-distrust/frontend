import { writable } from "svelte/store";

export const page = writable<string>('login');
export const task = writable<string | null>(null);
export const cardClicked = writable<null | (() => void)>(null);
