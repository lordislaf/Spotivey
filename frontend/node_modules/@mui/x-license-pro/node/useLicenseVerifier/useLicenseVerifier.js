"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLicenseVerifier = useLicenseVerifier;

var React = _interopRequireWildcard(require("react"));

var _verifyLicense = require("../verifyLicense/verifyLicense");

var _licenseInfo = require("../utils/licenseInfo");

var _licenseErrorMessageUtils = require("../utils/licenseErrorMessageUtils");

var _licenseStatus = require("../utils/licenseStatus");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const sharedLicenseStatuses = {};

function useLicenseVerifier(packageName, releaseInfo) {
  return React.useMemo(() => {
    var _sharedLicenseStatuse;

    const licenseKey = _licenseInfo.LicenseInfo.getLicenseKey();

    if (licenseKey && ((_sharedLicenseStatuse = sharedLicenseStatuses[packageName]) == null ? void 0 : _sharedLicenseStatuse.key) === licenseKey) {
      return sharedLicenseStatuses[packageName].status;
    }

    const licenseStatus = (0, _verifyLicense.verifyLicense)(releaseInfo, licenseKey);
    sharedLicenseStatuses[packageName] = {
      key: licenseStatus,
      status: licenseStatus
    };

    if (licenseStatus === _licenseStatus.LicenseStatus.Invalid) {
      (0, _licenseErrorMessageUtils.showInvalidLicenseError)();
    } else if (licenseStatus === _licenseStatus.LicenseStatus.NotFound) {
      (0, _licenseErrorMessageUtils.showNotFoundLicenseError)();
    } else if (licenseStatus === _licenseStatus.LicenseStatus.Expired) {
      (0, _licenseErrorMessageUtils.showExpiredLicenseError)();
    }

    return licenseStatus;
  }, [packageName, releaseInfo]);
}