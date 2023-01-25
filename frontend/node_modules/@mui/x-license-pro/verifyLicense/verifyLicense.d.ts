import { LicenseStatus } from '../utils/licenseStatus';
export declare function generateReleaseInfo(): string;
export declare function verifyLicense(releaseInfo: string, encodedLicense: string | undefined): LicenseStatus;
