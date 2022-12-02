import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { GiFlatPlatform, GiPriceTag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  filterChanged,
  gamesSelector,
} from "../../store/features/games/games.slice";

function Filter() {
  const platformRef = useRef();
  const categoriesRef = useRef();

  const { filter } = useSelector(gamesSelector);
  const { platform: platformState, categories: categoriesState } = filter;

  const dispatch = useDispatch();

  const platform = ["PC (Windows)", "Web Browser"];
  const categories = [
    "mmorpg",
    "shooter",
    "strategy",
    "moba",
    "racing",
    "sports",
    "social",
    "sandbox",
    "open-world",
    "survival",
    "pvp",
    "pve",
    "pixel",
    "voxel",
    "zombie",
    "turn-based",
    "first-person",
    "third-Person",
    "top-down",
    "tank",
    "space",
    "sailing",
    "side-scroller",
    "superhero",
    "permadeath",
    "card",
    "battle-royale",
    "mmo",
    "mmofps",
    "mmotps",
    "3d",
    "2d",
    "anime",
    "fantasy",
    "sci-fi",
    "fighting",
    "action-rpg",
    "action",
    "military",
    "martial-arts",
    "flight",
    "low-spec",
    "tower-defense",
    "horror",
    "mmorts",
  ];

  return (
    <Container>
      <Row>
        <div className="d-flex align-items-center">
          <span className="fs-5 fw-bold">BỘ LỌC TÌM KIẾM</span>
        </div>
      </Row>

      <Row>
        <div className="d-flex align-items-center">
          <span className="fs-5 fw-bold text-success mb-1">
            <GiFlatPlatform />
          </span>
          <span className="ms-2 fs-6 fw-bold text-success">Platform</span>
        </div>
      </Row>

      <Row>
        <Form
          onChange={() => {
            const filter = [];
            const chkbArr = Array.from(platformRef.current.elements.platform);
            chkbArr.forEach((checkbox) => {
              if (checkbox.checked) filter.push(checkbox.value);
            });

            dispatch(
              filterChanged({
                platform: filter,
              })
            );
          }}
          ref={platformRef}
        >
          <Row>
            {platform.sort().map((item) => (
              <Col xs={6} key={item}>
                <Form.Check
                  type="checkbox"
                  name="platform"
                  value={item}
                  label={item}
                  checked={platformState.includes(item)}
                  onChange={() => {}}
                />
              </Col>
            ))}
          </Row>
        </Form>
      </Row>

      <Row className="mt-2">
        <div className="d-flex align-items-center">
          <span className="fs-5 fw-bold text-success mb-1">
            <GiPriceTag />
          </span>
          <span className="ms-2 fs-6 fw-bold text-success">Tags</span>
        </div>
      </Row>

      <Row>
        <Form
          onChange={() => {
            const filter = [];
            const chkbArr = Array.from(
              categoriesRef.current.elements.categories
            );
            chkbArr.forEach((checkbox) => {
              if (checkbox.checked) filter.push(checkbox.value);
            });

            dispatch(
              filterChanged({
                categories: filter,
              })
            );
          }}
          ref={categoriesRef}
        >
          <Row>
            {categories.sort().map((item) => (
              <Col xs={6} key={item}>
                <Form.Check
                  type="checkbox"
                  name="categories"
                  value={item}
                  label={item}
                  checked={categoriesState.includes(item)}
                  onChange={() => {}}
                />
              </Col>
            ))}
          </Row>
        </Form>
      </Row>
    </Container>
  );
}

export default Filter;
