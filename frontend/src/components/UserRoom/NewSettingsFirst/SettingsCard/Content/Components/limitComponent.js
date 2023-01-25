import * as React from "react";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function LimitComponent(){
    function tooltipRender(){
        return(
            <div className='tooltip-render-container'>
                <body1 className='tooltip-render-text'>
                    The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
                    <div className="tooltip-limit-container">
                        <div className="tooltip-limit-text-container">
                            <body1 className="tooltip-limit-text-left">
                                &#062;= 0
                            </body1>
                            <body1 className="tooltip-limit-text-right">
                                &#060;= 50
                            </body1>
                        </div>
                        <div className="tooltip-limit-text-container">
                            <body1 className="tooltip-limit-text-left">
                                Default value:
                            </body1>
                            <body1 className="tooltip-limit-text-right">
                                20
                            </body1>
                        </div>
                        <div className="tooltip-limit-text-container">
                            <body1 className="tooltip-limit-text-left">
                                Example value:
                            </body1>
                            <body1 className="tooltip-limit-text-right">
                                10
                            </body1>
                        </div>
                    </div>
                </body1>
            </div>
        )
    }

    return(
        <React.Fragment>
            <div className='textField-info-container'>
                <h2 class='figcaption-text'>
                    limit
                </h2>
                <Tooltip 
                    title={tooltipRender()} 
                    placement="top-end" 
                    fontSize='small'
                    sx={{ 
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginRight: 'auto',
                        marginLeft: '10px',
                    }}
                >
                    <InfoOutlinedIcon />
                </Tooltip>
            </div>
        </React.Fragment>
    )
}