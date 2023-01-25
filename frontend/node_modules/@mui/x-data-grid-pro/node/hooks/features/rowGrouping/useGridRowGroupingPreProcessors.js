"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowGroupingPreProcessors = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _xDataGrid = require("@mui/x-data-grid");

var _internals = require("@mui/x-data-grid/internals");

var _gridRowGroupingSelector = require("./gridRowGroupingSelector");

var _createGroupingColDef = require("./createGroupingColDef");

var _gridRowGroupingUtils = require("./gridRowGroupingUtils");

var _buildRowTree = require("../../../utils/tree/buildRowTree");

var _sortRowTree = require("../../../utils/tree/sortRowTree");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridRowGroupingPreProcessors = (apiRef, props) => {
  const getGroupingColDefs = React.useCallback(columnsState => {
    if (props.disableRowGrouping) {
      return [];
    }

    const groupingColDefProp = props.groupingColDef; // We can't use `gridGroupingRowsSanitizedModelSelector` here because the new columns are not in the state yet

    const rowGroupingModel = (0, _gridRowGroupingSelector.gridRowGroupingModelSelector)(apiRef).filter(field => !!columnsState.lookup[field]);

    if (rowGroupingModel.length === 0) {
      return [];
    }

    switch (props.rowGroupingColumnMode) {
      case 'single':
        {
          return [(0, _createGroupingColDef.createGroupingColDefForAllGroupingCriteria)({
            apiRef,
            rowGroupingModel,
            colDefOverride: (0, _gridRowGroupingUtils.getColDefOverrides)(groupingColDefProp, rowGroupingModel),
            columnsLookup: columnsState.lookup
          })];
        }

      case 'multiple':
        {
          return rowGroupingModel.map(groupingCriteria => (0, _createGroupingColDef.createGroupingColDefForOneGroupingCriteria)({
            groupingCriteria,
            colDefOverride: (0, _gridRowGroupingUtils.getColDefOverrides)(groupingColDefProp, [groupingCriteria]),
            groupedByColDef: columnsState.lookup[groupingCriteria],
            columnsLookup: columnsState.lookup
          }));
        }

      default:
        {
          return [];
        }
    }
  }, [apiRef, props.groupingColDef, props.rowGroupingColumnMode, props.disableRowGrouping]);
  const updateGroupingColumn = React.useCallback(columnsState => {
    const groupingColDefs = getGroupingColDefs(columnsState);
    let newColumnFields = [];
    const newColumnsLookup = {}; // We only keep the non-grouping columns

    columnsState.all.forEach(field => {
      if (!(0, _gridRowGroupingUtils.isGroupingColumn)(field)) {
        newColumnFields.push(field);
        newColumnsLookup[field] = columnsState.lookup[field];
      }
    }); // We add the grouping column

    groupingColDefs.forEach(groupingColDef => {
      const matchingGroupingColDef = columnsState.lookup[groupingColDef.field];

      if (matchingGroupingColDef) {
        groupingColDef.width = matchingGroupingColDef.width;
        groupingColDef.flex = matchingGroupingColDef.flex;
      }

      newColumnsLookup[groupingColDef.field] = groupingColDef;
    });
    const startIndex = newColumnFields[0] === '__check__' ? 1 : 0;
    newColumnFields = [...newColumnFields.slice(0, startIndex), ...groupingColDefs.map(colDef => colDef.field), ...newColumnFields.slice(startIndex)];
    columnsState.all = newColumnFields;
    columnsState.lookup = newColumnsLookup;
    return columnsState;
  }, [getGroupingColDefs]);
  const createRowTree = React.useCallback(params => {
    const rowGroupingModel = (0, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector)(apiRef);
    const columnsLookup = (0, _xDataGrid.gridColumnLookupSelector)(apiRef);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      rowGrouping: (0, _extends2.default)({}, state.rowGrouping, {
        unstable_sanitizedModelOnLastRowTreeCreation: rowGroupingModel
      })
    }));
    const distinctValues = Object.fromEntries(rowGroupingModel.map(groupingField => [groupingField, {
      lookup: {},
      list: []
    }]));

    const getCellGroupingCriteria = ({
      row,
      id,
      colDef
    }) => {
      let key;

      if (colDef.groupingValueGetter) {
        const groupingValueGetterParams = {
          colDef,
          field: colDef.field,
          value: row[colDef.field],
          id,
          row,
          rowNode: {
            isAutoGenerated: false,
            id
          }
        };
        key = colDef.groupingValueGetter(groupingValueGetterParams);
      } else {
        key = row[colDef.field];
      }

      return {
        key,
        field: colDef.field
      };
    };

    params.ids.forEach(rowId => {
      const row = params.idRowsLookup[rowId];
      rowGroupingModel.forEach(groupingCriteria => {
        const {
          key
        } = getCellGroupingCriteria({
          row,
          id: rowId,
          colDef: columnsLookup[groupingCriteria]
        });
        const groupingFieldsDistinctKeys = distinctValues[groupingCriteria];

        if (key != null && !groupingFieldsDistinctKeys.lookup[key.toString()]) {
          groupingFieldsDistinctKeys.lookup[key.toString()] = true;
          groupingFieldsDistinctKeys.list.push(key);
        }
      });
    });
    const rows = params.ids.map(rowId => {
      const row = params.idRowsLookup[rowId];
      const parentPath = rowGroupingModel.map(groupingField => getCellGroupingCriteria({
        row,
        id: rowId,
        colDef: columnsLookup[groupingField]
      })).filter(cell => cell.key != null);
      const leafGroupingCriteria = {
        key: rowId.toString(),
        field: null
      };
      return {
        path: [...parentPath, leafGroupingCriteria],
        id: rowId
      };
    });
    return (0, _buildRowTree.buildRowTree)((0, _extends2.default)({}, params, {
      rows,
      defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      isGroupExpandedByDefault: props.isGroupExpandedByDefault,
      groupingName: _gridRowGroupingUtils.ROW_GROUPING_STRATEGY
    }));
  }, [apiRef, props.defaultGroupingExpansionDepth, props.isGroupExpandedByDefault]);
  const filterRows = React.useCallback(params => {
    const rowTree = (0, _xDataGrid.gridRowTreeSelector)(apiRef);
    return (0, _gridRowGroupingUtils.filterRowTreeFromGroupingColumns)({
      rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters
    });
  }, [apiRef]);
  const sortRows = React.useCallback(params => {
    const rowTree = (0, _xDataGrid.gridRowTreeSelector)(apiRef);
    const rowIds = (0, _xDataGrid.gridRowIdsSelector)(apiRef);
    return (0, _sortRowTree.sortRowTree)({
      rowTree,
      rowIds,
      sortRowList: params.sortRowList,
      disableChildrenSorting: false
    });
  }, [apiRef]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'hydrateColumns', updateGroupingColumn);
  (0, _internals.useGridRegisterStrategyProcessor)(apiRef, _gridRowGroupingUtils.ROW_GROUPING_STRATEGY, 'rowTreeCreation', createRowTree);
  (0, _internals.useGridRegisterStrategyProcessor)(apiRef, _gridRowGroupingUtils.ROW_GROUPING_STRATEGY, 'filtering', filterRows);
  (0, _internals.useGridRegisterStrategyProcessor)(apiRef, _gridRowGroupingUtils.ROW_GROUPING_STRATEGY, 'sorting', sortRows);
  /**
   * 1ST RENDER
   */

  (0, _xDataGrid.useFirstRender)(() => {
    (0, _gridRowGroupingUtils.setStrategyAvailability)(apiRef, props.disableRowGrouping);
  });
  /**
   * EFFECTS
   */

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (!isFirstRender.current) {
      (0, _gridRowGroupingUtils.setStrategyAvailability)(apiRef, props.disableRowGrouping);
    } else {
      isFirstRender.current = false;
    }
  }, [apiRef, props.disableRowGrouping]);
};

exports.useGridRowGroupingPreProcessors = useGridRowGroupingPreProcessors;