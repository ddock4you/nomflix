const API_KEY = "848cb694beda16781b4e60598f6f0a37";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    name: string;
    original_title: string;
    original_name: string;
    overview: string;
    release_date: string;
    first_air_date: string;
    vote_average: number;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[] | [];
    total_pages: number;
    total_results: number;
}

export const initialData: IGetMoviesResult = {
    dates: {
        maximum: "",
        minimum: "",
    },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

// Movies
export const getMovies = async () => {
    return await (
        await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    ).json();
};

export const getLatestMovies = async () => {
    return await (
        await fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`)
    ).json();
};

export const getTopRatedMovies = async () => {
    return await (
        await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
    ).json();
};

export const getUpcomingMovies = async () => {
    return await (
        await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
    ).json();
};

// TVs
export const getLatestTVs = async () => {
    return await (
        await fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`)
    ).json();
};

export const getAiringTVs = async () => {
    return await (
        await fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
    ).json();
};

export const getPopularTVs = async () => {
    return await (
        await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`)
    ).json();
};

export const getTopRatedTVs = async () => {
    return await (
        await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
    ).json();
};

export const getSearchMovie = async (keyword: string) => {
    return await (
        await fetch(
            `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
        )
    ).json();
};

export const getSearchTV = async (keyword: string) => {
    return await (
        await fetch(
            `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
        )
    ).json();
};
