import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
interface GridRowGroupableColumnMenuItemsProps {
    column?: GridColDef;
    onClick?: (event: React.MouseEvent<any>) => void;
}
declare const GridRowGroupableColumnMenuItems: {
    (props: GridRowGroupableColumnMenuItemsProps): JSX.Element | null;
    propTypes: any;
};
export { GridRowGroupableColumnMenuItems };
