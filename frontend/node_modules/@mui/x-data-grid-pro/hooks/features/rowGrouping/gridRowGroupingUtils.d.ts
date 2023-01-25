import * as React from 'react';
import { GridRowTreeConfig, GridFilterState } from '@mui/x-data-grid';
import { GridAggregatedFilterItemApplier } from '@mui/x-data-grid/internals';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridRowGroupingModel } from './gridRowGroupingInterfaces';
import { GridStatePro } from '../../../models/gridStatePro';
import { GridApiPro } from '../../../models/gridApiPro';
export declare const GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD = "__row_group_by_columns_group__";
export declare const ROW_GROUPING_STRATEGY = "grouping-columns";
export declare const getRowGroupingFieldFromGroupingCriteria: (groupingCriteria: string | null) => string;
export declare const getRowGroupingCriteriaFromGroupingField: (groupingColDefField: string) => string | null;
export declare const isGroupingColumn: (field: string) => boolean;
interface FilterRowTreeFromTreeDataParams {
    rowTree: GridRowTreeConfig;
    isRowMatchingFilters: GridAggregatedFilterItemApplier | null;
}
/**
 * A leaf is visible if it passed the filter
 * A group is visible if all the following criteria are met:
 * - One of its children is passing the filter
 * - It is passing the filter
 */
export declare const filterRowTreeFromGroupingColumns: (params: FilterRowTreeFromTreeDataParams) => Omit<GridFilterState, 'filterModel'>;
export declare const getColDefOverrides: (groupingColDefProp: DataGridProProcessedProps['groupingColDef'], fields: string[]) => import("../../..").GridGroupingColDefOverride<any> | null | undefined;
export declare const mergeStateWithRowGroupingModel: (rowGroupingModel: GridRowGroupingModel) => (state: GridStatePro) => GridStatePro;
export declare const setStrategyAvailability: (apiRef: React.MutableRefObject<GridApiPro>, disableRowGrouping: boolean) => void;
export {};
