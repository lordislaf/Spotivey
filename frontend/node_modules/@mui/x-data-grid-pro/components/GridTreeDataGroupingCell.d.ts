/// <reference types="react" />
import { GridRenderCellParams } from '@mui/x-data-grid';
interface GridTreeDataGroupingCellProps extends GridRenderCellParams {
    hideDescendantCount?: boolean;
}
declare const GridTreeDataGroupingCell: {
    (props: GridTreeDataGroupingCellProps): JSX.Element;
    propTypes: any;
};
export { GridTreeDataGroupingCell };
