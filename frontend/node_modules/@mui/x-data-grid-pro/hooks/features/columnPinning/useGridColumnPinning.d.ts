import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const columnPinningStateInitializer: GridStateInitializer<Pick<DataGridProProcessedProps, 'pinnedColumns' | 'initialState' | 'disableColumnPinning'>>;
export declare const useGridColumnPinning: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'initialState' | 'disableColumnPinning' | 'pinnedColumns' | 'onPinnedColumnsChange'>) => void;
