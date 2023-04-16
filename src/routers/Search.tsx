import { useQuery } from "react-query";
import { useLocation } from "react-router";
import {
    IGetMoviesResult,
    IMovie,
    getSearchMovie,
    getSearchTV,
    initialData,
} from "../api";
import styled from "styled-components";
import Slider from "../components/Slider";
import Popup from "../components/Popup";

const Wrapper = styled.div`
    background: black;
    height: 100vh;
`;

const Result = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    background-size: cover;
    & p {
        margin-bottom: 100px;
        font-size: 48px;
        font-weight: 700;
        color: #fff;
    }

    .slider {
        top: 0;
    }
`;

const Search = () => {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");

    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["search", "movie"],
        () => getSearchMovie(keyword || ""),
        {
            initialData,
        }
    );
    const { data: tvData, isLoading: tvIsLoading } = useQuery<IGetMoviesResult>(
        ["search", "tv"],
        () => getSearchTV(keyword || ""),
        {
            initialData,
        }
    );

    const allMovies: IMovie[] = [...data!.results, ...tvData!.results];

    return (
        <Wrapper>
            <Result>
                <p>검색결과</p>
                <Slider
                    list={data}
                    title="MOVIE"
                    isLoading={isLoading}
                    path={"search"}
                />
                <Slider
                    list={tvData}
                    title="TV"
                    isLoading={tvIsLoading}
                    path={"search"}
                />
            </Result>
            <Popup allMovies={allMovies} path={"search"} />
        </Wrapper>
    );
};
export default Search;
