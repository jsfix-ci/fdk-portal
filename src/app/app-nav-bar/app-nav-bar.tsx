import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import PortalDropdownMenu from '../../components/dropdown-menu';

import env from '../../env';

import localization from '../../lib/localization';
import {
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_ABOUT_NAP,
  PATHNAME_HOME_NAP,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLISHING,
  PATHNAME_SPARQL,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_GUIDANCE,
  PATHNAME_NEWS_ARCHIVE
} from '../../constants/constants';

import { themeFDK, themeNAP } from '../theme';
import { getConfig } from '../../config';
import SC from './styled';

const isTransportportal = getConfig().themeNap;

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  onChangeLanguage: (language: string) => void;
}

const transportItems = () => (
  <>
    <li key={localization.menu.aboutNap}>
      <SC.Link href={PATHNAME_ABOUT_NAP}>{localization.menu.aboutNap}</SC.Link>
    </li>
    <li key={localization.menu.aboutRegistration}>
      <SC.Link as={RouteLink} to={PATHNAME_ABOUT_REGISTRATION}>
        {localization.menu.aboutRegistration}
      </SC.Link>
    </li>
    <li key={localization.menu.organizations}>
      <SC.Link as={RouteLink} to={PATHNAME_ORGANIZATIONS}>
        {localization.menu.organizations}
      </SC.Link>
    </li>
    <li key={localization.menu.tools.reports}>
      <SC.Link as={RouteLink} to={PATHNAME_REPORTS}>
        {localization.menu.tools.reports}
      </SC.Link>
    </li>
    <li key={localization.menu.community}>
      <SC.Link href={FDK_COMMUNITY_BASE_URI} external>
        {localization.menu.community}
      </SC.Link>
    </li>
  </>
);

const fdkItems = () => (
  <>
    <li key={localization.menu.about}>
      <PortalDropdownMenu
        desktopView
        openOnHover
        caret={false}
        mobileView={false}
        title={localization.menu.about}
      >
        <li key={localization.menu.about}>
          <SC.Link as={RouteLink} to={PATHNAME_ABOUT}>
            {localization.menu.about}
          </SC.Link>
        </li>
        <li key={localization.menu.aboutCatalogs}>
          <SC.Link as={RouteLink} to={PATHNAME_ABOUT_DATASETS}>
            {localization.menu.aboutCatalogs}
          </SC.Link>
        </li>
        <li key={localization.menu.guidance}>
          <SC.Link as={RouteLink} to={PATHNAME_GUIDANCE}>
            {localization.menu.guidance}
          </SC.Link>
        </li>
        <li key={localization.menu.newsArchive}>
          <SC.Link as={RouteLink} to={PATHNAME_NEWS_ARCHIVE}>
            {localization.menu.newsArchive}
          </SC.Link>
        </li>
      </PortalDropdownMenu>
    </li>
    <li key={localization.menu.organizations}>
      <SC.Link as={RouteLink} to={PATHNAME_ORGANIZATIONS}>
        {localization.menu.organizations}
      </SC.Link>
    </li>
    <li key={localization.menu.tools.tools} className='hideOnMobileView'>
      <PortalDropdownMenu
        desktopView
        openOnHover
        caret={false}
        mobileView={false}
        title={localization.menu.tools.tools}
      >
        <li key={localization.menu.tools.reports}>
          <SC.Link as={RouteLink} to={PATHNAME_REPORTS}>
            {localization.menu.tools.reports}
          </SC.Link>
        </li>
        <li key={localization.menu.tools.sparql}>
          <SC.Link href={PATHNAME_SPARQL}>
            {localization.menu.tools.sparql}
          </SC.Link>
        </li>
      </PortalDropdownMenu>
    </li>
    <li key={localization.menu.community}>
      <SC.Link href={FDK_COMMUNITY_BASE_URI} external>
        {localization.menu.community}
      </SC.Link>
    </li>
    <li key={localization.menu.publishing}>
      <SC.Link href={PATHNAME_PUBLISHING} external>
        {localization.menu.publishing}
      </SC.Link>
    </li>
  </>
);

const languageButtons = ({
  onChangeLanguage
}: {
  onChangeLanguage: (language: string) => void;
}) => (
  <>
    <li>
      <button type='button' onClick={() => onChangeLanguage('nb')}>
        {localization.lang['norwegian-nb']}
      </button>
    </li>
    <li>
      <button type='button' onClick={() => onChangeLanguage('nn')}>
        {localization.lang['norwegian-nn']}
      </button>
    </li>
    <li>
      <button type='button' onClick={() => onChangeLanguage('en')}>
        {localization.lang['english-en']}
      </button>
    </li>
  </>
);
const Logo = getConfig().useDemoLogo ? <SC.DemoLogo /> : <SC.Logo />;

export const AppNavBar: FC<Props> = ({ onChangeLanguage }) => (
  <ThemeProvider theme={isTransportportal ? themeNAP : themeFDK}>
    <SC.Header>
      <SC.Container>
        <SC.Link
          title={
            isTransportportal ? localization.linkToNap : localization.linkToFdk
          }
          href={isTransportportal ? PATHNAME_HOME_NAP : '/'}
        >
          {isTransportportal ? <SC.NapLogo /> : Logo}
        </SC.Link>
        <SC.ContentWrapper>
          <SC.NavigationLinks>
            {isTransportportal ? transportItems() : fdkItems()}
          </SC.NavigationLinks>

          <PortalDropdownMenu
            desktopView
            mobileView={false}
            caret
            title={localization.lang.chosenLanguage}
          >
            {languageButtons({ onChangeLanguage })}
          </PortalDropdownMenu>
        </SC.ContentWrapper>
        <PortalDropdownMenu
          desktopView={false}
          mobileView
          caret
          title={localization.app.menu}
        >
          {isTransportportal ? transportItems() : fdkItems()}
          {languageButtons({ onChangeLanguage })}
        </PortalDropdownMenu>
      </SC.Container>
    </SC.Header>
  </ThemeProvider>
);
