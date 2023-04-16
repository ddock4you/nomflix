import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IMovie } from "../api";
import { makeImagePath } from "../util";

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: fixed;
    width: 40vw;
    height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
`;

const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 46px;
    font-weight: 700;
    position: relative;
`;

const OriginalTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 24px;
    font-weight: 700;
    position: relative;
`;

const BigOverview = styled.p`
    line-height: 1.6;
    padding: 20px;
    position: relative;
    color: ${(props) => props.theme.white.lighter};
`;

const Popup = ({ allMovies, path }: { allMovies: IMovie[]; path: string }) => {
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ id: string }>(`/${path}/:id`);

    const onOverlayClick = () => {
        history.goBack();
    };
    const clickedMovie =
        bigMovieMatch?.params.id &&
        allMovies.find((movie) => movie.id === +bigMovieMatch.params.id);

    return (
        <AnimatePresence>
            {bigMovieMatch ? (
                <>
                    <Overlay
                        onClick={onOverlayClick}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <BigMovie layoutId={bigMovieMatch.params.id}>
                            {clickedMovie && (
                                <>
                                    <BigCover
                                        style={{
                                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                clickedMovie.backdrop_path,
                                                "w500"
                                            )})`,
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            transform: "translateY(-100px)",
                                        }}
                                    >
                                        {clickedMovie.poster_path ? (
                                            <img
                                                src={makeImagePath(
                                                    clickedMovie.poster_path,
                                                    "w300"
                                                )}
                                                alt={
                                                    clickedMovie.title ||
                                                    clickedMovie.name
                                                }
                                            />
                                        ) : (
                                            <p
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                    width: "300px",
                                                    height: "450px",
                                                    color: "#fff",
                                                    backgroundColor: "#000",
                                                }}
                                            >
                                                등록된 포스터가 없습니다.
                                            </p>
                                        )}
                                        <div>
                                            <p
                                                style={{
                                                    paddingLeft: "20px",
                                                    color: "#fff",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        marginRight: "40px",
                                                    }}
                                                >
                                                    <strong
                                                        style={{
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        출시일
                                                    </strong>{" "}
                                                    {clickedMovie.release_date ||
                                                        clickedMovie.first_air_date}
                                                </span>
                                                <span>
                                                    <strong
                                                        style={{
                                                            marginRight: "10px",
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        평점
                                                    </strong>
                                                    <i
                                                        style={{
                                                            color: "gold",
                                                        }}
                                                    >
                                                        {clickedMovie.vote_average ||
                                                            0}{" "}
                                                    </i>
                                                    / 10
                                                </span>
                                            </p>
                                            <BigTitle>
                                                {clickedMovie.title ||
                                                    clickedMovie.name}
                                            </BigTitle>
                                            <OriginalTitle>
                                                {clickedMovie.original_title ||
                                                    clickedMovie.original_name}
                                            </OriginalTitle>
                                            <BigOverview>
                                                {clickedMovie.overview}
                                            </BigOverview>
                                        </div>
                                    </div>
                                </>
                            )}
                        </BigMovie>
                    </Overlay>
                </>
            ) : null}
        </AnimatePresence>
    );
};

export default Popup;
