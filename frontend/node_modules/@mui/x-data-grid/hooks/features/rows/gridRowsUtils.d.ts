import { GridRowId, GridRowModel } from '../../../models';
/**
 * A helper function to check if the id provided is valid.
 * @param {GridRowId} id Id as [[GridRowId]].
 * @param {GridRowModel | Partial<GridRowModel>} row Row as [[GridRowModel]].
 * @param {string} detailErrorMessage A custom error message to display for invalid IDs
 */
export declare function checkGridRowIdIsValid(id: GridRowId, row: GridRowModel | Partial<GridRowModel>, detailErrorMessage?: string): void;
