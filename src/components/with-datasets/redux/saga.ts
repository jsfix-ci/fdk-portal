import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASETS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractDatasets,
  paramsToSearchBody,
  searchDatasets
} from '../../../api/search-fulltext-api/datasets';

import type { Dataset } from '../../../types';

function* getDatasetsRequested({
  payload: { params: { uris, size, orgPath, subject } = {} }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  try {
    const data = yield call(
      searchDatasets,
      paramsToSearchBody({
        uris: uris?.split(',') ?? [],
        size,
        orgPath,
        subject
      })
    );

    if (data) {
      yield put(
        actions.getDatasetsSucceeded(extractDatasets(data) as Dataset[])
      );
    } else {
      yield put(actions.getDatasetsFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested)]);
}
