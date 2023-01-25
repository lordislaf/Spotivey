import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridEvents } from '../../../models/events';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { useGridRegisterPipeProcessor } from '../../core/pipeProcessing';
import { gridPreferencePanelStateSelector } from './gridPreferencePanelSelector';
import { useGridSelector } from '../../utils/useGridSelector';
export var preferencePanelStateInitializer = function preferencePanelStateInitializer(state, props) {
  var _props$initialState$p, _props$initialState;

  return _extends({}, state, {
    preferencePanel: (_props$initialState$p = (_props$initialState = props.initialState) == null ? void 0 : _props$initialState.preferencePanel) != null ? _props$initialState$p : {
      open: false
    }
  });
};
/**
 * TODO: Add a single `setPreferencePanel` method to avoid multiple `setState`
 */

export var useGridPreferencesPanel = function useGridPreferencesPanel(apiRef) {
  var logger = useGridLogger(apiRef, 'useGridPreferencesPanel');
  var preferencePanelState = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  var hideTimeout = React.useRef();
  var immediateTimeout = React.useRef();
  /**
   * API METHODS
   */

  var hidePreferences = React.useCallback(function () {
    logger.debug('Hiding Preferences Panel');

    if (preferencePanelState.openedPanelValue) {
      apiRef.current.publishEvent(GridEvents.preferencePanelClose, {
        openedPanelValue: preferencePanelState.openedPanelValue
      });
    }

    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        preferencePanel: {
          open: false
        }
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, logger, preferencePanelState.openedPanelValue]); // This is to prevent the preferences from closing when you open a select box or another panel,
  // The issue is in MUI core V4 => Fixed in V5

  var doNotHidePanel = React.useCallback(function () {
    immediateTimeout.current = setTimeout(function () {
      return clearTimeout(hideTimeout.current);
    }, 0);
  }, []); // This is a hack for the issue with Core V4, by delaying hiding the panel on the clickAwayListener,
  // we can cancel the action if the trigger element still need the panel...

  var hidePreferencesDelayed = React.useCallback(function () {
    hideTimeout.current = setTimeout(hidePreferences, 100);
  }, [hidePreferences]);
  var showPreferences = React.useCallback(function (newValue) {
    logger.debug('Opening Preferences Panel');
    doNotHidePanel();
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        preferencePanel: _extends({}, state.preferencePanel, {
          open: true,
          openedPanelValue: newValue
        })
      });
    });
    apiRef.current.publishEvent(GridEvents.preferencePanelOpen, {
      openedPanelValue: newValue
    });
    apiRef.current.forceUpdate();
  }, [logger, doNotHidePanel, apiRef]);
  useGridApiMethod(apiRef, {
    showPreferences: showPreferences,
    hidePreferences: hidePreferencesDelayed
  }, 'ColumnMenuApi');
  /**
   * PRE-PROCESSING
   */

  var stateExportPreProcessing = React.useCallback(function (prevState) {
    var preferencePanelToExport = gridPreferencePanelStateSelector(apiRef.current.state);

    if (!preferencePanelToExport.open && !preferencePanelToExport.openedPanelValue) {
      return prevState;
    }

    return _extends({}, prevState, {
      preferencePanel: preferencePanelToExport
    });
  }, [apiRef]);
  var stateRestorePreProcessing = React.useCallback(function (params, context) {
    var preferencePanel = context.stateToRestore.preferencePanel;

    if (preferencePanel != null) {
      apiRef.current.setState(function (state) {
        return _extends({}, state, {
          preferencePanel: preferencePanel
        });
      });
    }

    return params;
  }, [apiRef]);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  /**
   * EFFECTS
   */

  React.useEffect(function () {
    return function () {
      clearTimeout(hideTimeout.current);
      clearTimeout(immediateTimeout.current);
    };
  }, []);
};