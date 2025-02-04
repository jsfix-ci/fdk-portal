import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';

import LogoSVG from '../../images/fdk-logo.svg';
import DemoLogoSVG from '../../images/fdk-logo-demo.svg';
import NapLogoSVG from '../../images/logo-transport.svg';
import { getConfig } from '../../config';

const isTransportportal = getConfig().themeNap;

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 80px;
  position: relative;
  z-index: 10;

  ${({ theme: extendedTheme }) =>
    isTransportportal
      ? css`
          background-color: ${extendedTheme.extendedColors.neutralDark};
          color: ${theme.colour(Colour.NEUTRAL, 'N0')};
        `
      : css`
          background-color: ${extendedTheme.extendedColors.headerBg};
        `}
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow-wrap: break-word;
  padding: 0px 15px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 1140px;
  }
`;

const Logo = styled(LogoSVG)`
  height: 40px;
`;

const DemoLogo = styled(DemoLogoSVG)`
  height: 40px;
`;

const NapLogo = styled(NapLogoSVG)``;

const Link = styled(LinkBase)`
  & > div {
    border: none;
    display: block;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }

    & > svg {
      margin-left: 0.3rem;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 990px) {
    display: none;
  }
`;

const NavigationLinks = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-right: 1em;
  font-size: ${theme.fontSize('FS16')};

  & li {
    ${() =>
      isTransportportal
        ? css`
            & > a,
            & > a > div,
            & > button {
              color: ${theme.colour(Colour.NEUTRAL, 'N0')};
            }
          `
        : css`
            & > a,
            & > a > div,
            & > button {
              color: ${theme.colour(Colour.NEUTRAL, 'N70')};
            }
          `}
  }

  & > li:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S16')};
  }
`;

export default {
  Header,
  Container,
  Logo,
  DemoLogo,
  NapLogo,
  ContentWrapper,
  NavigationLinks,
  Link
};
