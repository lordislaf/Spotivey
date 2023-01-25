import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["hideDescendantCount"];
import * as React from 'react';
import { gridRowIdsSelector, gridRowTreeSelector, useFirstRender } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor, useGridRegisterStrategyProcessor } from '@mui/x-data-grid/internals';
import { GRID_TREE_DATA_GROUPING_COL_DEF, GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES } from './gridTreeDataGroupColDef';
import { filterRowTreeFromTreeData, TREE_DATA_STRATEGY } from './gridTreeDataUtils';
import { GridTreeDataGroupingCell } from '../../../components';
import { buildRowTree } from '../../../utils/tree/buildRowTree';
import { sortRowTree } from '../../../utils/tree/sortRowTree';
import { jsx as _jsx } from "react/jsx-runtime";
export var useGridTreeDataPreProcessors = function useGridTreeDataPreProcessors(apiRef, props) {
  var setStrategyAvailability = React.useCallback(function () {
    apiRef.current.unstable_setStrategyAvailability('rowTree', TREE_DATA_STRATEGY, props.treeData ? function () {
      return true;
    } : function () {
      return false;
    });
  }, [apiRef, props.treeData]);
  var getGroupingColDef = React.useCallback(function () {
    var _colDefOverride;

    var groupingColDefProp = props.groupingColDef;
    var colDefOverride;

    if (typeof groupingColDefProp === 'function') {
      var params = {
        groupingName: TREE_DATA_STRATEGY,
        fields: []
      };
      colDefOverride = groupingColDefProp(params);
    } else {
      colDefOverride = groupingColDefProp;
    }

    var _ref = (_colDefOverride = colDefOverride) != null ? _colDefOverride : {},
        hideDescendantCount = _ref.hideDescendantCount,
        colDefOverrideProperties = _objectWithoutProperties(_ref, _excluded);

    var commonProperties = _extends({}, GRID_TREE_DATA_GROUPING_COL_DEF, {
      renderCell: function renderCell(params) {
        return /*#__PURE__*/_jsx(GridTreeDataGroupingCell, _extends({}, params, {
          hideDescendantCount: hideDescendantCount
        }));
      },
      headerName: apiRef.current.getLocaleText('treeDataGroupingHeaderName')
    });

    return _extends({}, commonProperties, colDefOverrideProperties, GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES);
  }, [apiRef, props.groupingColDef]);
  var updateGroupingColumn = React.useCallback(function (columnsState) {
    var groupingColDefField = GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES.field;
    var shouldHaveGroupingColumn = props.treeData;
    var prevGroupingColumn = columnsState.lookup[groupingColDefField];

    if (shouldHaveGroupingColumn) {
      var newGroupingColumn = getGroupingColDef();

      if (prevGroupingColumn) {
        newGroupingColumn.width = prevGroupingColumn.width;
        newGroupingColumn.flex = prevGroupingColumn.flex;
      }

      columnsState.lookup[groupingColDefField] = newGroupingColumn;

      if (prevGroupingColumn == null) {
        var index = columnsState.all[0] === '__check__' ? 1 : 0;
        columnsState.all = [].concat(_toConsumableArray(columnsState.all.slice(0, index)), [groupingColDefField], _toConsumableArray(columnsState.all.slice(index)));
      }
    } else if (!shouldHaveGroupingColumn && prevGroupingColumn) {
      delete columnsState.lookup[groupingColDefField];
      columnsState.all = columnsState.all.filter(function (field) {
        return field !== groupingColDefField;
      });
    }

    return columnsState;
  }, [props.treeData, getGroupingColDef]);
  var createRowTree = React.useCallback(function (params) {
    if (!props.getTreeDataPath) {
      throw new Error('MUI: No getTreeDataPath given.');
    }

    var rows = params.ids.map(function (rowId) {
      return {
        id: rowId,
        path: props.getTreeDataPath(params.idRowsLookup[rowId]).map(function (key) {
          return {
            key: key,
            field: null
          };
        })
      };
    }).sort(function (a, b) {
      return a.path.length - b.path.length;
    });
    return buildRowTree(_extends({
      rows: rows
    }, params, {
      defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      isGroupExpandedByDefault: props.isGroupExpandedByDefault,
      groupingName: TREE_DATA_STRATEGY,
      onDuplicatePath: function onDuplicatePath(firstId, secondId, path) {
        throw new Error(['MUI: The path returned by `getTreeDataPath` should be unique.', "The rows with id #".concat(firstId, " and #").concat(secondId, " have the same."), "Path: ".concat(JSON.stringify(path.map(function (step) {
          return step.key;
        })), ".")].join('\n'));
      }
    }));
  }, [props.getTreeDataPath, props.defaultGroupingExpansionDepth, props.isGroupExpandedByDefault]);
  var filterRows = React.useCallback(function (params) {
    var rowTree = gridRowTreeSelector(apiRef);
    return filterRowTreeFromTreeData({
      rowTree: rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters,
      disableChildrenFiltering: props.disableChildrenFiltering
    });
  }, [apiRef, props.disableChildrenFiltering]);
  var sortRows = React.useCallback(function (params) {
    var rowTree = gridRowTreeSelector(apiRef);
    var rowIds = gridRowIdsSelector(apiRef);
    return sortRowTree({
      rowTree: rowTree,
      rowIds: rowIds,
      sortRowList: params.sortRowList,
      disableChildrenSorting: props.disableChildrenSorting
    });
  }, [apiRef, props.disableChildrenSorting]);
  useGridRegisterPipeProcessor(apiRef, 'hydrateColumns', updateGroupingColumn);
  useGridRegisterStrategyProcessor(apiRef, TREE_DATA_STRATEGY, 'rowTreeCreation', createRowTree);
  useGridRegisterStrategyProcessor(apiRef, TREE_DATA_STRATEGY, 'filtering', filterRows);
  useGridRegisterStrategyProcessor(apiRef, TREE_DATA_STRATEGY, 'sorting', sortRows);
  /**
   * 1ST RENDER
   */

  useFirstRender(function () {
    setStrategyAvailability();
  });
  /**
   * EFFECTS
   */

  var isFirstRender = React.useRef(true);
  React.useEffect(function () {
    if (!isFirstRender.current) {
      setStrategyAvailability();
    } else {
      isFirstRender.current = false;
    }
  }, [setStrategyAvailability]);
};