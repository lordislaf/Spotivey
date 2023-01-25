var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import RangeSlider from '@gilbarbara/react-range-slider';
import ClickOutside from './ClickOutside';
import VolumeHigh from './icons/VolumeHigh';
import VolumeLow from './icons/VolumeLow';
import VolumeMute from './icons/VolumeMute';
import { px, styled } from '../styles';
var Wrapper = styled('div')({
    'pointer-events': 'all',
    position: 'relative',
    zIndex: 20,
    '> div': {
        display: 'flex',
        flexDirection: 'column',
        padding: px(12),
        position: 'absolute',
        right: "-" + px(3),
    },
    '> button': {
        fontSize: px(26),
    },
    '@media (max-width: 1023px)': {
        display: 'none',
    },
}, function (_a) {
    var _b;
    var style = _a.style;
    return ({
        '> button': {
            color: style.c,
        },
        '> div': (_b = {
                backgroundColor: style.bgColor,
                boxShadow: style.altColor ? "1px 1px 10px " + style.altColor : 'none'
            },
            _b[style.p] = '120%',
            _b),
    });
}, 'VolumeRSWP');
var Volume = /** @class */ (function (_super) {
    __extends(Volume, _super);
    function Volume(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function () {
            _this.setState(function (state) { return ({ isOpen: !state.isOpen }); });
        };
        _this.handleChangeSlider = function (_a) {
            var y = _a.y;
            var setVolume = _this.props.setVolume;
            var volume = Math.round(y) / 100;
            clearTimeout(_this.timeout);
            _this.timeout = window.setTimeout(function () {
                setVolume(volume);
            }, 250);
            _this.setState({ volume: volume });
        };
        _this.handleAfterEnd = function () {
            setTimeout(function () {
                _this.setState({ isOpen: false });
            }, 100);
        };
        _this.state = {
            isOpen: false,
            volume: props.volume,
        };
        return _this;
    }
    Volume.prototype.componentDidUpdate = function (previousProps) {
        var volumeState = this.state.volume;
        var volume = this.props.volume;
        if (previousProps.volume !== volume && volume !== volumeState) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ volume: volume });
        }
    };
    Volume.prototype.render = function () {
        var _a = this.state, isOpen = _a.isOpen, volume = _a.volume;
        var _b = this.props, playerPosition = _b.playerPosition, _c = _b.styles, altColor = _c.altColor, bgColor = _c.bgColor, color = _c.color;
        var icon = React.createElement(VolumeHigh, null);
        if (volume === 0) {
            icon = React.createElement(VolumeMute, null);
        }
        else if (volume <= 0.5) {
            icon = React.createElement(VolumeLow, null);
        }
        return (React.createElement(Wrapper, { style: { altColor: altColor, bgColor: bgColor, c: color, p: playerPosition } },
            isOpen && (React.createElement(ClickOutside, { onClick: this.handleClick },
                React.createElement(RangeSlider, { axis: "y", className: "rrs", onAfterEnd: this.handleAfterEnd, onChange: this.handleChangeSlider, styles: {
                        options: {
                            thumbBorder: "2px solid " + color,
                            thumbBorderRadius: 12,
                            thumbColor: bgColor,
                            thumbSize: 12,
                            padding: 0,
                            rangeColor: altColor || '#ccc',
                            trackColor: color,
                            width: 6,
                        },
                    }, y: volume * 100, yMax: 100, yMin: 0 }))),
            React.createElement("button", { onClick: !isOpen ? this.handleClick : undefined, type: "button" }, icon)));
    };
    return Volume;
}(React.PureComponent));
export default Volume;
//# sourceMappingURL=Volume.js.map