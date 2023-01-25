"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderEditStatus = renderEditStatus;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _xDataGridPro = require("@mui/x-data-grid-pro");

var _Select = _interopRequireDefault(require("@mui/material/Select"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));

var _ReportProblem = _interopRequireDefault(require("@mui/icons-material/ReportProblem"));

var _Info = _interopRequireDefault(require("@mui/icons-material/Info"));

var _Autorenew = _interopRequireDefault(require("@mui/icons-material/Autorenew"));

var _Done = _interopRequireDefault(require("@mui/icons-material/Done"));

var _staticData = require("../services/static-data");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function EditStatus(props) {
  const {
    id,
    value,
    api,
    field
  } = props;

  const handleChange = event => {
    api.setEditCellValue({
      id,
      field,
      value: event.target.value
    }, event);
    api.commitCellChange({
      id,
      field
    });
    api.setCellMode(id, field, 'view');

    if (event.key) {
      // TODO v6: remove once we stop ignoring events fired from portals
      const params = api.getCellParams(id, field);
      api.publishEvent(_xDataGridPro.GridEvents.cellNavigationKeyDown, params, event);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      api.setCellMode(id, field, 'view');
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
    value: value,
    onChange: handleChange,
    MenuProps: {
      onClose: handleClose
    },
    sx: {
      height: 1,
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        pl: 1
      }
    },
    autoFocus: true,
    fullWidth: true,
    open: true,
    children: _staticData.STATUS_OPTIONS.map(option => {
      let IconComponent = null;

      if (option === 'Rejected') {
        IconComponent = _ReportProblem.default;
      } else if (option === 'Open') {
        IconComponent = _Info.default;
      } else if (option === 'PartiallyFilled') {
        IconComponent = _Autorenew.default;
      } else if (option === 'Filled') {
        IconComponent = _Done.default;
      }

      let label = option;

      if (option === 'PartiallyFilled') {
        label = 'Partially Filled';
      }

      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
        value: option,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
          sx: {
            minWidth: 36
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconComponent, {
            fontSize: "small"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
          primary: label,
          sx: {
            overflow: 'hidden'
          }
        })]
      }, option);
    })
  });
}

function renderEditStatus(params) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(EditStatus, (0, _extends2.default)({}, params));
}