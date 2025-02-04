import styled from 'styled-components';

import { Colour, theme, Unit } from '@fellesdatakatalog/theme';
import { Backdrop as MuiBackdrop } from '@mui/material';
import SideMenuBase from '../../components/side-menu';

const onMobileView = '@media (max-width: 900px)';
const customBreakingPoint = '@media (max-width: 992px)';

const InformationPage = styled.article`
  background-color: ${({ theme: t }) => t.lighter};
  display: flex;
  gap: ${theme.spacing('S16', Unit.EM)};
  word-break: break-word;

  ${customBreakingPoint} {
    && {
      max-width: fit-content;
    }
  }

  ${onMobileView} {
    flex-direction: column;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex: 0 0 20%;
  flex-direction: column;

  ${onMobileView} {
    flex: 1;
  }
`;

const Article = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing('S10')};
  z-index: 5;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};
  padding-left: 0;
`;

const Description = styled.p`
  font-size: ${theme.fontSize('FS20')};
`;

const Content = styled.p`
  & > div {
    & > h2 {
      border-bottom: 1px solid ${({ theme: t }) => t.light};
      font-size: ${theme.fontSize('FS32')};
      font-weight: ${theme.fontWeight('FW700')};
      padding: ${theme.spacing('S6')};
      padding-left: 0;
      margin-bottom: ${theme.spacing('S10', Unit.EM)};
      margin-top: ${theme.spacing('S48')};
    }
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: ${theme.spacing('S16')};
`;

const Image = styled.img`
  max-width: 100%;
`;

const ImageText = styled.span`
  font-size: ${theme.fontSize('FS14')};
`;

const SideMenu = styled(SideMenuBase)`
  min-width: 180px;
  ${onMobileView} {
    display: none;
    width: auto;
    margin-right: 0;
  }
`;

const SideMenuSmall = styled(SideMenuBase)`
  display: none;
  ${onMobileView} {
    display: flex;
    flex: 1;
    ul {
      flex: 1;
      li {
        background-color: ${({ theme: t }) => t.extendedColors.neutralLighter};
        border-radius: 5px;
        margin-top: 2px;
        margin-bottom: 2px;

        a {
          background-color: transparent !important;
          color: ${({ theme: t }) => t.dark};
          margin-left: 20px;
          &.active {
            color: ${({ theme: t }) => t.dark} !important;
          }
        }
      }
    }
  }
`;

const MenuToggle = styled.button`
  display: none;
  color: ${({ theme: t }) => t.dark};

  ${onMobileView} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px;
    border-radius: 5px;
    font-size: 16px;
    border: none;
    background-color: ${({ theme: t }) => t.light};
  }

  &:hover {
    color: ${({ theme: t }) => t.darker};
  }

  &:active {
    background: black;
    color: ${({ theme: t }) => t.lighter};
  }

  &:before {
    content: '\\f0c9';
    font-family: FontAwesome;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 0.5em;
  }
`;

const Backdrop = styled(MuiBackdrop)`
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  z-index: ${theme.colour(Colour.NEUTRAL, 'N0')} + 1;
`;

export default {
  InformationPage,
  Aside,
  Article,
  Title,
  Description,
  Content,
  ImageWrapper,
  Image,
  ImageText,
  SideMenu,
  SideMenuSmall,
  MenuToggle,
  Backdrop
};
