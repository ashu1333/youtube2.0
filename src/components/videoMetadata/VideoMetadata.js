import React, { useEffect, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import { useSelector, useDispatch } from "react-redux";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import {
  getChannelDetails,
  checkSubscriptionStatus,
} from "../../redux/actions/channel.action";
import ShowMoreText from "react-show-more-text";
import "./_metadata.scss";
const VideoMetadata = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { commentCount, dislikeCount, likeCount, viewCount } = statistics;
  const dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [channelId, dispatch]);

  return (
    <div className="videoMetadata py-2">
      <div className="videoMetadata__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} •{moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} />
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>

      <div className="videoMetadata__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt="channel icon"
            className="rounded-circle"
            style={{}}
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {" "}
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button
          className={`btn border-0 p-2 m-2 ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="videoMetadata__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetadata;
