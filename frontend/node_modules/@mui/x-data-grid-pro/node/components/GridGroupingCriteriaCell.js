"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGroupingCriteriaCell = void 0;

var React = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _Box = _interopRequireDefault(require("@mui/material/Box"));

var _xDataGrid = require("@mui/x-data-grid");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['groupingCriteriaCell'],
    toggle: ['groupingCriteriaCellToggle']
  };
  return (0, _material.unstable_composeClasses)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};

const GridGroupingCriteriaCell = props => {
  var _filteredDescendantCo;

  const {
    id,
    field,
    rowNode,
    hideDescendantCount,
    formattedValue
  } = props;
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const filteredDescendantCountLookup = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridFilteredDescendantCountLookupSelector);
  const filteredDescendantCount = (_filteredDescendantCo = filteredDescendantCountLookup[rowNode.id]) != null ? _filteredDescendantCo : 0;
  const Icon = rowNode.childrenExpanded ? rootProps.components.GroupingCriteriaCollapseIcon : rootProps.components.GroupingCriteriaExpandIcon;

  const handleKeyDown = event => {
    if (event.key === ' ') {
      event.stopPropagation();
    }

    apiRef.current.publishEvent(_xDataGrid.GridEvents.cellKeyDown, props, event);
  };

  const handleClick = event => {
    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation();
  };

  const marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 0 : rowNode.depth * 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
    className: classes.root,
    sx: {
      ml: marginLeft
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: classes.toggle,
      children: filteredDescendantCount > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
        size: "small",
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: -1,
        "aria-label": rowNode.childrenExpanded ? apiRef.current.getLocaleText('treeDataCollapse') : apiRef.current.getLocaleText('treeDataExpand'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, {
          fontSize: "inherit"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [formattedValue === undefined ? rowNode.groupingKey : formattedValue, !hideDescendantCount && filteredDescendantCount > 0 ? ` (${filteredDescendantCount})` : '']
    })]
  });
};

exports.GridGroupingCriteriaCell = GridGroupingCriteriaCell;