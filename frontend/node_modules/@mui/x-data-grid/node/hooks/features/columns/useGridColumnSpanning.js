"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnSpanning = void 0;

var _react = _interopRequireDefault(require("react"));

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");

var _gridEvents = require("../../../models/events/gridEvents");

/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
const useGridColumnSpanning = apiRef => {
  const lookup = _react.default.useRef({});

  const setCellColSpanInfo = _react.default.useCallback((rowId, columnIndex, cellColSpanInfo) => {
    const sizes = lookup.current;

    if (!sizes[rowId]) {
      sizes[rowId] = {};
    }

    sizes[rowId][columnIndex] = cellColSpanInfo;
  }, []);

  const getCellColSpanInfo = _react.default.useCallback((rowId, columnIndex) => {
    var _lookup$current$rowId;

    return (_lookup$current$rowId = lookup.current[rowId]) == null ? void 0 : _lookup$current$rowId[columnIndex];
  }, []); // Calculate `colSpan` for the cell.


  const calculateCellColSpan = _react.default.useCallback(params => {
    const {
      columnIndex,
      rowId,
      minFirstColumnIndex,
      maxLastColumnIndex
    } = params;
    const visibleColumns = apiRef.current.getVisibleColumns();
    const columnsLength = visibleColumns.length;
    const column = visibleColumns[columnIndex];
    const colSpan = typeof column.colSpan === 'function' ? column.colSpan(apiRef.current.getCellParams(rowId, column.field)) : column.colSpan;

    if (!colSpan || colSpan === 1) {
      setCellColSpanInfo(rowId, columnIndex, {
        spannedByColSpan: false,
        cellProps: {
          colSpan: 1,
          width: column.computedWidth
        }
      });
      return {
        colSpan: 1
      };
    }

    let width = column.computedWidth;

    for (let j = 1; j < colSpan; j += 1) {
      const nextColumnIndex = columnIndex + j; // Cells should be spanned only within their column section (left-pinned, right-pinned and unpinned).

      if (nextColumnIndex >= minFirstColumnIndex && nextColumnIndex < maxLastColumnIndex) {
        const nextColumn = visibleColumns[nextColumnIndex];
        width += nextColumn.computedWidth;
        setCellColSpanInfo(rowId, columnIndex + j, {
          spannedByColSpan: true,
          rightVisibleCellIndex: Math.min(columnIndex + colSpan, columnsLength - 1),
          leftVisibleCellIndex: columnIndex
        });
      }

      setCellColSpanInfo(rowId, columnIndex, {
        spannedByColSpan: false,
        cellProps: {
          colSpan,
          width
        }
      });
    }

    return {
      colSpan
    };
  }, [apiRef, setCellColSpanInfo]); // Calculate `colSpan` for each cell in the row


  const calculateColSpan = _react.default.useCallback(({
    rowId,
    minFirstColumn,
    maxLastColumn
  }) => {
    for (let i = minFirstColumn; i < maxLastColumn; i += 1) {
      const cellProps = calculateCellColSpan({
        columnIndex: i,
        rowId,
        minFirstColumnIndex: minFirstColumn,
        maxLastColumnIndex: maxLastColumn
      });

      if (cellProps.colSpan > 1) {
        i += cellProps.colSpan - 1;
      }
    }
  }, [calculateCellColSpan]);

  const columnSpanningApi = {
    unstable_getCellColSpanInfo: getCellColSpanInfo,
    unstable_calculateColSpan: calculateColSpan
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, columnSpanningApi, 'GridColumnSpanningAPI');

  const handleColumnReorderChange = _react.default.useCallback(() => {
    // `colSpan` needs to be recalculated after column reordering
    lookup.current = {};
  }, []);

  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _gridEvents.GridEvents.columnOrderChange, handleColumnReorderChange);
};

exports.useGridColumnSpanning = useGridColumnSpanning;