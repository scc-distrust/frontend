import { writable } from "svelte/store";

export type Color = "purple" | "red" | "blue" | "yellow";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
export const randomSeed = () => {
  let seed = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    seed += alphabet[randomIndex];
  }
  return seed;
};

export const profilePicture = writable<string>(randomSeed());
