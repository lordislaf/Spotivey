import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useGridSelector, gridFilteredDescendantCountLookupSelector, getDataGridUtilityClass, GridEvents } from '@mui/x-data-grid';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['groupingCriteriaCell'],
    toggle: ['groupingCriteriaCellToggle']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export var GridGroupingCriteriaCell = function GridGroupingCriteriaCell(props) {
  var _filteredDescendantCo;

  var id = props.id,
      field = props.field,
      rowNode = props.rowNode,
      hideDescendantCount = props.hideDescendantCount,
      formattedValue = props.formattedValue;
  var rootProps = useGridRootProps();
  var apiRef = useGridApiContext();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var filteredDescendantCountLookup = useGridSelector(apiRef, gridFilteredDescendantCountLookupSelector);
  var filteredDescendantCount = (_filteredDescendantCo = filteredDescendantCountLookup[rowNode.id]) != null ? _filteredDescendantCo : 0;
  var Icon = rowNode.childrenExpanded ? rootProps.components.GroupingCriteriaCollapseIcon : rootProps.components.GroupingCriteriaExpandIcon;

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.stopPropagation();
    }

    apiRef.current.publishEvent(GridEvents.cellKeyDown, props, event);
  };

  var handleClick = function handleClick(event) {
    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation();
  };

  var marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 0 : rowNode.depth * 2;
  return /*#__PURE__*/_jsxs(Box, {
    className: classes.root,
    sx: {
      ml: marginLeft
    },
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.toggle,
      children: filteredDescendantCount > 0 && /*#__PURE__*/_jsx(IconButton, {
        size: "small",
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: -1,
        "aria-label": rowNode.childrenExpanded ? apiRef.current.getLocaleText('treeDataCollapse') : apiRef.current.getLocaleText('treeDataExpand'),
        children: /*#__PURE__*/_jsx(Icon, {
          fontSize: "inherit"
        })
      })
    }), /*#__PURE__*/_jsxs("span", {
      children: [formattedValue === undefined ? rowNode.groupingKey : formattedValue, !hideDescendantCount && filteredDescendantCount > 0 ? " (".concat(filteredDescendantCount, ")") : '']
    })]
  });
};