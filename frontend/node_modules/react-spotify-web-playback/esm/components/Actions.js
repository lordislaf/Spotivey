import * as React from 'react';
import Devices from './Devices';
import Volume from './Volume';
import { px, styled } from '../styles';
var Wrapper = styled('div')({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: px(10),
    'pointer-events': 'none',
    '> div + div': {
        marginLeft: px(10),
    },
    '@media (max-width: 1023px)': {
        bottom: 0,
        position: 'absolute',
        right: 0,
        width: 'auto',
    },
}, function (_a) {
    var style = _a.style;
    return ({
        height: px(style.h),
    });
}, 'ActionsRSWP');
function Actions(props) {
    var currentDeviceId = props.currentDeviceId, deviceId = props.deviceId, devices = props.devices, isDevicesOpen = props.isDevicesOpen, onClickDevice = props.onClickDevice, playerPosition = props.playerPosition, setVolume = props.setVolume, styles = props.styles, volume = props.volume;
    return (React.createElement(Wrapper, { style: { h: styles.height } },
        currentDeviceId && (React.createElement(Volume, { playerPosition: playerPosition, setVolume: setVolume, styles: styles, volume: volume })),
        React.createElement(Devices, { currentDeviceId: currentDeviceId, deviceId: deviceId, devices: devices, onClickDevice: onClickDevice, open: isDevicesOpen, playerPosition: playerPosition, styles: styles })));
}
export default Actions;
//# sourceMappingURL=Actions.js.map