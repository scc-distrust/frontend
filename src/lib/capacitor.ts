import { CallbackID, Geolocation } from "@capacitor/geolocation"
import { get, writable } from "svelte/store";
import * as backend from "./backend";

export const watchID = writable<CallbackID | null>(null);

export const requestPermissions = async (): Promise<boolean> => {
    try {
        const result = await Geolocation.requestPermissions({
            permissions: ['location']
        });

        if (result.location == 'granted') return true;
        else if (result.location == 'denied') return false;

        return await requestPermissions(); // Not sure, let's try again!
    } catch (e) {
        console.error(e);

        if (e.message === "Not implemented on web.") return true;
        return false;
    }
}

export const startWatching = async () => {
    if (get(watchID) !== null) return;

    const id = await Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 2000
    }, (position) => {
        console.log(position);
        // backend.sendLocation(position);
    });

    watchID.set(id);
}

export const stopWatching = async () => {
    if (get(watchID) === null) return;

    await Geolocation.clearWatch({
        id: get(watchID)!
    });

    watchID.set(null);
}