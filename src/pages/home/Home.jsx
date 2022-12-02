import { useEffect, useState } from "react";
import {
  Badge,
  Col,
  Container,
  Pagination,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  gamesSelector,
  loadGames,
  pageChanged,
} from "../../store/features/games/games.slice";
import Filter from "./Filter";
import styles from "./Home.module.css";

const Home = () => {
  const [startPage, setStartPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, []);

  const {
    data: games,
    loading,
    totalPage,
    currentPage,
  } = useSelector(gamesSelector);

  const totalPageArr = new Array(totalPage).fill(null);
  const PAGINAION_COUNT = 5;

  let paginationItems = [];
  if (totalPageArr.length <= PAGINAION_COUNT) {
    paginationItems = totalPageArr.map((value, index) => {
      return (
        <Pagination.Item
          key={index}
          active={index === currentPage}
          onClick={() => dispatch(pageChanged(index))}
        >
          {index + 1}
        </Pagination.Item>
      );
    });
  } else {
    paginationItems.push(
      <Pagination.Item
        key={"prev"}
        onClick={() => {
          startPage > 1 && setStartPage(startPage - 1);
        }}
      >
        <BsChevronLeft />
      </Pagination.Item>
    );

    startPage > 1 &&
      paginationItems.push(
        <Pagination.Item key={"...prev"}>...</Pagination.Item>
      );

    for (let index = 0; index < PAGINAION_COUNT; ++index) {
      if (index + startPage <= totalPage) {
        paginationItems.push(
          <Pagination.Item
            key={index + startPage - 1}
            active={index + startPage - 1 === currentPage}
            onClick={() => dispatch(pageChanged(index + startPage - 1))}
          >
            {index + startPage}
          </Pagination.Item>
        );
      }
    }

    startPage + PAGINAION_COUNT - 1 < totalPage &&
      paginationItems.push(
        <Pagination.Item key={"...next"}>...</Pagination.Item>
      );

    paginationItems.push(
      <Pagination.Item
        key={"next"}
        onClick={() => {
          startPage < totalPage - PAGINAION_COUNT + 1 &&
            setStartPage(startPage + 1);
        }}
      >
        <BsChevronRight />
      </Pagination.Item>
    );
  }

  return (
    <main className="my-5 pt-5">
      <Container>
        <Row>
          <Col lg={4}>
            <Filter />
          </Col>
          <Col lg={8}>
            {loading ? (
              <div className="mt-5 text-center">
                <Spinner className="mt-5" />
              </div>
            ) : (
              <>
                <Row>
                  {games.map((game) => (
                    <Col md={6} key={game.id} className={`mb-4`}>
                      <Link
                        to={"game/" + game.id}
                        className={`d-flex flex-column ${styles["game-box"]}`}
                      >
                        <div className="img-box">
                          <img
                            src={game.thumbnail}
                            className={`img-fluid`}
                          ></img>
                        </div>
                        <div
                          className={`flex-grow-1 d-flex flex-column ${styles["info-box"]}`}
                        >
                          <div className={`${styles["game-title"]}`}>
                            {game.title}
                          </div>
                          <div className={`${styles["game-desc"]} flex-grow-1`}>
                            {game.short_description}
                          </div>
                          <div
                            className={`d-flex justify-content-between ${styles["game-platform"]}`}
                          >
                            <Badge bg="primary" className={`p-2`}>
                              {game.platform}
                            </Badge>
                            <Badge bg="secondary" className={`p-2`}>
                              {game.genre}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
                </Row>

                {totalPage > 1 ? (
                  <Row className="mt-4">
                    <Stack>
                      <Pagination className="mx-auto mb-0">
                        {paginationItems}
                      </Pagination>
                    </Stack>
                  </Row>
                ) : (
                  ""
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
