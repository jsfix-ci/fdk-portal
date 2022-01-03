import {
  CREATE_FEEDBACK_REQUESTED,
  CREATE_FEEDBACK_SUCCEEDED,
  CREATE_FEEDBACK_FAILED,
  UPDATE_FEEDBACK_REQUESTED,
  UPDATE_FEEDBACK_SUCCEEDED,
  UPDATE_FEEDBACK_FAILED,
  DELETE_FEEDBACK_REQUESTED,
  DELETE_FEEDBACK_SUCCEEDED,
  DELETE_FEEDBACK_FAILED,
  GET_FEEDBACK_REQUESTED,
  GET_FEEDBACK_SUCCEEDED,
  GET_FEEDBACK_FAILED,
  RESET_FEEDBACK
} from './action-types';

import type { CommunityPost } from '../../../types';

export function createFeedbackRequested(entityId: string, post: CommunityPost) {
  return {
    type: CREATE_FEEDBACK_REQUESTED,
    payload: {
      entityId,
      post
    }
  };
}

export function createFeedbackSucceeded() {
  return {
    type: CREATE_FEEDBACK_SUCCEEDED,
    payload: {}
  };
}

export function createFeedbackFailed(message: string) {
  return {
    type: CREATE_FEEDBACK_FAILED,
    payload: {
      message
    }
  };
}

export function updateFeedbackRequested(post: CommunityPost) {
  return {
    type: UPDATE_FEEDBACK_REQUESTED,
    payload: {
      post
    }
  };
}

export function updateFeedbackSucceeded() {
  return {
    type: UPDATE_FEEDBACK_SUCCEEDED,
    payload: {}
  };
}

export function updateFeedbackFailed(message: string) {
  return {
    type: UPDATE_FEEDBACK_FAILED,
    payload: {
      message
    }
  };
}

export function deleteFeedbackRequested(postId: number) {
  return {
    type: DELETE_FEEDBACK_REQUESTED,
    payload: {
      postId
    }
  };
}

export function deleteFeedbackSucceeded() {
  return {
    type: DELETE_FEEDBACK_SUCCEEDED,
    payload: {}
  };
}

export function deleteFeedbackFailed(message: string) {
  return {
    type: DELETE_FEEDBACK_FAILED,
    payload: {
      message
    }
  };
}

export function getFeedbackRequested(entityId: string) {
  return {
    type: GET_FEEDBACK_REQUESTED,
    payload: {
      entityId
    }
  };
}

export function getFeedbackSucceeded(posts: CommunityPost[]) {
  return {
    type: GET_FEEDBACK_SUCCEEDED,
    payload: {
      posts
    }
  };
}

export function getFeedbackFailed(message: string) {
  return {
    type: GET_FEEDBACK_FAILED,
    payload: {
      message
    }
  };
}

export function resetFeedback() {
  return {
    type: RESET_FEEDBACK
  };
}
