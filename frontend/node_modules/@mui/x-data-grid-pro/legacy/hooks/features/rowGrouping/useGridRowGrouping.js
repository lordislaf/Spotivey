import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Divider from '@mui/material/Divider';
import { GridEvents, useGridApiEventHandler, useGridApiMethod, gridFilteredDescendantCountLookupSelector } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor, isDeepEqual } from '@mui/x-data-grid/internals';
import { gridRowGroupingModelSelector, gridRowGroupingSanitizedModelSelector, gridRowGroupingStateSelector } from './gridRowGroupingSelector';
import { getRowGroupingFieldFromGroupingCriteria, ROW_GROUPING_STRATEGY, isGroupingColumn, mergeStateWithRowGroupingModel, setStrategyAvailability } from './gridRowGroupingUtils';
import { GridRowGroupableColumnMenuItems } from '../../../components/GridRowGroupableColumnMenuItems';
import { GridRowGroupingColumnMenuItems } from '../../../components/GridRowGroupingColumnMenuItems';
import { jsx as _jsx } from "react/jsx-runtime";
export var rowGroupingStateInitializer = function rowGroupingStateInitializer(state, props) {
  var _ref, _props$rowGroupingMod, _props$initialState, _props$initialState$r;

  return _extends({}, state, {
    rowGrouping: {
      model: (_ref = (_props$rowGroupingMod = props.rowGroupingModel) != null ? _props$rowGroupingMod : (_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$r = _props$initialState.rowGrouping) == null ? void 0 : _props$initialState$r.model) != null ? _ref : [],
      unstable_sanitizedModelOnLastRowTreeCreation: []
    }
  });
};
/**
 * Only available in DataGridPro
 * @requires useGridColumns (state, method) - can be after, async only
 * @requires useGridRows (state, method) - can be after, async only
 * @requires useGridParamsApi (method) - can be after, async only
 * TODO: Move the the Premium plan once available and remove the `experimentalFeatures.rowGrouping` flag
 */

export var useGridRowGrouping = function useGridRowGrouping(apiRef, props) {
  apiRef.current.unstable_updateControlState({
    stateId: 'rowGrouping',
    propModel: props.rowGroupingModel,
    propOnChange: props.onRowGroupingModelChange,
    stateSelector: gridRowGroupingModelSelector,
    changeEvent: GridEvents.rowGroupingModelChange
  });
  /**
   * API METHODS
   */

  var setRowGroupingModel = React.useCallback(function (model) {
    var currentModel = gridRowGroupingModelSelector(apiRef);

    if (currentModel !== model) {
      apiRef.current.setState(mergeStateWithRowGroupingModel(model));
      setStrategyAvailability(apiRef, props.disableRowGrouping);
      apiRef.current.forceUpdate();
    }
  }, [apiRef, props.disableRowGrouping]);
  var addRowGroupingCriteria = React.useCallback(function (field, groupingIndex) {
    var currentModel = gridRowGroupingModelSelector(apiRef);

    if (currentModel.includes(field)) {
      return;
    }

    var cleanGroupingIndex = groupingIndex != null ? groupingIndex : currentModel.length;
    var updatedModel = [].concat(_toConsumableArray(currentModel.slice(0, cleanGroupingIndex)), [field], _toConsumableArray(currentModel.slice(cleanGroupingIndex)));
    apiRef.current.setRowGroupingModel(updatedModel);
  }, [apiRef]);
  var removeRowGroupingCriteria = React.useCallback(function (field) {
    var currentModel = gridRowGroupingModelSelector(apiRef);

    if (!currentModel.includes(field)) {
      return;
    }

    apiRef.current.setRowGroupingModel(currentModel.filter(function (el) {
      return el !== field;
    }));
  }, [apiRef]);
  var setRowGroupingCriteriaIndex = React.useCallback(function (field, targetIndex) {
    var currentModel = gridRowGroupingModelSelector(apiRef);
    var currentTargetIndex = currentModel.indexOf(field);

    if (currentTargetIndex === -1) {
      return;
    }

    var updatedModel = _toConsumableArray(currentModel);

    updatedModel.splice(targetIndex, 0, updatedModel.splice(currentTargetIndex, 1)[0]);
    apiRef.current.setRowGroupingModel(updatedModel);
  }, [apiRef]);
  var rowGroupingApi = {
    setRowGroupingModel: setRowGroupingModel,
    addRowGroupingCriteria: addRowGroupingCriteria,
    removeRowGroupingCriteria: removeRowGroupingCriteria,
    setRowGroupingCriteriaIndex: setRowGroupingCriteriaIndex
  };
  useGridApiMethod(apiRef, rowGroupingApi, 'GridRowGroupingApi');
  /**
   * PRE-PROCESSING
   */

  var addColumnMenuButtons = React.useCallback(function (initialValue, columns) {
    if (props.disableRowGrouping) {
      return initialValue;
    }

    var menuItems;

    if (isGroupingColumn(columns.field)) {
      menuItems = /*#__PURE__*/_jsx(GridRowGroupingColumnMenuItems, {});
    } else if (columns.groupable) {
      menuItems = /*#__PURE__*/_jsx(GridRowGroupableColumnMenuItems, {});
    } else {
      menuItems = null;
    }

    if (menuItems == null) {
      return initialValue;
    }

    return [].concat(_toConsumableArray(initialValue), [/*#__PURE__*/_jsx(Divider, {}), menuItems]);
  }, [props.disableRowGrouping]);
  var stateExportPreProcessing = React.useCallback(function (prevState) {
    if (props.disableRowGrouping) {
      return prevState;
    }

    var rowGroupingModelToExport = gridRowGroupingModelSelector(apiRef);

    if (rowGroupingModelToExport.length === 0) {
      return prevState;
    }

    return _extends({}, prevState, {
      rowGrouping: {
        model: rowGroupingModelToExport
      }
    });
  }, [apiRef, props.disableRowGrouping]);
  var stateRestorePreProcessing = React.useCallback(function (params, context) {
    var _context$stateToResto;

    if (props.disableRowGrouping) {
      return params;
    }

    var rowGroupingModel = (_context$stateToResto = context.stateToRestore.rowGrouping) == null ? void 0 : _context$stateToResto.model;

    if (rowGroupingModel != null) {
      apiRef.current.setState(mergeStateWithRowGroupingModel(rowGroupingModel));
    }

    return params;
  }, [apiRef, props.disableRowGrouping]);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuButtons);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  /**
   * EVENTS
   */

  var handleCellKeyDown = React.useCallback(function (params, event) {
    var cellParams = apiRef.current.getCellParams(params.id, params.field);

    if (isGroupingColumn(cellParams.field) && event.key === ' ' && !event.shiftKey) {
      var _gridFilteredDescenda;

      event.stopPropagation();
      event.preventDefault();
      var filteredDescendantCount = (_gridFilteredDescenda = gridFilteredDescendantCountLookupSelector(apiRef)[params.id]) != null ? _gridFilteredDescenda : 0;
      var isOnGroupingCell = props.rowGroupingColumnMode === 'single' || getRowGroupingFieldFromGroupingCriteria(params.rowNode.groupingField) === params.field;

      if (!isOnGroupingCell || filteredDescendantCount === 0) {
        return;
      }

      apiRef.current.setRowChildrenExpansion(params.id, !params.rowNode.childrenExpanded);
    }
  }, [apiRef, props.rowGroupingColumnMode]);
  var checkGroupingColumnsModelDiff = React.useCallback(function () {
    var rowGroupingModel = gridRowGroupingSanitizedModelSelector(apiRef);
    var lastGroupingColumnsModelApplied = gridRowGroupingStateSelector(apiRef.current.state).unstable_sanitizedModelOnLastRowTreeCreation;

    if (!isDeepEqual(lastGroupingColumnsModelApplied, rowGroupingModel)) {
      apiRef.current.setState(function (state) {
        return _extends({}, state, {
          rowGrouping: _extends({}, state.rowGrouping, {
            unstable_sanitizedModelOnLastRowTreeCreation: rowGroupingModel
          })
        });
      });
      apiRef.current.unstable_requestPipeProcessorsApplication('hydrateColumns');
      setStrategyAvailability(apiRef, props.disableRowGrouping); // Refresh the row tree creation strategy processing
      // TODO: Add a clean way to re-run a strategy processing without publishing a private event

      if (apiRef.current.unstable_getActiveStrategy('rowTree') === ROW_GROUPING_STRATEGY) {
        apiRef.current.publishEvent(GridEvents.activeStrategyProcessorChange, 'rowTreeCreation');
      }
    }
  }, [apiRef, props.disableRowGrouping]);
  useGridApiEventHandler(apiRef, GridEvents.cellKeyDown, handleCellKeyDown);
  useGridApiEventHandler(apiRef, GridEvents.columnsChange, checkGroupingColumnsModelDiff);
  useGridApiEventHandler(apiRef, GridEvents.rowGroupingModelChange, checkGroupingColumnsModelDiff);
  /**
   * EFFECTS
   */

  React.useEffect(function () {
    if (props.rowGroupingModel !== undefined) {
      apiRef.current.setRowGroupingModel(props.rowGroupingModel);
    }
  }, [apiRef, props.rowGroupingModel]);
};