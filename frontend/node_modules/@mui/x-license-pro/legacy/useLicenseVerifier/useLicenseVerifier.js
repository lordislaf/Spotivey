import * as React from 'react';
import { verifyLicense } from '../verifyLicense/verifyLicense';
import { LicenseInfo } from '../utils/licenseInfo';
import { showExpiredLicenseError, showInvalidLicenseError, showNotFoundLicenseError } from '../utils/licenseErrorMessageUtils';
import { LicenseStatus } from '../utils/licenseStatus';
var sharedLicenseStatuses = {};
export function useLicenseVerifier(packageName, releaseInfo) {
  return React.useMemo(function () {
    var _sharedLicenseStatuse;

    var licenseKey = LicenseInfo.getLicenseKey();

    if (licenseKey && ((_sharedLicenseStatuse = sharedLicenseStatuses[packageName]) == null ? void 0 : _sharedLicenseStatuse.key) === licenseKey) {
      return sharedLicenseStatuses[packageName].status;
    }

    var licenseStatus = verifyLicense(releaseInfo, licenseKey);
    sharedLicenseStatuses[packageName] = {
      key: licenseStatus,
      status: licenseStatus
    };

    if (licenseStatus === LicenseStatus.Invalid) {
      showInvalidLicenseError();
    } else if (licenseStatus === LicenseStatus.NotFound) {
      showNotFoundLicenseError();
    } else if (licenseStatus === LicenseStatus.Expired) {
      showExpiredLicenseError();
    }

    return licenseStatus;
  }, [packageName, releaseInfo]);
}