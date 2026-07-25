import styled from "styled-components";

export const HeaderSection = styled.header`
  position: sticky;
  top: 0;
  z-index: 99;

  .headerCard {
    padding: 0;
    background: ${({ theme }) => theme.colors.secondaryGrey[1]};
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .container-fluid {
    min-height: ${({ $isLoggedIn }) => ($isLoggedIn ? '4.25rem' : '4.5rem')};
    display: flex;
    align-items: center;
  }

  .headerFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;

    .logo {
      width: 10.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;

      a {
        display: inline-flex;
        min-width: 0;
        width: 100%;
      }

      img {
        width: 100%;
        min-width: 0;
        display: block;
      }
    }

    .menu-toggle {
      display: none;
      width: 2.75rem;
      height: 2.75rem;
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
    gap: 1.5rem;
    min-width: 0;

    ul {
      display: flex;
      gap: 1rem;
      align-items: center;

      li > a {
        color: ${({ theme }) => theme.colors.textWhite[0]};
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        text-transform: uppercase;
        font-size: 0.8125rem;
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
      }
    }

    .access-btns {
      display: flex;
      gap: 0.625rem;
      align-items: center;

      a {
        display: inline-flex;
      }

      .mantine-Button-root {
        min-width: 5.25rem;
        height: 2.5rem;
        padding-inline: 1rem;
      }

      .mantine-Button-label {
        font-size: 0.8125rem;
        font-weight: 700;
      }
    }

    .mobile-search-toggle {
      display: none;
      width: 2.5rem;
      height: 2.5rem;
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
      width: 2.5rem;
      height: 2.5rem;
      overflow: visible;
    }

    .avatar-icon-small {
      width: 2.5rem;
      height: 2.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .avatar-icon-small > div {
      width: 2.5rem !important;
      height: 2.5rem !important;
      flex: 0 0 2.5rem;
    }
  }

  .mobile-search-panel {
    display: none;
  }

  @media (max-width: 1024px) {
    .container-fluid {
      min-height: 4.25rem;
    }

    .headerFlex {
      gap: 1rem;

      .menu-toggle {
        display: inline-flex;
      }

      .logo {
        width: 9.25rem;
      }
    }

    nav {
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .container-fluid {
      max-width: calc(100% - 1.5em);
    }

    .headerFlex {
      gap: 0.75rem;

      .logo {
        width: 8.75rem;
      }

      .searchbar {
        display: none !important;
      }
    }

    nav {
      gap: 0.625rem;

      ul {
        display: none;
      }

      .access-btns {
        gap: 0.5rem;

        .mantine-Button-root {
          min-width: 4.75rem;
          height: 2.375rem;
          padding-inline: 0.75rem;
        }
      }

      .mobile-search-toggle {
        display: inline-flex;
      }

      .mobile-search-toggle,
      .mantine-UnstyledButton-root,
      .avatar-icon-small {
        width: 2.375rem;
        height: 2.375rem;
        min-width: 2.375rem;
      }

      .avatar-icon-small > div {
        width: 2.375rem !important;
        height: 2.375rem !important;
        flex-basis: 2.375rem;
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
    .container-fluid {
      min-height: 4rem;
    }

    .headerFlex {
      gap: 0.5rem;
    }

    .headerFlex .logo {
      width: 7.125rem;
    }

    nav .access-btns {
      .mantine-Button-root {
        min-width: 4.5rem;
        height: 2.25rem;
        padding-inline: 0.625rem;
      }

      a:first-child {
        display: none;
      }
    }
  }
`;

