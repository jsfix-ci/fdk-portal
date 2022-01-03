import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_FEEDBACK_REQUESTED,
  GET_FEEDBACK_SUCCEEDED,
  GET_FEEDBACK_FAILED,
  RESET_FEEDBACK
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  topics: [],
  posts: []
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_FEEDBACK_REQUESTED:
      return state.set('feedback', fromJS([]));
    case GET_FEEDBACK_SUCCEEDED:
      return state.set('feedback', fromJS(action.payload.posts));
    case GET_FEEDBACK_FAILED:
      return state.set('feedback', fromJS([]));
    case RESET_FEEDBACK:
      return state.set('feedback', fromJS([]));
    default:
      return state;
  }
}
