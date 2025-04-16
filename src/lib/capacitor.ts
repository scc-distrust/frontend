import { CallbackID, Geolocation, Position } from "@capacitor/geolocation"
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner'
import { get, writable } from "svelte/store";
import * as backend from "./backend";

export const watchID = writable<CallbackID | null>(null);
export const lastLocation = writable<Position | null>(null);
export const lastUpdate = writable<number>(0);

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
        if (position !== null && get(backend.socket)?.connected) {
            console.log(`[capacitor] Location changed to ${JSON.stringify(position)}`);

            if (position.coords.accuracy <= 12.5 && get(lastUpdate) > Date.now() - 10e3) {
                console.log(`[capacitor] Location accuracy is low, ignoring, accuracy: ${position.coords.accuracy}`);
                return;
            }

            lastUpdate.set(Date.now());
            backend.sendLocation(position);
            lastLocation.set(position);
        }
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

export const scanQr = async (): Promise<string> => {
    const result = await CapacitorBarcodeScanner.scanBarcode({
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        hint: CapacitorBarcodeScannerTypeHint.QR_CODE
    })

    return result.ScanResult;
}

export const fakeLocation = async (lat: number, lng: number) => {
    const position: Position = {
        coords: {
            latitude: lat,
            longitude: lng,
            altitude: 100,
            accuracy: 100,
            altitudeAccuracy: 100,
            heading: 0,
            speed: 0
        },
        timestamp: Date.now()
    }

    lastLocation.set(position);
    backend.sendLocation(position);
}