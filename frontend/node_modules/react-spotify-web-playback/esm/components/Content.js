import * as React from 'react';
import { px, styled } from '../styles';
var Wrapper = styled('div')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    '> *': {
        width: '100%',
        '@media (min-width: 1024px)': {
            width: '33.3333%',
        },
    },
    '@media (min-width: 1024px)': {
        flexDirection: 'row',
    },
}, function (_a) {
    var style = _a.style;
    return ({
        minHeight: px(style.h),
    });
}, 'ContentRSWP');
function Content(_a) {
    var children = _a.children, styles = _a.styles;
    return React.createElement(Wrapper, { style: { h: styles.height } }, children);
}
export default Content;
//# sourceMappingURL=Content.js.map