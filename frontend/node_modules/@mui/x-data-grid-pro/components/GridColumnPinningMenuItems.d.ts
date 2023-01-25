import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
interface GridColumnPinningMenuItemsProps {
    column?: GridColDef;
    onClick?: (event: React.MouseEvent<any>) => void;
}
declare const GridColumnPinningMenuItems: {
    (props: GridColumnPinningMenuItemsProps): JSX.Element | null;
    propTypes: any;
};
export { GridColumnPinningMenuItems };
