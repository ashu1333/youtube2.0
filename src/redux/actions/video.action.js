import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_FAILED,
  SELECTED_VIDEO_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  CHANNEL_VIDEOS_FAIL,
} from "../actionType";

import request from "../../api";

export const getPopularvideo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (err) {
    console.log("ERROR IN VIDEO LOAD");

    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: err.message,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextpageToken,
        q: keyword,
        type: "video",
      },
    });
    console.log(data);

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (err) {
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: err.message,
    });
  }
};

export const getVideoById = (videoId) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: videoId,
      },
    });

    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    dispatch({ type: SELECTED_VIDEO_FAILED, payload: error.message });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({ type: RELATED_VIDEO_REQUEST });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 20,
        type: "video",
      },
    });

    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });

    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",

        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.response.data,
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    });

    // 1. get upload playlist id
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
    // 2. get the videos using the id
    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.response.data,
    });
  }
};
