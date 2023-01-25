import * as React from 'react';
import { px, styled } from '../styles';
var Wrapper = styled('p')({
    textAlign: 'center',
    width: '100%',
}, function (_a) {
    var style = _a.style;
    return ({
        borderTop: "1px solid " + style.errorColor,
        color: style.errorColor,
        height: px(style.h),
        lineHeight: px(style.h),
    });
}, 'ErrorRSWP');
function ErrorMessage(_a) {
    var children = _a.children, _b = _a.styles, errorColor = _b.errorColor, height = _b.height;
    return React.createElement(Wrapper, { style: { errorColor: errorColor, h: height } }, children);
}
export default ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map