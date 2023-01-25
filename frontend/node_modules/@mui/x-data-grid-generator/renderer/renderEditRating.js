import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function EditRating(props) {
  const {
    id,
    value,
    api,
    field
  } = props;

  const handleChange = event => {
    api.setEditCellValue({
      id,
      field,
      value: Number(event.target.value)
    }, event); // Check if the event is not from the keyboard
    // https://github.com/facebook/react/issues/7407

    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      api.commitCellChange({
        id,
        field
      });
      api.setCellMode(id, field, 'view');
    }
  };

  const handleRef = element => {
    if (element) {
      element.querySelector(`input[value="${value}"]`).focus();
    }
  };

  return /*#__PURE__*/_jsxs(Box, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '24px',
      color: 'text.secondary',
      mr: 1
    },
    children: [/*#__PURE__*/_jsx(Rating, {
      ref: handleRef,
      name: "rating",
      value: Number(value),
      precision: 1,
      onChange: handleChange,
      sx: {
        mr: 1
      }
    }), Number(value)]
  });
}

export function renderEditRating(params) {
  return /*#__PURE__*/_jsx(EditRating, _extends({}, params));
}