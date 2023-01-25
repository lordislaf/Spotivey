import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { GridApiPro } from '../../../models/gridApiPro';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
export declare const detailPanelStateInitializer: GridStateInitializer<Pick<DataGridProProcessedProps, 'initialState' | 'detailPanelExpandedRowIds'>>;
export declare const useGridDetailPanel: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'initialState' | 'getDetailPanelContent' | 'getDetailPanelHeight' | 'detailPanelExpandedRowIds' | 'onDetailPanelExpandedRowIdsChange' | 'pagination' | 'paginationMode'>) => void;
