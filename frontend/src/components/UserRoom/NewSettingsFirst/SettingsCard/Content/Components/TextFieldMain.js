import * as React from "react";
import { TextField, Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function TextFieldMain(title, label, setStateVar, value, type, changeURLCheck, tooltipRender, multiline) {
    return(
        <React.Fragment>
          <div className={'textField-info-container'}>
            <h2 data-heading='true' class='settings-content-item-title'>
                {title}
            </h2>
            {tooltipRender ? 
            <Tooltip 
              title={tooltipRender} 
              placement="top" 
              fontSize='small' 
              sx={{ 
                marginTop: 'auto',
                marginBottom: 'auto',
                marginRight: '10px',
                marginLeft: 'auto',
              }}>
                <InfoOutlinedIcon />
            </Tooltip> : null}
          </div>
          <TextField
            multiline={multiline?multiline:false}
            fullWidth={type?type:false}
            label={label}
            id="filled-size-normal"
            variant="filled"
            onChange={(e) => {setStateVar(e.target.value)}}
            value={value}
            disabled={changeURLCheck? true : false}
          />
        </React.Fragment>
      )
}