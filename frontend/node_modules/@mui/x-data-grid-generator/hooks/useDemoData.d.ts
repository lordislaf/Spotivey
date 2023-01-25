import { AddPathToDemoDataOptions, DemoTreeDataValue } from '../services/tree-data-generator';
export declare type DemoDataReturnType = {
    data: DemoTreeDataValue;
    loading: boolean;
    setRowLength: (count: number) => void;
    loadNewData: () => void;
};
declare type DataSet = 'Commodity' | 'Employee';
export interface UseDemoDataOptions {
    dataSet: DataSet;
    rowLength: number;
    maxColumns?: number;
    visibleFields?: string[];
    editable?: boolean;
    treeData?: AddPathToDemoDataOptions;
}
export declare const useDemoData: (options: UseDemoDataOptions) => DemoDataReturnType;
export {};
