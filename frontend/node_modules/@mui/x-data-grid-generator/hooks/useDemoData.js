import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import LRUCache from 'lru-cache';
import { getRealGridData } from '../services/real-data-service';
import { getCommodityColumns } from '../columns/commodities.columns';
import { getEmployeeColumns } from '../columns/employees.columns';
import asyncWorker from '../services/asyncWorker';
import { addTreeDataOptionsToDemoData } from '../services/tree-data-generator';
const dataCache = new LRUCache({
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

    asyncWorker({
      work,
      done: () => resolve(_extends({}, data, {
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

export const useDemoData = options => {
  var _options$treeData4, _options$treeData5, _options$treeData6;

  const [rowLength, setRowLength] = React.useState(options.rowLength);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const getColumns = React.useCallback(() => {
    let columns = options.dataSet === 'Commodity' ? getCommodityColumns(options.editable) : getEmployeeColumns();

    if (options.visibleFields) {
      columns = columns.map(col => {
        var _options$visibleField;

        return (_options$visibleField = options.visibleFields) != null && _options$visibleField.includes(col.field) ? col : _extends({}, col, {
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
    return addTreeDataOptionsToDemoData({
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
        newData = await getRealGridData(1000, getColumns());
        newData = await extrapolateSeed(rowLength, newData);
      } else {
        newData = await getRealGridData(rowLength, getColumns());
      }

      if (!active) {
        return;
      }

      newData = addTreeDataOptionsToDemoData(newData, {
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