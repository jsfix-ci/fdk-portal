import React, { FC } from 'react';
import capitalize from 'lodash/capitalize';

import { getTranslateText } from '../../lib/translateText';
import localization from '../../lib/localization';

interface Props {
  label?: string;
  tag?: any;
  publisherItem?: Record<string, any>;
  catalog: any;
}

export const PublisherLabel: FC<Props> = ({
  label,
  tag: Tag = 'span',
  publisherItem,
  catalog
}) => {
  const publisherPrefLabel =
    getTranslateText(publisherItem?.prefLabel) ||
    capitalize(publisherItem?.name ?? '');

  const catalogTitle = getTranslateText(catalog?.title);

  return publisherItem ? (
    <span className='mr-3'>
      {label}&nbsp;
      <Tag>
        {publisherPrefLabel}
        {catalogTitle &&
          ` (${localization.dataset.registeredIn} ${catalogTitle}})`}
      </Tag>
    </span>
  ) : null;
};
