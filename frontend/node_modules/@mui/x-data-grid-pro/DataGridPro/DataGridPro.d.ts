import * as React from 'react';
import { GridValidRowModel } from '@mui/x-data-grid';
import { DataGridProProps } from '../models';
interface DataGridProComponent {
    <R extends GridValidRowModel = any>(props: DataGridProProps<R> & React.RefAttributes<HTMLDivElement>): JSX.Element;
    propTypes?: any;
}
export declare const DataGridPro: DataGridProComponent;
export {};
