import { GridRowId, GridRowTreeConfig } from '@mui/x-data-grid';
import { GridSortingModelApplier } from '@mui/x-data-grid/internals';
interface SortRowTreeParams {
    rowIds: GridRowId[];
    rowTree: GridRowTreeConfig;
    disableChildrenSorting: boolean;
    sortRowList: GridSortingModelApplier | null;
}
export declare const sortRowTree: (params: SortRowTreeParams) => GridRowId[];
export {};
