import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_FEEDBACK_REQUESTED,
  UPDATE_FEEDBACK_REQUESTED,
  DELETE_FEEDBACK_REQUESTED,
  GET_FEEDBACK_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from '../../../api/feedback';

import type { CommunityPost } from '../../../types';

function* getFeedbackRequested({
  payload: { entityId }
}: ReturnType<typeof actions.getFeedbackRequested>) {
  try {
    const posts: CommunityPost[] = yield call(getFeedback, entityId);
    yield put(actions.getFeedbackSucceeded(posts));
  } catch (e: any) {
    yield put(actions.getFeedbackFailed(e.message));
  }
}

function* createFeedbackRequested({
  payload: { entityId, post }
}: ReturnType<typeof actions.createFeedbackRequested>) {
  try {
    yield call(createFeedback, entityId, post);
    yield put(actions.createFeedbackSucceeded());
  } catch (e: any) {
    yield put(actions.createFeedbackFailed(e.message));
  }
}

function* updateFeedbackRequested({
  payload: { post }
}: ReturnType<typeof actions.updateFeedbackRequested>) {
  try {
    yield call(updateFeedback, post);
    yield put(actions.updateFeedbackSucceeded());
  } catch (e: any) {
    yield put(actions.updateFeedbackFailed(e.message));
  }
}

function* deleteFeedbackRequested({
  payload: { postId }
}: ReturnType<typeof actions.deleteFeedbackRequested>) {
  try {
    yield call(deleteFeedback, postId);
    yield put(actions.deleteFeedbackSucceeded());
  } catch (e: any) {
    yield put(actions.deleteFeedbackFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(CREATE_FEEDBACK_REQUESTED, createFeedbackRequested),
    takeLatest(UPDATE_FEEDBACK_REQUESTED, updateFeedbackRequested),
    takeLatest(DELETE_FEEDBACK_REQUESTED, deleteFeedbackRequested),
    takeLatest(GET_FEEDBACK_REQUESTED, getFeedbackRequested)
  ]);
}
