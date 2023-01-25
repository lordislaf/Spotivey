/// <reference types="react" />
import { GridRenderCellParams } from '@mui/x-data-grid';
interface GridGroupingCriteriaCellProps extends GridRenderCellParams {
    hideDescendantCount?: boolean;
}
export declare const GridGroupingCriteriaCell: (props: GridGroupingCriteriaCellProps) => JSX.Element;
export {};
