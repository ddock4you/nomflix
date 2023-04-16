import { useQuery } from "react-query";
import {
    IGetMoviesResult,
    getLatestMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "../api";

export const useMultipleMovieQuery = () => {
    const latest = useQuery<IGetMoviesResult>(
        ["movie", "latest"],
        getLatestMovies
    );
    const topRated = useQuery<IGetMoviesResult>(
        ["movie", "topRated"],
        getTopRatedMovies
    );
    const upComming = useQuery<IGetMoviesResult>(
        ["movie", "upComming"],
        getUpcomingMovies
    );

    return [latest, topRated, upComming];
};
