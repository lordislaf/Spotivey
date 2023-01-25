import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const rowGroupingStateInitializer: GridStateInitializer<Pick<DataGridProProcessedProps, 'rowGroupingModel' | 'initialState'>>;
/**
 * Only available in DataGridPro
 * @requires useGridColumns (state, method) - can be after, async only
 * @requires useGridRows (state, method) - can be after, async only
 * @requires useGridParamsApi (method) - can be after, async only
 * TODO: Move the the Premium plan once available and remove the `experimentalFeatures.rowGrouping` flag
 */
export declare const useGridRowGrouping: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'initialState' | 'rowGroupingModel' | 'onRowGroupingModelChange' | 'defaultGroupingExpansionDepth' | 'isGroupExpandedByDefault' | 'groupingColDef' | 'rowGroupingColumnMode' | 'disableRowGrouping'>) => void;
