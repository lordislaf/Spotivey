import { gridClasses } from '@mui/x-data-grid';
import { findParentElementFromClassName } from '@mui/x-data-grid/internals';
export function getFieldFromHeaderElem(colCellEl) {
  return colCellEl.getAttribute('data-field');
}
export function findHeaderElementFromField(elem, field) {
  return elem.querySelector("[data-field=\"".concat(field, "\"]"));
}
export function findGridCellElementsFromCol(col, api) {
  var root = findParentElementFromClassName(col, 'MuiDataGrid-root');

  if (!root) {
    throw new Error('MUI: The root element is not found.');
  }

  var ariaColIndex = col.getAttribute('aria-colindex');

  if (!ariaColIndex) {
    return [];
  }

  var colIndex = Number(ariaColIndex) - 1;
  var cells = [];
  var renderedRowElements = root.querySelectorAll(".".concat(gridClasses.row));
  renderedRowElements.forEach(function (rowElement) {
    var rowId = rowElement.getAttribute('data-id');

    if (!rowId) {
      return;
    }

    var columnIndex = colIndex;
    var cellColSpanInfo = api.unstable_getCellColSpanInfo(rowId, colIndex);

    if (cellColSpanInfo && cellColSpanInfo.spannedByColSpan) {
      columnIndex = cellColSpanInfo.leftVisibleCellIndex;
    }

    var cell = rowElement.querySelector("[data-colindex=\"".concat(columnIndex, "\"]"));

    if (cell) {
      cells.push(cell);
    }
  });
  return cells;
}