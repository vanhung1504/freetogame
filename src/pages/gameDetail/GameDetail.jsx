import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { GiProcessor } from "react-icons/gi";
import { GrMemory, GrStorage, GrSystem } from "react-icons/gr";
import { MdGraphicEq } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { A11y, Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  gameDetailSelector,
  loadGameDetail,
} from "../../store/features/gameDetail/gameDetail.slice";
import { gamesSelector } from "../../store/features/games/games.slice";

const GameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGameDetail(id));
  }, [id]);

  const { data: game, loading } = useSelector(gameDetailSelector);

  const { data: games } = useSelector(gamesSelector);
  const relatedGames = games.filter(
    (item) => item.genre === game.genre && item.id !== game.id
  );

  return (
    <main className="my-5 pt-5" style={{ minHeight: "100vh" }}>
      <Container>
        <Row>
          {loading ? (
            <div className="mt-5 text-center">
              <Spinner className="mt-5" />
            </div>
          ) : (
            <Container>
              <Row>
                <Col md={8} className="mx-auto">
                  <Swiper
                    modules={[Autoplay, Navigation, Pagination, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    // navigation
                    pagination={{ clickable: true }}
                  >
                    {game.screenshots.map((item) => (
                      <SwiperSlide key={item.image}>
                        <img src={item.image} className="img-fluid" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
              </Row>

              <Row>
                <Col md={8} className="mx-auto">
                  <h1 className="my-3 text-primary text-center">
                    {game.title}
                  </h1>
                  <p className="my-3" style={{ textAlign: "justify" }}>
                    {game.description}
                  </p>
                  <div className="my-4">
                    <hr />
                  </div>
                  <p className="fs-4 text-primary mb-2">Thông tin bổ sung</p>
                  <div>
                    <Row>
                      <Col xs={4}>
                        <div>
                          <p className="text-secondary mb-1">Developer</p>
                          <p className="fs-6 text-secondary fw-bold">
                            {game.developer}
                          </p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <p className="text-secondary mb-1">Publisher</p>
                          <p className="fs-6 text-secondary fw-bold">
                            {game.publisher}
                          </p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <p className="text-secondary mb-1">Platform</p>
                          <p className="fs-6 text-secondary fw-bold">
                            {game.platform}
                          </p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <p className="text-secondary mb-1">Genre</p>
                          <p className="fs-6 text-secondary fw-bold">
                            {game.genre}
                          </p>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <p className="text-secondary mb-1">Release Date</p>
                          <p className="fs-6 text-secondary fw-bold">
                            {game["release_date"]}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {Boolean(game["minimum_system_requirements"]) ? (
                    <>
                      <div className="my-4">
                        <hr />
                      </div>
                      <p className="fs-4 text-primary mb-2">
                        Yêu cầu hệ thống tối thiểu
                      </p>
                      <div>
                        <Row>
                          <Col xs={6}>
                            <div>
                              <p className="text-secondary mb-1">
                                <span className="me-2">
                                  <GrSystem />
                                </span>
                                OS
                              </p>
                              <p className="fs-6 text-secondary fw-bold">
                                {game["minimum_system_requirements"].os}
                              </p>
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div>
                              <p className="text-secondary mb-1">
                                <span className="me-2">
                                  <GiProcessor />
                                </span>
                                Processor
                              </p>
                              <p className="fs-6 text-secondary fw-bold">
                                {game["minimum_system_requirements"].processor}
                              </p>
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div>
                              <p className="text-secondary mb-1">
                                <span className="me-2">
                                  <GrMemory />
                                </span>
                                Memory
                              </p>
                              <p className="fs-6 text-secondary fw-bold">
                                {game["minimum_system_requirements"].memory}
                              </p>
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div>
                              <p className="text-secondary mb-1">
                                <span className="me-2">
                                  <MdGraphicEq />
                                </span>
                                Graphics
                              </p>
                              <p className="fs-6 text-secondary fw-bold">
                                {game["minimum_system_requirements"].graphics}
                              </p>
                            </div>
                          </Col>

                          <Col xs={6}>
                            <div>
                              <p className="text-secondary mb-1">
                                <span className="me-2">
                                  <GrStorage />
                                </span>
                                Storage
                              </p>
                              <p className="fs-6 text-secondary fw-bold">
                                {game["minimum_system_requirements"].storage}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* Related games */}
                  <div className="my-4">
                    <hr />
                  </div>
                  <p className="fs-4 text-primary mb-3">Các game cùng chủ đề</p>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={3}
                    loop={false}
                    navigation
                  >
                    {relatedGames.map((game) => (
                      <SwiperSlide key={game.id}>
                        <Link to={"/game/" + game.id}>
                          <img src={game.thumbnail} className="img-fluid" />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
              </Row>
            </Container>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default GameDetail;
