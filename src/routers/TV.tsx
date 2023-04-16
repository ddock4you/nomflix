import styled from "styled-components";
import { useQuery } from "react-query";
import {
    IGetMoviesResult,
    IMovie,
    getAiringTVs,
    getLatestTVs,
    getPopularTVs,
    getTopRatedTVs,
    initialData,
} from "../api";
import { makeImagePath } from "../util";
import Slider from "../components/Slider";
import Popup from "../components/Popup";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
    background: black;
    padding-bottom: 200px;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url(${(props) => props.bgphoto});
    background-size: cover;
`;

const Title = styled.h2<{ bgphoto: string | undefined }>`
    font-size: 68px;
    font-weight: 900;
    margin-bottom: 20px;
    color: #fff;
`;

const More = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    background-color: transparent;
    border: 2px solid red;
    border-radius: 15px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;

const TV = () => {
    const history = useHistory();
    const { data: latestData, isLoading: latestIsLoding } = useQuery<IMovie>(
        ["tvs", "latest"],
        getLatestTVs
    );
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["tvs", "airing-today"],
        getAiringTVs,
        {
            initialData,
        }
    );
    const { data: topRateData, isLoading: topRateIsLoding } =
        useQuery<IGetMoviesResult>(["tvs", "top-rated"], getTopRatedTVs, {
            initialData,
        });
    const { data: popularData, isLoading: popularIsLoding } =
        useQuery<IGetMoviesResult>(["tvs", "popular"], getPopularTVs, {
            initialData,
        });

    const allMovies: IMovie[] = [
        latestData!,
        ...data!.results,
        ...topRateData!.results,
        ...popularData!.results,
    ];

    const onBoxClicked = (id: number) => {
        history.push(`/nomflix/tvs/${id}`);
    };

    return (
        <Wrapper>
            {latestIsLoding ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        bgphoto={makeImagePath(latestData?.backdrop_path || "")}
                    >
                        <Title bgphoto={latestData?.backdrop_path}>
                            {latestData?.name}
                        </Title>
                        <More onClick={() => onBoxClicked(latestData!.id)}>
                            상세보기
                        </More>
                    </Banner>
                    <Slider
                        list={data}
                        title="Airing Today"
                        isLoading={isLoading}
                        path={"tvs"}
                    />
                    <Slider
                        list={popularData}
                        title="POPULAR"
                        isLoading={popularIsLoding}
                        path={"tvs"}
                    />
                    <Slider
                        list={topRateData}
                        title="TOP RATE"
                        isLoading={topRateIsLoding}
                        path={"tvs"}
                    />
                    <Popup allMovies={allMovies} path={"tvs"} />
                </>
            )}
        </Wrapper>
    );
};
export default TV;
