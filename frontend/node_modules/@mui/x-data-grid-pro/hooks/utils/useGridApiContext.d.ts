import * as React from 'react';
import { GridApiCommon } from '@mui/x-data-grid';
import { GridApiPro } from '../../models/gridApiPro';
export declare const useGridApiContext: <GridApi extends GridApiCommon = GridApiPro>() => React.MutableRefObject<GridApi>;
