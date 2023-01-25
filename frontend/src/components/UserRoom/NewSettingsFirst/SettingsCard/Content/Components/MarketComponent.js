import * as React from "react";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function MarketComponent(){
    function tooltipRender(){
        return(
            <div className='tooltip-render-container'>
                <body1 className='tooltip-render-text'>
                    If a country code is specified, only content that is available in that market will be returned.
                    <div className="tooltip-limit-container">
                        <div className="tooltip-limit-text-container">
                            <body1 className="tooltip-limit-text-left">
                                Example value:
                            </body1>
                            <body1 className="tooltip-limit-text-right">
                                "ES"
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
                    market
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