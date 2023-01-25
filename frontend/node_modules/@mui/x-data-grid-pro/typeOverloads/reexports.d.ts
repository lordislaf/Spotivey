import * as React from 'react';
import type { GridApiPro } from '../models/gridApiPro';
import type { GridInitialStatePro, GridStatePro } from '../models/gridStatePro';
export { useGridApiContext } from '../hooks/utils/useGridApiContext';
export { useGridApiRef } from '../hooks/utils/useGridApiRef';
export { useGridRootProps } from '../hooks/utils/useGridRootProps';
/**
 * The full grid API.
 */
export declare type GridApi = GridApiPro;
/**
 * @deprecated Use `React.MutableRefObject<GridApi>` instead
 */
export declare type GridApiRef = React.MutableRefObject<GridApiPro>;
/**
 * The state of `DataGridPro`.
 */
export declare type GridState = GridStatePro;
/**
 * The initial state of `DataGridPro`.
 */
export declare type GridInitialState = GridInitialStatePro;
