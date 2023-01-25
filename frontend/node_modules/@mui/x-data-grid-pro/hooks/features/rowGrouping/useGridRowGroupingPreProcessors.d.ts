import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridApiPro } from '../../../models/gridApiPro';
export declare const useGridRowGroupingPreProcessors: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'disableRowGrouping' | 'groupingColDef' | 'rowGroupingColumnMode' | 'defaultGroupingExpansionDepth' | 'isGroupExpandedByDefault'>) => void;
