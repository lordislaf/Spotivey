/// <reference types="react" />
import { StylesOptions } from '../types/common';
import { SpotifyDevice } from '../types/spotify';
interface Props {
    currentDeviceId: string;
    deviceId: string;
    devices: SpotifyDevice[];
    isDevicesOpen: boolean;
    onClickDevice: (deviceId: string) => any;
    playerPosition: string;
    setVolume: (volume: number) => any;
    styles: StylesOptions;
    volume: number;
}
declare function Actions(props: Props): JSX.Element;
export default Actions;
