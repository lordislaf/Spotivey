import { GridRowTreeNodeConfig, GridRowId, GridKeyValue } from '@mui/x-data-grid';
import { GridRowTreeCreationParams, GridRowTreeCreationValue } from '@mui/x-data-grid/internals';
export interface BuildRowTreeGroupingCriteria {
    field: string | null;
    key: GridKeyValue;
}
interface BuildRowTreeParams extends GridRowTreeCreationParams {
    rows: {
        id: GridRowId;
        path: BuildRowTreeGroupingCriteria[];
    }[];
    defaultGroupingExpansionDepth: number;
    isGroupExpandedByDefault?: (node: GridRowTreeNodeConfig) => boolean;
    groupingName: string;
    onDuplicatePath?: (firstId: GridRowId, secondId: GridRowId, path: BuildRowTreeGroupingCriteria[]) => void;
}
/**
 * Transform a list of rows into a tree structure where each row references its parent and children.
 * If a row have a parent which does not exist in the input rows, creates an auto generated row
 *
 ```
 params = {
   ids: [0, 1, 2],
   idRowsLookup: { 0: {...}, 1: {...}, 2: {...} },
   rows: [
     { id: 0, path: ['A'] },
     { id: 1, path: ['B', 'A'] },
     { id: 2, path: ['B', 'A', 'A'] }
   ],
   defaultGroupingExpansionDepth: 0,
 }
 Returns:
 {
   ids: [0, 1, 2, 'auto-generated-row-B'],
   idRowsLookup: { 0: {...}, 1: {...}, 2: {...}, 'auto-generated-row-B': {} },
   tree: {
     '0': { id: 0, parent: null, childrenExpanded: false, depth: 0, groupingKey: 'A' },
     'auto-generated-row-B': { id: 'auto-generated-row-B', parent: null, childrenExpanded: false, depth: 0, groupingKey: 'B' },
     '1': { id: 1, parent: 'auto-generated-row-B', childrenExpanded: false, depth: 1, groupingKey: 'A' },
     '2': { id: 2, parent: 1, childrenExpanded: false, depth: 2, groupingKey: 'A' },
   },
   treeDepth: 3,
 }
 ```
 */
export declare const buildRowTree: (params: BuildRowTreeParams) => GridRowTreeCreationValue;
export {};
