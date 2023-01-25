/// <reference types="react" />
import { GridStatePro } from '../../../models/gridStatePro';
export declare const gridDetailPanelExpandedRowIdsSelector: (state: GridStatePro) => import("@mui/x-data-grid").GridRowId[];
export declare const gridDetailPanelExpandedRowsContentCacheSelector: (state: GridStatePro) => Record<import("@mui/x-data-grid").GridRowId, import("react").ReactNode>;
export declare const gridDetailPanelExpandedRowsHeightCacheSelector: (state: GridStatePro) => Record<import("@mui/x-data-grid").GridRowId, number>;
