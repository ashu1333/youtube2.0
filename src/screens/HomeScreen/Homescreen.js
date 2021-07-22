import React, { useEffect } from "react";
import Video from "../../components/video/Video";
import Category from "../../components/category/Category";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularvideo,
  getVideosByCategory,
} from "../../redux/actions/video.action";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeletons from "../../components/skeletons/Skeletons";

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getPopularvideo());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  let length = videos?.length;

  const fetchData = () => {
    if (activeCategory == "All") {
      dispatch(getPopularvideo());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <Category />
      <InfiniteScroll
        dataLength={20}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {!loading
          ? videos?.map((video) => (
              <Col lg={3} md={4}>
                <Video video={video} key={video.id} />
              </Col>
            ))
          : [...Array(20)].map((video) => (
              <Col lg={3} md={4}>
                <Skeletons />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
}

export default HomeScreen;
