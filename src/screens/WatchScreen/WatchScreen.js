import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { Col, Row } from "react-bootstrap";
import {
  getVideoById,
  getRelatedVideos,
} from "../../redux/actions/video.action";
import VideoMetadata from "../../components/videoMetadata/VideoMetadata";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import "./_watchScreen.scss";

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen_player">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="MY VIDEO"
            allowFullScreen
            src={`https://www.youtube.com/embed/${id}?controls=1`}
          ></iframe>
        </div>

        {!loading ? (
          <VideoMetadata video={video} videoId={id} />
        ) : (
          <h5>Loading...</h5>
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>

      <Col lg={4}>
        {!loading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
