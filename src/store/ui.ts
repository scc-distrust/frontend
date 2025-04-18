import { writable } from "svelte/store";

export const cardClicked = writable<null | (() => void)>(null);
