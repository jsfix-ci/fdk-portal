import axios from 'axios';
import { getConfig } from '../config';

export const feedbackUrlBase = () => `${getConfig().feedbackApi.host}/feedback`;

export const getFeedback = entityId =>
  axios
    .get(`${feedbackUrlBase()}/${entityId}`, getConfig().feedbackApi.config)
    .then(r => r.data)
    .catch(() => null);

export const createFeedback = (entityId, post) =>
  axios
    .post(
      `${feedbackUrlBase()}/`,
      {
        entityId,
        post
      },
      getConfig().feedbackApi.config
    )
    .catch(() => null);

export const updateFeedback = post =>
  axios
    .post(
      `${feedbackUrlBase()}/${post.pid}`,
      post,
      getConfig().feedbackApi.config
    )
    .catch(() => null);

export const deleteFeedback = postId =>
  axios
    .delete(`${feedbackUrlBase()}/${postId}`, getConfig().feedbackApi.config)
    .catch(() => null);
