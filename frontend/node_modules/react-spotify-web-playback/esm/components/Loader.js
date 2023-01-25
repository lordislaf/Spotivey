import * as React from 'react';
import { keyframes, px, styled } from '../styles';
var Wrapper = styled('div')({
    margin: '0 auto',
    position: 'relative',
    '> div': {
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: 0,
        boxSizing: 'border-box',
        height: 0,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 0,
    },
}, function (_a) {
    var style = _a.style;
    var pulse = keyframes({
        '0%': {
            height: 0,
            width: 0,
        },
        '30%': {
            borderWidth: px(8),
            height: px(style.loaderSize),
            opacity: 1,
            width: px(style.loaderSize),
        },
        '100%': {
            borderWidth: 0,
            height: px(style.loaderSize),
            opacity: 0,
            width: px(style.loaderSize),
        },
    });
    return {
        height: px(style.loaderSize),
        width: px(style.loaderSize),
        '> div': {
            animation: pulse + " 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1)",
            borderColor: style.loaderColor,
        },
    };
}, 'LoaderRSWP');
function Loader(_a) {
    var _b = _a.styles, loaderColor = _b.loaderColor, loaderSize = _b.loaderSize;
    return (React.createElement(Wrapper, { style: { loaderColor: loaderColor, loaderSize: loaderSize } },
        React.createElement("div", null)));
}
export default Loader;
//# sourceMappingURL=Loader.js.map