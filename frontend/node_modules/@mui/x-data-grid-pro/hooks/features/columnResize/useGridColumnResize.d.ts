import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const columnResizeStateInitializer: GridStateInitializer;
/**
 * Only available in DataGridPro
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
export declare const useGridColumnResize: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'onColumnResize' | 'onColumnWidthChange'>) => void;
