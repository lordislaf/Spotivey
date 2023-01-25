"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridTreeDataPreProcessors = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _xDataGrid = require("@mui/x-data-grid");

var _internals = require("@mui/x-data-grid/internals");

var _gridTreeDataGroupColDef = require("./gridTreeDataGroupColDef");

var _gridTreeDataUtils = require("./gridTreeDataUtils");

var _components = require("../../../components");

var _buildRowTree = require("../../../utils/tree/buildRowTree");

var _sortRowTree = require("../../../utils/tree/sortRowTree");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["hideDescendantCount"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridTreeDataPreProcessors = (apiRef, props) => {
  const setStrategyAvailability = React.useCallback(() => {
    apiRef.current.unstable_setStrategyAvailability('rowTree', _gridTreeDataUtils.TREE_DATA_STRATEGY, props.treeData ? () => true : () => false);
  }, [apiRef, props.treeData]);
  const getGroupingColDef = React.useCallback(() => {
    var _colDefOverride;

    const groupingColDefProp = props.groupingColDef;
    let colDefOverride;

    if (typeof groupingColDefProp === 'function') {
      const params = {
        groupingName: _gridTreeDataUtils.TREE_DATA_STRATEGY,
        fields: []
      };
      colDefOverride = groupingColDefProp(params);
    } else {
      colDefOverride = groupingColDefProp;
    }

    const _ref = (_colDefOverride = colDefOverride) != null ? _colDefOverride : {},
          {
      hideDescendantCount
    } = _ref,
          colDefOverrideProperties = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);

    const commonProperties = (0, _extends2.default)({}, _gridTreeDataGroupColDef.GRID_TREE_DATA_GROUPING_COL_DEF, {
      renderCell: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.GridTreeDataGroupingCell, (0, _extends2.default)({}, params, {
        hideDescendantCount: hideDescendantCount
      })),
      headerName: apiRef.current.getLocaleText('treeDataGroupingHeaderName')
    });
    return (0, _extends2.default)({}, commonProperties, colDefOverrideProperties, _gridTreeDataGroupColDef.GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES);
  }, [apiRef, props.groupingColDef]);
  const updateGroupingColumn = React.useCallback(columnsState => {
    const groupingColDefField = _gridTreeDataGroupColDef.GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES.field;
    const shouldHaveGroupingColumn = props.treeData;
    const prevGroupingColumn = columnsState.lookup[groupingColDefField];

    if (shouldHaveGroupingColumn) {
      const newGroupingColumn = getGroupingColDef();

      if (prevGroupingColumn) {
        newGroupingColumn.width = prevGroupingColumn.width;
        newGroupingColumn.flex = prevGroupingColumn.flex;
      }

      columnsState.lookup[groupingColDefField] = newGroupingColumn;

      if (prevGroupingColumn == null) {
        const index = columnsState.all[0] === '__check__' ? 1 : 0;
        columnsState.all = [...columnsState.all.slice(0, index), groupingColDefField, ...columnsState.all.slice(index)];
      }
    } else if (!shouldHaveGroupingColumn && prevGroupingColumn) {
      delete columnsState.lookup[groupingColDefField];
      columnsState.all = columnsState.all.filter(field => field !== groupingColDefField);
    }

    return columnsState;
  }, [props.treeData, getGroupingColDef]);
  const createRowTree = React.useCallback(params => {
    if (!props.getTreeDataPath) {
      throw new Error('MUI: No getTreeDataPath given.');
    }

    const rows = params.ids.map(rowId => ({
      id: rowId,
      path: props.getTreeDataPath(params.idRowsLookup[rowId]).map(key => ({
        key,
        field: null
      }))
    })).sort((a, b) => a.path.length - b.path.length);
    return (0, _buildRowTree.buildRowTree)((0, _extends2.default)({
      rows
    }, params, {
      defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      isGroupExpandedByDefault: props.isGroupExpandedByDefault,
      groupingName: _gridTreeDataUtils.TREE_DATA_STRATEGY,
      onDuplicatePath: (firstId, secondId, path) => {
        throw new Error(['MUI: The path returned by `getTreeDataPath` should be unique.', `The rows with id #${firstId} and #${secondId} have the same.`, `Path: ${JSON.stringify(path.map(step => step.key))}.`].join('\n'));
      }
    }));
  }, [props.getTreeDataPath, props.defaultGroupingExpansionDepth, props.isGroupExpandedByDefault]);
  const filterRows = React.useCallback(params => {
    const rowTree = (0, _xDataGrid.gridRowTreeSelector)(apiRef);
    return (0, _gridTreeDataUtils.filterRowTreeFromTreeData)({
      rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters,
      disableChildrenFiltering: props.disableChildrenFiltering
    });
  }, [apiRef, props.disableChildrenFiltering]);
  const sortRows = React.useCallback(params => {
    const rowTree = (0, _xDataGrid.gridRowTreeSelector)(apiRef);
    const rowIds = (0, _xDataGrid.gridRowIdsSelector)(apiRef);
    return (0, _sortRowTree.sortRowTree)({
      rowTree,
      rowIds,
      sortRowList: params.sortRowList,
      disableChildrenSorting: props.disableChildrenSorting
    });
  }, [apiRef, props.disableChildrenSorting]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'hydrateColumns', updateGroupingColumn);
  (0, _internals.useGridRegisterStrategyProcessor)(apiRef, _gridTreeDataUtils.TREE_DATA_STRATEGY, 'rowTreeCreation', createRowTree);
  (0, _internals.useGridRegisterStrategyProcessor)(apiRef, _gridTreeDataUtils.TREE_DATA_STRATEGY, 'filtering', filterRows);
  (0, _internals.useGridRegisterStrategyProcessor)(apiRef, _gridTreeDataUtils.TREE_DATA_STRATEGY, 'sorting', sortRows);
  /**
   * 1ST RENDER
   */

  (0, _xDataGrid.useFirstRender)(() => {
    setStrategyAvailability();
  });
  /**
   * EFFECTS
   */

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (!isFirstRender.current) {
      setStrategyAvailability();
    } else {
      isFirstRender.current = false;
    }
  }, [setStrategyAvailability]);
};

exports.useGridTreeDataPreProcessors = useGridTreeDataPreProcessors;