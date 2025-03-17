import { CapacitorBarcodeScanner, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';

export const scanQR = () => {
    CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK
    }).then((result) => {
        const scanned = result.ScanResult;
        // todo: send to backend
    })
}

export const getLocation = () => {
    Geolocation.getCurrentPosition({
        enableHighAccuracy: true
    }).then((location) => {
        // todo: send to backend
    })
}