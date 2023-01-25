import * as React from "react";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function TimeRangeComponent(){
    function tooltipRender(){
        return(
            <div className='tooltip-render-container'>
                <body1 className='tooltip-render-text'>
                    Over what time frame the affinities are computed. Valid values:&nbsp;
                    <span className="tooltip-render-text-red">long_term</span> (calculated from several years of data and&nbsp;
                    including all new data as it becomes available),&nbsp;
                    <span className="tooltip-render-text-red">medium_term</span> (approximately last 6 months),&nbsp;
                    <span className="tooltip-render-text-red">short_term</span> (approximately last 4 weeks).&nbsp;
                    Default: <span className="tooltip-render-text-red">medium_term</span>
                    <div className="tooltip-limit-container">
                        <div className="tooltip-limit-text-container">
                            <body1 className="tooltip-limit-text-left">
                                Default value:
                            </body1>
                            <body1 className="tooltip-limit-text-right">
                                "medium_term"
                            </body1>
                        </div>
                        <div className="tooltip-limit-text-container">
                            <body1 className="tooltip-limit-text-left">
                                Example value:
                            </body1>
                            <body1 className="tooltip-limit-text-right">
                                "medium_term"
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
                    time_range
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