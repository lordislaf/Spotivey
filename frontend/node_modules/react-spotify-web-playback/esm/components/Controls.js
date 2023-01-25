import * as React from 'react';
import Next from './icons/Next';
import Pause from './icons/Pause';
import Play from './icons/Play';
import Previous from './icons/Previous';
import { px, styled } from '../styles';
var Wrapper = styled('div')({}, function (_a) {
    var style = _a.style;
    return ({
        alignItems: 'center',
        display: 'flex',
        height: px(style.h),
        justifyContent: 'center',
        '@media (max-width: 767px)': {
            padding: px(10),
        },
        '> div': {
            minWidth: px(style.h),
            textAlign: 'center',
        },
        button: {
            color: style.c,
            fontSize: px(16),
            '&.rswp__toggle': {
                fontSize: px(28),
            },
        },
    });
}, 'ControlsRSWP');
export default function Controls(props) {
    var isExternalDevice = props.isExternalDevice, isPlaying = props.isPlaying, nextTracks = props.nextTracks, onClickNext = props.onClickNext, onClickPrevious = props.onClickPrevious, onClickTogglePlay = props.onClickTogglePlay, previousTracks = props.previousTracks, _a = props.styles, color = _a.color, height = _a.height;
    return (React.createElement(Wrapper, { style: { c: color, h: height } },
        React.createElement("div", null, (!!previousTracks.length || isExternalDevice) && (React.createElement("button", { "aria-label": "Previous Track", onClick: onClickPrevious, type: "button" },
            React.createElement(Previous, null)))),
        React.createElement("div", null,
            React.createElement("button", { "aria-label": isPlaying ? 'Pause' : 'Play', className: "rswp__toggle", onClick: onClickTogglePlay, type: "button" }, isPlaying ? React.createElement(Pause, null) : React.createElement(Play, null))),
        React.createElement("div", null, (!!nextTracks.length || isExternalDevice) && (React.createElement("button", { "aria-label": "Next Track", onClick: onClickNext, type: "button" },
            React.createElement(Next, null))))));
}
//# sourceMappingURL=Controls.js.map