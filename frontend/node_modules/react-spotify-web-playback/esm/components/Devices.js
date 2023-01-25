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
import ClickOutside from './ClickOutside';
import DevicesIcon from './icons/Devices';
import { px, styled } from '../styles';
var Wrapper = styled('div')({
    'pointer-events': 'all',
    position: 'relative',
    zIndex: 20,
    '> div': {
        display: 'flex',
        flexDirection: 'column',
        padding: px(8),
        position: 'absolute',
        right: "-" + px(3),
        button: {
            display: 'block',
            padding: px(8),
            whiteSpace: 'nowrap',
            '&.rswp__devices__active': {
                fontWeight: 'bold',
            },
        },
    },
    '> button': {
        fontSize: px(26),
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
            _b.button = {
                color: style.c,
            },
            _b),
    });
}, 'DevicesRSWP');
var Devices = /** @class */ (function (_super) {
    __extends(Devices, _super);
    function Devices(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickSetDevice = function (event) {
            var onClickDevice = _this.props.onClickDevice;
            var dataset = event.currentTarget.dataset;
            /* istanbul ignore else */
            if (dataset.id) {
                onClickDevice(dataset.id);
                _this.setState({ isOpen: false });
            }
        };
        _this.handleClickToggleDevices = function () {
            _this.setState(function (state) { return ({ isOpen: !state.isOpen }); });
        };
        _this.state = {
            isOpen: props.open,
        };
        return _this;
    }
    Devices.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, currentDeviceId = _a.currentDeviceId, deviceId = _a.deviceId, devices = _a.devices, playerPosition = _a.playerPosition, _b = _a.styles, activeColor = _b.activeColor, altColor = _b.altColor, bgColor = _b.bgColor, color = _b.color;
        return (React.createElement(Wrapper, { style: {
                altColor: altColor,
                bgColor: bgColor,
                c: currentDeviceId && deviceId && currentDeviceId !== deviceId ? activeColor : color,
                p: playerPosition,
            } }, !!devices.length && (React.createElement(React.Fragment, null,
            isOpen && (React.createElement(ClickOutside, { onClick: this.handleClickToggleDevices }, devices.map(function (d) { return (React.createElement("button", { key: d.id, className: d.id === currentDeviceId ? 'rswp__devices__active' : undefined, "data-id": d.id, onClick: _this.handleClickSetDevice, type: "button" }, d.name)); }))),
            React.createElement("button", { onClick: this.handleClickToggleDevices, type: "button" },
                React.createElement(DevicesIcon, null))))));
    };
    return Devices;
}(React.PureComponent));
export default Devices;
//# sourceMappingURL=Devices.js.map