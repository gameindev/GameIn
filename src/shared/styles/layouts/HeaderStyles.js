import styled from "styled-components";

export const HeaderSection = styled.header`
  /* padding: 1.625em 0; */
  position: sticky;
  top: 0;
  z-index: 99;

  .headerCard {
    padding: ${({ $isLoggedIn }) => ($isLoggedIn ? '1em' : '1.625em')} 0;
    background: ${({ theme }) => theme.colors.secondaryGrey[1]};
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .headerFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 11.5em;
      display: flex;
      align-items: center;
      gap: 0.75em;
      flex-shrink: 0;

      a {
        display: inline-flex;
        min-width: 0;
      }

      img {
        width: 100%;
        min-width: 0;
      }
    }

    .menu-toggle {
      display: none;
      width: 2.75em;
      height: 2.75em;
      border: 0;
      border-radius: ${({ theme }) => theme.radius.md};
      background: ${({ theme }) => theme.colors.inputBgColor[0]};
      color: ${({ theme }) => theme.colors.white[0]};
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      cursor: pointer;
    }

    .searchbar {
      flex: 1;
      display: flex;
      justify-content: center;

      .mantine-TextInput-root {
        width: min(100%, 26rem);
      }
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2em;

    ul {
      display: flex;
      gap: 1em;

      li > a {
        color: ${({ theme }) => theme.colors.textWhite[0]};
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        text-transform: uppercase;
      }
    }

    .access-btns {
      display: flex;
      gap: 0.5em;
    }

    .mobile-search-toggle {
      display: none;
      width: 2.5em;
      height: 2.5em;
      border: 0;
      border-radius: ${({ theme }) => theme.radius.md};
      background: ${({ theme }) => theme.colors.inputBgColor[0]};
      color: ${({ theme }) => theme.colors.white[0]};
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .mantine-UnstyledButton-root {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5em;
      height: 2.5em;
      overflow: visible;
    }

    .avatar-icon-small {
      width: 2.5em;
      height: 2.5em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .avatar-icon-small > div {
      width: 2.5em !important;
      height: 2.5em !important;
      flex: 0 0 2.5em;
    }
  }

  .mobile-search-panel {
    display: none;
  }

  @media (max-width: 1024px) {
    .headerCard {
      padding: 0.75em 0;
    }

    .headerFlex {
      gap: 1em;

      .menu-toggle {
        display: inline-flex;
      }

      .logo {
        width: 10em;
      }
    }
  }

  @media (max-width: 768px) {
    .container-fluid {
      max-width: calc(100% - 1.5em);
    }

    .headerFlex {
      gap: 0.75em;

      .logo {
        width: auto;

        a {
          width: 8.25em;
        }
      }

      .searchbar {
        display: none !important;
      }
    }

    nav {
      gap: 0.55em;

      ul {
        display: none;
      }

      .access-btns {
        gap: 0.35em;
      }

      .mobile-search-toggle {
        display: inline-flex;
      }

      .mobile-search-toggle,
      .mantine-UnstyledButton-root,
      .avatar-icon-small {
        width: 2.35em;
        height: 2.35em;
        min-width: 2.35em;
      }

      .avatar-icon-small > div {
        width: 2.35em !important;
        height: 2.35em !important;
        flex-basis: 2.35em;
      }
    }

    .mobile-search-panel {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition: grid-template-rows 0.22s ease, opacity 0.18s ease, padding-top 0.18s ease;
      padding-top: 0;
      overflow: hidden;
    }

    .mobile-search-panel > * {
      min-height: 0;
    }

    .mobile-search-panel.open {
      grid-template-rows: 1fr;
      opacity: 1;
      padding-top: 0.75em;
    }
  }

  @media (max-width: 420px) {
    .headerFlex .logo a {
      width: 6.25em;
    }

    nav .access-btns {
      display: none;
    }
  }
`;

