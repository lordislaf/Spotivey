import * as React from 'react';
import { GridPinnedColumns } from '../hooks/features/columnPinning';
export declare const filterColumns: (pinnedColumns: GridPinnedColumns, columns: string[]) => any[][];
interface DataGridProVirtualScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
    disableVirtualization?: boolean;
}
declare const DataGridProVirtualScroller: React.ForwardRefExoticComponent<DataGridProVirtualScrollerProps & React.RefAttributes<HTMLDivElement>>;
export { DataGridProVirtualScroller };
