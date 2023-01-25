import { GridRowModel, GridInitialState } from '@mui/x-data-grid-pro';
import { GridColDefGenerator } from './gridColDefGenerator';
export interface GridDemoData {
    rows: GridRowModel[];
    columns: GridColDefGenerator[];
    initialState?: GridInitialState;
}
export declare function getRealGridData(rowLength: number, columns: GridColDefGenerator[]): Promise<GridDemoData>;
