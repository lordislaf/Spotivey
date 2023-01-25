import { GridStatePro } from '../../../models/gridStatePro';
export declare const gridRowGroupingStateSelector: (state: GridStatePro) => import("./gridRowGroupingInterfaces").GridRowGroupingState;
export declare const gridRowGroupingModelSelector: import("@mui/x-data-grid").OutputSelector<GridStatePro, import("./gridRowGroupingInterfaces").GridRowGroupingModel>;
export declare const gridRowGroupingSanitizedModelSelector: import("@mui/x-data-grid").OutputSelector<GridStatePro, string[]>;
