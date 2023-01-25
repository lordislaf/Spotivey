import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const columnReorderStateInitializer: GridStateInitializer;
/**
 * Only available in DataGridPro
 * @requires useGridColumns (method)
 */
export declare const useGridColumnReorder: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'disableColumnReorder' | 'classes'>) => void;
