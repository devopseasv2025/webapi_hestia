export class RegexUtils {

    public static isValidMacAddress(macAddress?: string): boolean {

        if (!macAddress || macAddress.length === 0) {
            return false;
        }

        // Regular expression to validate MAC address format
        const macAddressRegex: RegExp = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return macAddressRegex.test(macAddress);
    }


}