import { GridColumns } from '@mui/x-data-grid-pro';
export declare type Movie = {
    id: number;
    title: string;
    gross: number;
    director: string;
    company: string;
    year: number;
    composer: {
        name: string;
    };
    cinematicUniverse?: string;
};
export declare const useMovieData: () => {
    rows: Movie[];
    columns: GridColumns<any>;
};
