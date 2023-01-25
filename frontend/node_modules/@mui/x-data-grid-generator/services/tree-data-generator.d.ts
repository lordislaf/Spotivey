import { DataGridProProps } from '@mui/x-data-grid-pro';
import { GridDemoData } from './real-data-service';
export interface AddPathToDemoDataOptions {
    /**
     * The field used to generate the path
     * If not defined, the tree data will not be built
     */
    groupingField?: string;
    /**
     * The depth of the tree
     * @default: 1
     */
    maxDepth?: number;
    /**
     * The average amount of children in a node
     * @default: 2
     */
    averageChildren?: number;
}
export interface DemoTreeDataValue extends Pick<DataGridProProps, 'getTreeDataPath' | 'treeData' | 'groupingColDef'>, GridDemoData {
}
export declare const addTreeDataOptionsToDemoData: (data: GridDemoData, options?: AddPathToDemoDataOptions) => DemoTreeDataValue;
