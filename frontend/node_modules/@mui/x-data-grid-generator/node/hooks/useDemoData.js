"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDemoData = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _lruCache = _interopRequireDefault(require("lru-cache"));

var _realDataService = require("../services/real-data-service");

var _commodities = require("../columns/commodities.columns");

var _employees = require("../columns/employees.columns");

var _asyncWorker = _interopRequireDefault(require("../services/asyncWorker"));

var _treeDataGenerator = require("../services/tree-data-generator");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const dataCache = new _lruCache.default({
  max: 10,
  ttl: 60 * 5 * 1e3 // 5 minutes

});

// Generate fake data from a seed.
// It's about x20 faster than getRealData.
async function extrapolateSeed(rowLength, data) {
  return new Promise(resolve => {
    const seed = data.rows;
    const rows = data.rows.slice();
    const tasks = {
      current: rowLength - seed.length
    };

    function work() {
      const row = {};

      for (let j = 0; j < data.columns.length; j += 1) {
        const column = data.columns[j];
        const index = Math.round(Math.random() * (seed.length - 1));

        if (column.field === 'id') {
          row.id = `id-${tasks.current + seed.length}`;
        } else {
          row[column.field] = seed[index][column.field];
        }
      }

      rows.push(row);
      tasks.current -= 1;
    }

    (0, _asyncWorker.default)({
      work,
      done: () => resolve((0, _extends2.default)({}, data, {
        rows
      })),
      tasks
    });
  });
}

const deepFreeze = object => {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object); // Freeze properties before freezing self
  // eslint-disable-next-line no-restricted-syntax

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};

const useDemoData = options => {
  var _options$treeData4, _options$treeData5, _options$treeData6;

  const [rowLength, setRowLength] = React.useState(options.rowLength);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const getColumns = React.useCallback(() => {
    let columns = options.dataSet === 'Commodity' ? (0, _commodities.getCommodityColumns)(options.editable) : (0, _employees.getEmployeeColumns)();

    if (options.visibleFields) {
      columns = columns.map(col => {
        var _options$visibleField;

        return (_options$visibleField = options.visibleFields) != null && _options$visibleField.includes(col.field) ? col : (0, _extends2.default)({}, col, {
          hide: true
        });
      });
    }

    if (options.maxColumns) {
      columns = columns.slice(0, options.maxColumns);
    }

    return columns;
  }, [options.dataSet, options.editable, options.maxColumns, options.visibleFields]);
  const [data, setData] = React.useState(() => {
    const columns = getColumns(); // TODO v6: Stop using `GridColDef.hide`

    const columnVisibilityModel = {};
    columns.forEach(col => {
      if (col.hide) {
        columnVisibilityModel[col.field] = false;
      }
    });
    return (0, _treeDataGenerator.addTreeDataOptionsToDemoData)({
      columns,
      rows: [],
      initialState: {
        columns: {
          columnVisibilityModel
        }
      }
    }, options.treeData);
  });
  React.useEffect(() => {
    const cacheKey = `${options.dataSet}-${rowLength}-${index}-${options.maxColumns}`; // Cache to allow fast switch between the JavaScript and TypeScript version
    // of the demos.

    if (dataCache.has(cacheKey)) {
      const newData = dataCache.get(cacheKey);
      setData(newData);
      setLoading(false);
      return undefined;
    }

    let active = true;

    (async () => {
      var _options$treeData, _options$treeData2, _options$treeData3;

      setLoading(true);
      let newData;

      if (rowLength > 1000) {
        newData = await (0, _realDataService.getRealGridData)(1000, getColumns());
        newData = await extrapolateSeed(rowLength, newData);
      } else {
        newData = await (0, _realDataService.getRealGridData)(rowLength, getColumns());
      }

      if (!active) {
        return;
      }

      newData = (0, _treeDataGenerator.addTreeDataOptionsToDemoData)(newData, {
        maxDepth: (_options$treeData = options.treeData) == null ? void 0 : _options$treeData.maxDepth,
        groupingField: (_options$treeData2 = options.treeData) == null ? void 0 : _options$treeData2.groupingField,
        averageChildren: (_options$treeData3 = options.treeData) == null ? void 0 : _options$treeData3.averageChildren
      }); // It's quite slow. No need for it in production.

      if (process.env.NODE_ENV !== 'production') {
        deepFreeze(newData);
      }

      dataCache.set(cacheKey, newData);
      setData(newData);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [rowLength, options.dataSet, options.maxColumns, (_options$treeData4 = options.treeData) == null ? void 0 : _options$treeData4.maxDepth, (_options$treeData5 = options.treeData) == null ? void 0 : _options$treeData5.groupingField, (_options$treeData6 = options.treeData) == null ? void 0 : _options$treeData6.averageChildren, index, getColumns]);
  return {
    data,
    loading,
    setRowLength,
    loadNewData: () => {
      setIndex(oldIndex => oldIndex + 1);
    }
  };
};

exports.useDemoData = useDemoData;