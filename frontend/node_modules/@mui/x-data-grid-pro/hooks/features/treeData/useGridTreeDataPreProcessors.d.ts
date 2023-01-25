import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridApiPro } from '../../../models/gridApiPro';
export declare const useGridTreeDataPreProcessors: (apiRef: React.MutableRefObject<GridApiPro>, props: Pick<DataGridProProcessedProps, 'treeData' | 'groupingColDef' | 'getTreeDataPath' | 'disableChildrenSorting' | 'disableChildrenFiltering' | 'defaultGroupingExpansionDepth' | 'isGroupExpandedByDefault'>) => void;
