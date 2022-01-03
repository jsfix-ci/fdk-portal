import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { CommunityPost } from '../../types';

export interface Props {
  posts: CommunityPost[];
  feedbackActions: typeof actions;
}

const withFeedback = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    posts: state.CommunityReducer.get('posts').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    feedbackActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withFeedback;
