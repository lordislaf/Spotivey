import * as React from "react";
import { Button, Tooltip } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export function saveButton (
    setOpenDialog, 
    mySwiperActiveIndex, countCheckboxen, changeTextfield, update
    ) {

    function saveButtonPressed() {
        setOpenDialog(true)
    }

    function renderSaveButton(type){
      return(
        <div class='speicher-button'>
            {countCheckboxen===0 || !changeTextfield ?
            <Tooltip title={countCheckboxen===0 && !changeTextfield ? 
              'check some Checkboxes and complete Main Settings' : 
              countCheckboxen===0 ?
                'no Checkbox checked' : 
                'main Settings incomplete'
            }>
              <span>
                <Button 
                  variant="contained" 
                  endIcon={<SaveOutlinedIcon />} 
                  color='inherit'
                  onClick={saveButtonPressed}
                  disabled
                >
                  {type}
                </Button>
              </span>
            </Tooltip> : 
            <Button 
              variant="contained" 
              endIcon={<SaveOutlinedIcon />} 
              color='inherit'
              onClick={saveButtonPressed}
            >
              {type}
            </Button>
            }
        </div>
      )
    }
    return(
      <React.Fragment>
        {update ? renderSaveButton('Update') : renderSaveButton('Save')}
      </React.Fragment>
    )
}