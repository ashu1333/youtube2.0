import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth.reducer";
import { channelDetailReducer } from "./reducers/channel.reducer";
import {
  selectedVideoReducer,
  homeVideosReducer,
  relatedVideoReducer,
  searchedVideosReducer,
  subscriptionsChannelReducer,
  channelVideosReducer,
} from "./reducers/video.reducer";
import { commentListReducer } from "./reducers/comments.reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
  commentList: commentListReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
