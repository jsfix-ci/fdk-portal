import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { LabelStatus } from '../label-status/label-status.component';
import { PublisherLabel } from '../publisher-label/publisher-label.component';
import { getPublisherByOrgNr } from '../../redux/modules/publishers';
import { getLosStructure } from '../../redux/modules/referenceData';
import { getTranslateText } from '../../lib/translateText';
import localization from '../../lib/localization';
import './search-hit-header.scss';
import {
  dateStringToDate,
  isDateBeforeToday,
  isDateAfterToday,
  formatDate
} from '../../lib/date-utils';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';
import { LabelNational } from '../label-national/label-national.component';
import { AlertMessage } from '../alert-message/alert-message.component';
import { LinkExternal } from '../link-external/link-external.component';
import { getConfig } from '../../config';

interface Props {
  tag: any;
  title?: string | Record<string, any>;
  titleLink?: string;
  publisherLabel?: string;
  publisher?: Record<string, any>;
  publisherTag?: string;
  publisherItems?: Record<string, any>;
  theme?: any[];
  nationalComponent?: boolean;
  statusCode?: 'STABLE' | 'DEPRECATED' | 'EXPERIMENTAL' | 'REMOVED';
  referenceData?: Record<string, any>;
  darkThemeBackground?: boolean;
  externalLink?: boolean;
  validFromIncluding?: string;
  validToIncluding?: string;
  catalog?: any;
}

const renderPublisher = (
  publisherLabel: any,
  publisher: any,
  publisherItems: any,
  catalog: any
) => {
  if (!publisher) {
    return null;
  }
  const publisherItem =
    getPublisherByOrgNr(publisherItems, publisher.id) || publisher;
  return (
    <PublisherLabel
      label={publisherLabel}
      publisherItem={publisherItem}
      catalog={catalog}
    />
  );
};

const renderThemes = (themes: any, losItems: any, darkThemeBackground: any) => {
  const themeClass = cx('align-self-center mr-2 mb-2', {
    'fdk-label': !darkThemeBackground,
    'fdk-label-details': darkThemeBackground
  });

  const getContextRootLink = () => {
    const informationmodelsRoot = '/informationmodels';
    if (location.pathname.includes(informationmodelsRoot)) {
      return informationmodelsRoot;
    }
    return '/';
  };

  return themes
    .map(({ id, title }: any) => {
      const {
        uri,
        prefLabel,
        losPaths: [theme = ''] = []
      }: any = Object.values(losItems).find(
        ({ uri: losUri }: any) => losUri === id
      ) || {};
      return (
        uri &&
        theme && (
          <Link
            key={uri}
            to={`${getContextRootLink()}${patchSearchQuery('losTheme', theme)}`}
            className={themeClass}
          >
            <span className='uu-invisible' aria-hidden='false'>
              Datasettets tema.
            </span>
            {getTranslateText(prefLabel || title)}
          </Link>
        )
      );
    })
    .filter(Boolean);
};

const renderTitle = (
  Tag: any,
  title: any,
  titleLink: any,
  externalLink: any,
  isExpired: any,
  isWillBeValid: any
) => {
  const titleTag = (TitleTag: any, tagTitle: any) => (
    <TitleTag
      className='mr-3 search-hit-header-title'
      name={getTranslateText(tagTitle)}
    >
      {getTranslateText(tagTitle)}
      {isExpired && (
        <span className='fdk-expired'>
          &nbsp;({localization.validity.expired})
        </span>
      )}
      {!isExpired && isWillBeValid && (
        <span className='fdk-will-be-valid'>
          &nbsp;({localization.validity.willBeValid})
        </span>
      )}
    </TitleTag>
  );
  if (titleLink) {
    if (externalLink) {
      return (
        <LinkExternal
          uri={getConfig().searchHost.host.concat(titleLink)}
          prefLabel={title}
          openInNewTab={false}
        />
      );
    }
    return (
      <Link
        className='search-hit__title-link'
        title={`${localization.apiLabel}: ${title}`}
        to={titleLink}
      >
        {titleTag(Tag, title)}
      </Link>
    );
  }
  return titleTag(Tag, title);
};

export const SearchHitHeader: FC<Props> = ({
  tag: Tag = 'h1',
  title,
  titleLink,
  catalog,
  publisherLabel,
  publisher,
  publisherTag = 'span',
  publisherItems,
  theme: themes = [],
  nationalComponent,
  statusCode,
  referenceData,
  darkThemeBackground,
  externalLink,
  validFromIncluding,
  validToIncluding
}) => {
  const validFromIncludingDate = dateStringToDate(validFromIncluding);
  const validToIncludingDate = dateStringToDate(validToIncluding);

  const isExpired = isDateBeforeToday(validToIncludingDate);
  const isWillBeValid = isDateAfterToday(validFromIncludingDate);

  const losItems = getLosStructure(referenceData);
  return (
    <>
      {title && (
        <div className='mb-2 d-flex flex-wrap align-items-center'>
          {renderTitle(
            Tag,
            title,
            titleLink,
            externalLink,
            isExpired,
            isWillBeValid
          )}
          {statusCode && (
            <LabelStatus
              statusCode={statusCode}
              referenceData={referenceData}
            />
          )}
        </div>
      )}

      <div className='mb-4 d-flex flex-wrap align-items-baseline'>
        {publisherItems &&
          renderPublisher(publisherLabel, publisher, publisherItems, catalog)}

        {!publisherItems && publisher && (
          <PublisherLabel
            tag={publisherTag}
            label={publisherLabel}
            publisherItem={publisher}
            catalog={catalog}
          />
        )}
      </div>

      {(isExpired || isWillBeValid) && (
        <AlertMessage type={isExpired ? 'danger' : 'warning'} classNames='mb-4'>
          {isExpired
            ? localization.validity.expiredInfo
            : localization.validity.willBeValidInfo}
          &nbsp;
          {formatDate(
            isExpired ? validToIncludingDate : validFromIncludingDate
          )}
        </AlertMessage>
      )}

      {(nationalComponent || !!themes.length) && (
        <div className='mb-4 d-flex flex-wrap align-items-baseline align-items-center'>
          {nationalComponent && <LabelNational />}
          {renderThemes(themes, losItems, darkThemeBackground)}
        </div>
      )}
    </>
  );
};
