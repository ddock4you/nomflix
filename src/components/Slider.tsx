import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../util";

const Wrapper = styled.div`
    position: relative;
    top: -100px;
    padding-bottom: 300px;
    overflow: hidden;
`;

const Title = styled.h3`
    margin-bottom: 12px;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
    background-color: white;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    font-size: 66px;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const RemoteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 120px;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 1;
`;

const PrevButton = styled(RemoteButton)`
    left: 0;
`;

const NextButton = styled(RemoteButton)`
    right: 0;
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
        color: #fff;
    }
`;

const rowVariants = {
    hidden: (isNext: boolean) => {
        return {
            x: isNext === true ? window.innerWidth + 5 : -window.innerWidth - 5,
        };
    },
    visible: {
        x: 0,
    },
    exit: (isNext: boolean) => {
        return {
            x: isNext === true ? -window.innerWidth - 5 : window.innerWidth + 5,
        };
    },
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: 40,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
};

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
};

const offset = 6;

const Slider = ({
    list,
    title,
    isLoading,
    path,
}: {
    list: IGetMoviesResult | undefined;
    title: string;
    isLoading: boolean;
    path: string;
}) => {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const incraseIndex = () => {
        if (list) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = list.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
            setIsNext(true);
        }
    };

    const decraseIndex = () => {
        if (list) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = list.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
            setIsNext(false);
        }
    };

    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (id: number) => {
        history.push(`/${path}/${id}`);
    };

    return list?.results && list?.results.length > 0 ? (
        <Wrapper className="slider">
            <Title>{title}</Title>
            <PrevButton onClick={decraseIndex}>&lt;</PrevButton>
            <NextButton onClick={incraseIndex}>&gt;</NextButton>
            <AnimatePresence
                custom={isNext}
                initial={false}
                onExitComplete={toggleLeaving}
            >
                <Row
                    custom={isNext}
                    variants={rowVariants}
                    initial="hidden"
                    // initial={{ x: isNext ? width + 5 : -width - 5 }}
                    animate="visible"
                    exit="exit"
                    // exit={{ x: isNext ? -width - 5 : width + 5 }}
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                >
                    {list?.results
                        .slice(1)
                        .slice(offset * index, offset * index + offset)
                        .map((movie) => (
                            <Box
                                key={movie.id}
                                whileHover="hover"
                                initial="normal"
                                variants={boxVariants}
                                transition={{ type: "tween" }}
                                bgphoto={makeImagePath(
                                    movie.backdrop_path,
                                    "w500"
                                )}
                                onClick={() => onBoxClicked(movie.id)}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{movie.title || movie.name}</h4>
                                </Info>
                            </Box>
                        ))}
                </Row>
            </AnimatePresence>
        </Wrapper>
    ) : (
        <>
            <Title>{title}</Title>
            <p>표시할 영상이 없습니다.</p>
        </>
    );
};

export default Slider;
