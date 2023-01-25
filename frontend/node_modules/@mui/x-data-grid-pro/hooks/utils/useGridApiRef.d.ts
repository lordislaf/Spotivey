import * as React from 'react';
import { GridApiCommon } from '@mui/x-data-grid';
import { GridApiPro } from '../../models/gridApiPro';
export declare const useGridApiRef: <Api extends GridApiCommon = GridApiPro>() => React.MutableRefObject<Api>;
