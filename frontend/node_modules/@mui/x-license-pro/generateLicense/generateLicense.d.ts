export interface LicenseDetails {
    orderNumber: string;
    expiryDate: Date;
}
export declare function generateLicence(details: LicenseDetails): string;
