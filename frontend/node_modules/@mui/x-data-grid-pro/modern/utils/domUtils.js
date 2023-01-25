import { gridClasses } from '@mui/x-data-grid';
import { findParentElementFromClassName } from '@mui/x-data-grid/internals';
export function getFieldFromHeaderElem(colCellEl) {
  return colCellEl.getAttribute('data-field');
}
export function findHeaderElementFromField(elem, field) {
  return elem.querySelector(`[data-field="${field}"]`);
}
export function findGridCellElementsFromCol(col, api) {
  const root = findParentElementFromClassName(col, 'MuiDataGrid-root');

  if (!root) {
    throw new Error('MUI: The root element is not found.');
  }

  const ariaColIndex = col.getAttribute('aria-colindex');

  if (!ariaColIndex) {
    return [];
  }

  const colIndex = Number(ariaColIndex) - 1;
  const cells = [];
  const renderedRowElements = root.querySelectorAll(`.${gridClasses.row}`);
  renderedRowElements.forEach(rowElement => {
    const rowId = rowElement.getAttribute('data-id');

    if (!rowId) {
      return;
    }

    let columnIndex = colIndex;
    const cellColSpanInfo = api.unstable_getCellColSpanInfo(rowId, colIndex);

    if (cellColSpanInfo && cellColSpanInfo.spannedByColSpan) {
      columnIndex = cellColSpanInfo.leftVisibleCellIndex;
    }

    const cell = rowElement.querySelector(`[data-colindex="${columnIndex}"]`);

    if (cell) {
      cells.push(cell);
    }
  });
  return cells;
}