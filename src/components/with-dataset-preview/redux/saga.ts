import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASET_PREVIEW_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { DatasetPreview } from '../../../types';

import { getDatasetPreview, setCsrf } from '../../../api/datasetPreview';

function* getDatasetPreviewRequested({
  payload: { url, rows }
}: ReturnType<typeof actions.getDatasetPreviewRequested>) {
  try {
    yield call(setCsrf);

    const datasetPreview: DatasetPreview = yield call(
      getDatasetPreview,
      url,
      rows
    );

    if (datasetPreview) {
      yield put(actions.getDatasetPreviewSucceeded(datasetPreview));
    } else {
      yield put(
        actions.getDatasetPreviewFailed(
          new Error(
            'An error occurred during an attempt to contact Dataset Preview API'
          )
        )
      );
    }
  } catch (error: any) {
    yield put(actions.getDatasetPreviewFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASET_PREVIEW_REQUESTED, getDatasetPreviewRequested)
  ]);
}
