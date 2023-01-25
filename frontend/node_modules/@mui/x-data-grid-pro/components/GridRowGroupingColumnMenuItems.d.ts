import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
interface GridRowGroupingColumnMenuItemsProps {
    column?: GridColDef;
    onClick?: (event: React.MouseEvent<any>) => void;
}
declare const GridRowGroupingColumnMenuItems: {
    (props: GridRowGroupingColumnMenuItemsProps): JSX.Element | null;
    propTypes: any;
};
export { GridRowGroupingColumnMenuItems };
