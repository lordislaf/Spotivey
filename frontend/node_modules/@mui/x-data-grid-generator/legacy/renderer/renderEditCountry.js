import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { COUNTRY_ISO_OPTIONS } from '../services/static-data';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledAutocomplete = styled(Autocomplete)(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    height: '100%'
  }, "& .".concat(autocompleteClasses.inputRoot), _extends({}, theme.typography.body2, {
    padding: '1px 0',
    height: '100%',
    '& input': {
      padding: '0 16px',
      height: '100%'
    }
  }));
});

function EditCountry(props) {
  var id = props.id,
      value = props.value,
      api = props.api,
      field = props.field;
  var handleChange = React.useCallback(function (event, newValue) {
    api.setEditCellValue({
      id: id,
      field: field,
      value: newValue
    }, event);

    if (!event.key) {
      api.commitCellChange({
        id: id,
        field: field
      });
      api.setCellMode(id, field, 'view');
    }
  }, [api, field, id]);
  return /*#__PURE__*/_jsx(StyledAutocomplete, {
    value: value,
    onChange: handleChange,
    options: COUNTRY_ISO_OPTIONS,
    getOptionLabel: function getOptionLabel(option) {
      return option.label;
    },
    autoHighlight: true,
    fullWidth: true,
    open: true,
    disableClearable: true,
    renderOption: function renderOption(optionProps, option) {
      return /*#__PURE__*/_jsxs(Box, _extends({
        component: "li",
        sx: {
          '& > img': {
            mr: 1.5,
            flexShrink: 0
          }
        }
      }, optionProps, {
        children: [/*#__PURE__*/_jsx("img", {
          loading: "lazy",
          width: "20",
          src: "https://flagcdn.com/w20/".concat(option.code.toLowerCase(), ".png"),
          srcSet: "https://flagcdn.com/w40/".concat(option.code.toLowerCase(), ".png 2x"),
          alt: ""
        }), option.label]
      }));
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_jsx(InputBase, _extends({
        autoFocus: true,
        fullWidth: true,
        id: params.id,
        inputProps: _extends({}, params.inputProps, {
          autoComplete: 'new-password' // disable autocomplete and autofill

        })
      }, params.InputProps));
    }
  });
}

export function renderEditCountry(params) {
  return /*#__PURE__*/_jsx(EditCountry, _extends({}, params));
}