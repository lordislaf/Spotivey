import { GridFilterOperator } from '../models/gridFilterOperator';
export declare const getGridNumericOperators: () => GridFilterOperator<any, number | string | null, any>[];
/**
 * @deprecated Use `getGridNumericOperators` instead.
 */
export declare const getGridNumericColumnOperators: (() => GridFilterOperator<any, number | string | null, any>[]) | ((...args: any[]) => any);
