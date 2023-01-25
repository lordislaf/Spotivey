import _extends from "@babel/runtime/helpers/esm/extends";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "className", "getValue", "hasFocus", "isValidating", "isProcessingProps", "error"];
import _regeneratorRuntime from "@babel/runtime/regenerator";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import MenuItem from '@mui/material/MenuItem';
import { isEscapeKey } from '../../utils/keyboardUtils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridEditModes } from '../../models/gridEditRowModel';
import { GridEvents } from '../../models/events/gridEvents';
import { getValueFromValueOptions } from '../panel/filterPanel/filterPanelUtils';
import { jsx as _jsx } from "react/jsx-runtime";

var renderSingleSelectOptions = function renderSingleSelectOptions(option, OptionComponent) {
  var isOptionTypeObject = _typeof(option) === 'object';
  var key = isOptionTypeObject ? option.value : option;
  var value = isOptionTypeObject ? option.value : option;
  var content = isOptionTypeObject ? option.label : option;
  return /*#__PURE__*/_jsx(OptionComponent, {
    value: value,
    children: content
  }, key);
};

function GridEditSingleSelectCell(props) {
  var _rootProps$components, _baseSelectProps$nati, _rootProps$components2;

  var id = props.id,
      value = props.value,
      formattedValue = props.formattedValue,
      api = props.api,
      field = props.field,
      row = props.row,
      rowNode = props.rowNode,
      colDef = props.colDef,
      cellMode = props.cellMode,
      isEditable = props.isEditable,
      tabIndex = props.tabIndex,
      className = props.className,
      getValue = props.getValue,
      hasFocus = props.hasFocus,
      isValidating = props.isValidating,
      isProcessingProps = props.isProcessingProps,
      error = props.error,
      other = _objectWithoutProperties(props, _excluded);

  var ref = React.useRef();
  var inputRef = React.useRef();
  var rootProps = useGridRootProps();

  var _React$useState = React.useState(rootProps.editMode === 'cell'),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var baseSelectProps = ((_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseSelect) || {};
  var isSelectNative = (_baseSelectProps$nati = baseSelectProps.native) != null ? _baseSelectProps$nati : false;
  var valueOptionsFormatted;

  if (typeof colDef.valueOptions === 'function') {
    valueOptionsFormatted = colDef.valueOptions({
      id: id,
      row: row,
      field: field
    });
  } else {
    valueOptionsFormatted = colDef.valueOptions;
  }

  if (colDef.valueFormatter) {
    valueOptionsFormatted = valueOptionsFormatted.map(function (option) {
      if (_typeof(option) === 'object') {
        return option;
      }

      var params = {
        field: field,
        api: api,
        value: option
      };
      return {
        value: option,
        label: String(colDef.valueFormatter(params))
      };
    });
  }

  var handleChange = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(event) {
      var _rootProps$experiment;

      var target, formattedTargetValue, isValid, canCommit, params;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setOpen(false);
              target = event.target; // NativeSelect casts the value to a string.

              formattedTargetValue = getValueFromValueOptions(target.value, valueOptionsFormatted);
              _context.next = 5;
              return api.setEditCellValue({
                id: id,
                field: field,
                value: formattedTargetValue
              }, event);

            case 5:
              isValid = _context.sent;

              if (!((_rootProps$experiment = rootProps.experimentalFeatures) != null && _rootProps$experiment.newEditingApi)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return");

            case 8:
              if (!(rootProps.editMode === GridEditModes.Row || isValid === false)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return");

            case 10:
              _context.next = 12;
              return Promise.resolve(api.commitCellChange({
                id: id,
                field: field
              }, event));

            case 12:
              canCommit = _context.sent;

              if (canCommit) {
                api.setCellMode(id, field, 'view');

                if (event.key) {
                  // TODO v6: remove once we stop ignoring events fired from portals
                  params = api.getCellParams(id, field);
                  api.publishEvent(GridEvents.cellNavigationKeyDown, params, event);
                }
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleChange(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var handleClose = function handleClose(event, reason) {
    if (rootProps.editMode === GridEditModes.Row) {
      setOpen(false);
      return;
    }

    if (reason === 'backdropClick' || isEscapeKey(event.key)) {
      var _rootProps$experiment2;

      if ((_rootProps$experiment2 = rootProps.experimentalFeatures) != null && _rootProps$experiment2.newEditingApi) {
        api.stopCellEditMode({
          id: id,
          field: field,
          ignoreModifications: true
        });
      } else {
        api.setCellMode(id, field, 'view');
      }
    }
  };

  var handleOpen = function handleOpen() {
    setOpen(true);
  };

  useEnhancedEffect(function () {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);
  return /*#__PURE__*/_jsx(rootProps.components.BaseSelect, _extends({
    ref: ref,
    inputRef: inputRef,
    value: value,
    onChange: handleChange,
    open: open,
    onOpen: handleOpen,
    MenuProps: {
      onClose: handleClose
    },
    error: error,
    native: isSelectNative,
    fullWidth: true
  }, other, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseSelect, {
    children: valueOptionsFormatted.map(function (valueOptions) {
      return renderSingleSelectOptions(valueOptions, isSelectNative ? 'option' : MenuItem);
    })
  }));
}

process.env.NODE_ENV !== "production" ? GridEditSingleSelectCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * GridApi that let you manipulate the grid.
   * @deprecated Use the `apiRef` returned by `useGridApiContext` or `useGridApiRef` (only available in `@mui/x-data-grid-pro`)
   */
  api: PropTypes.any.isRequired,

  /**
   * The mode of the cell.
   */
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,

  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,

  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,

  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: PropTypes.any,

  /**
   * Get the cell value of a row and field.
   * @param {GridRowId} id The row id.
   * @param {string} field The field.
   * @returns {any} The cell value.
   * @deprecated Use `params.row` to directly access the fields you want instead.
   */
  getValue: PropTypes.func.isRequired,

  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,

  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  /**
   * If true, the cell is editable.
   */
  isEditable: PropTypes.bool,
  isProcessingProps: PropTypes.bool,
  isValidating: PropTypes.bool,

  /**
   * The row model of the row that the current cell belongs to.
   */
  row: PropTypes.object.isRequired,

  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: PropTypes.object.isRequired
} : void 0;
export { GridEditSingleSelectCell };
export var renderEditSingleSelectCell = function renderEditSingleSelectCell(params) {
  return /*#__PURE__*/_jsx(GridEditSingleSelectCell, _extends({}, params));
};