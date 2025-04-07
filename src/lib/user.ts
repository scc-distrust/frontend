import { writable, get } from "svelte/store";
import { Player, Role } from "./backend";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
export const randomSeed = (size: number = 10) => {
  let seed = "";
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    seed += alphabet[randomIndex];
  }
  return seed;
};

export const debugging = writable<boolean>(false);
export const isHost = writable<boolean>(true);
export const self = writable<Player | null>(null);
export const selfId = writable<string>(randomSeed(24));
export const profilePicture = writable<string>(randomSeed());
export const role = writable<Role>("Worker");
export const calledMeeting = writable<boolean>(false);
export const devPage = writable<boolean>(false);

export const toggleDevPage = () => {
  devPage.set(!get(devPage));
}