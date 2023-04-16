import styled from "styled-components";
import { useQuery } from "react-query";
import {
    IGetMoviesResult,
    IMovie,
    getLatestMovies,
    getMovies,
    getTopRatedMovies,
    getUpcomingMovies,
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
    color: ${({ bgphoto }) => (bgphoto ? "color" : "white")};
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

const Home = () => {
    const history = useHistory();
    const { data: latestData, isLoading: latestIsLoding } = useQuery<IMovie>(
        ["movies", "latest"],
        getLatestMovies
    );
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowplaying"],
        getMovies,
        {
            initialData,
        }
    );
    const { data: topRateData, isLoading: topRateIsLoding } =
        useQuery<IGetMoviesResult>(["movies", "top-rated"], getTopRatedMovies, {
            initialData,
        });
    const { data: upcommingData, isLoading: upcommingIsLoding } =
        useQuery<IGetMoviesResult>(["movies", "upcomming"], getUpcomingMovies, {
            initialData,
        });

    const allMovies: IMovie[] = [
        latestData!,
        ...data!.results,
        ...topRateData!.results,
        ...upcommingData!.results,
    ];

    const onBoxClicked = (id: number) => {
        history.push(`/movies/${id}`);
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
                            {latestData?.title}
                        </Title>
                        <More onClick={() => onBoxClicked(latestData!.id)}>
                            상세보기
                        </More>
                    </Banner>
                    <Slider
                        list={data}
                        title="NOW PLAYING"
                        isLoading={isLoading}
                        path={"movies"}
                    />
                    <Slider
                        list={topRateData}
                        title="TOP RATE"
                        isLoading={topRateIsLoding}
                        path={"movies"}
                    />
                    <Slider
                        list={upcommingData}
                        title="UPCOMMING"
                        isLoading={upcommingIsLoding}
                        path={"movies"}
                    />
                    <Popup allMovies={allMovies} path={"movies"} />
                </>
            )}
        </Wrapper>
    );
};
export default Home;
