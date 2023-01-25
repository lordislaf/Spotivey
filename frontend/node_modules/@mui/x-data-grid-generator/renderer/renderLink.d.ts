import * as React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
interface DemoLinkProps {
    href: string;
    children: string;
}
export declare const DemoLink: React.NamedExoticComponent<DemoLinkProps>;
export declare function renderLink(params: GridRenderCellParams<string, any, any>): "" | JSX.Element;
export {};
