import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '@fellesdatakatalog/expansion-panel';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import ExternalLink from '../../../link-external';

import Summary from '../summary';
import Detail from '../detail';
import Preview from '../preview';

import DownloadIcon from '../../../../images/icon-download-sm.svg';
import EyeIcon from '../../../../images/icon-eye.svg';

import SC from './styled';

import testIds from './test-ids';

import { AccessService, Distribution, License } from '../../../../types';

interface ExternalProps {
  accessServices?: AccessService[];
  distribution: Partial<Distribution>;
}

interface Props extends ExternalProps {}

const DatasetDistribution: FC<Props> = ({
  distribution: {
    title,
    description,
    license: licenses = [],
    fdkFormat: formats = [],
    downloadURL: [downloadURL] = [],
    accessURL: [accessURL] = [],
    conformsTo: [
      { uri: conformsToUri = null, prefLabel: conformsToPrefLabel = null } = {}
    ] = [],
    page: [{ uri: pageUri = null } = {}] = []
  },
  accessServices = []
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleShowPreview = (show: boolean) => {
    setShowPreview(show);
  };

  return (
    <SC.DatasetDistribution data-testid={testIds.root}>
      <ExpansionPanelHead>
        <Summary
          title={
            translate(title) ||
            translate(description) ||
            accessURL?.toLowerCase() ||
            translate(accessServices[0]?.description)
          }
          formats={formats}
          data-testid={testIds.summary}
        />
      </ExpansionPanelHead>
      <ExpansionPanelBody>
        {formats.length > 0 && (
          <Detail
            property={translations.dataset.distribution.format}
            value={formats
              .map(format => format.name || format.code)
              .sort()
              .join(', ')}
            data-testid={testIds.detail}
          />
        )}
        {accessURL && (
          <Detail
            property={translations.dataset.distribution.accessUrl}
            value={
              <ExternalLink
                uri={accessURL}
                prefLabel={accessURL.toLowerCase()}
                openInNewTab
              />
            }
            data-testid={testIds.detail}
          />
        )}
        {licenses?.map(
          ({ uri: licenseUri, prefLabel: licensePrefLabel }: License) => (
            <Detail
              key={licenseUri}
              property={translations.dataset.distribution.licenseLinkDefault}
              value={
                <ExternalLink
                  uri={licenseUri}
                  prefLabel={translate(licensePrefLabel) || licenseUri}
                  openInNewTab
                />
              }
              data-testid={testIds.detail}
            />
          )
        )}
        <Detail
          property={translations.dataset.distribution.description}
          value={
            translate(description) ||
            translations.dataset.distribution.noDescription
          }
          data-testid={testIds.detail}
        />
        {conformsToUri && (
          <Detail
            property={translations.dataset.distribution.conformsTo}
            value={
              <ExternalLink
                uri={conformsToUri}
                prefLabel={translate(conformsToPrefLabel) || conformsToUri}
                openInNewTab
              />
            }
            data-testid={testIds.detail}
          />
        )}
        {accessServices?.map(
          ({
            description: accessServiceDescription,
            uri: accessServiceUri
          }) => (
            <Detail
              key={accessServiceUri}
              property={translations.dataset.distribution.dataService}
              value={
                <Link to={accessServiceUri}>
                  {translate(accessServiceDescription)}
                </Link>
              }
              data-testid={testIds.detail}
            />
          )
        )}
        {pageUri && (
          <SC.Section>
            <ExternalLink
              uri={pageUri}
              prefLabel={translations.dataset.distribution.page}
              openInNewTab
              data-testid={testIds.moreInfo}
            />
          </SC.Section>
        )}
        {downloadURL && (
          <SC.Section>
            <SC.DownloadLink href={downloadURL} icon={<DownloadIcon />}>
              {translations.dataset.distribution.download}
            </SC.DownloadLink>
            <SC.PreviewLink
              onClick={() => handleShowPreview(true)}
              icon={<EyeIcon />}
            >
              {translations.dataset.distribution.preview}
            </SC.PreviewLink>
          </SC.Section>
        )}
        {downloadURL && showPreview && (
          <Preview
            downloadURL={downloadURL}
            rowCount={100}
            isOpen={showPreview}
            onClose={() => handleShowPreview(false)}
          />
        )}
      </ExpansionPanelBody>
    </SC.DatasetDistribution>
  );
};

export default compose<FC<ExternalProps>>(memo)(DatasetDistribution);
