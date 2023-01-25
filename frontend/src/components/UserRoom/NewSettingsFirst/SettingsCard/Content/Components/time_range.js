import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TimeRange(props) { 

    return (
      <Autocomplete
        id="time_range"
        sx={{ width: 300 }}
        options={time_range}
        autoHighlight
        value = {props.props[0]}
        onChange={(event, newValue) => {
          if(newValue){
            props.props[1](newValue)
          }
          }}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.name} ({option.info})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="default (medium_term)"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }

  const time_range = [
      {name: 'short_term', info: 'approximately last 4 weeks'},
      {name: 'medium_term', info: 'approximately last 6 months'},
      {name: 'long_term', info: 'calculated from several years of data and including all new data as it becomes available'}
  ]