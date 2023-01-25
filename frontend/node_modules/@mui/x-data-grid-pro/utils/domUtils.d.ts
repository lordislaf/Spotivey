import { GridApiPro } from '../models/gridApiPro';
export declare function getFieldFromHeaderElem(colCellEl: Element): string;
export declare function findHeaderElementFromField(elem: Element, field: string): Element | null;
export declare function findGridCellElementsFromCol(col: HTMLElement, api: GridApiPro): Element[];
