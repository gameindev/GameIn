import styled from "styled-components";

export const FooterSection = styled.footer`
  padding: clamp(2.5em, 5vw, 4.5em) 0;
  overflow: hidden;

  .footerFlex {
    display: grid;
    grid-template-columns: minmax(10em, 0.85fr) minmax(0, 3fr) minmax(8em, 0.7fr);
    gap: clamp(2em, 4vw, 4em);
    align-items: flex-start;
    min-width: 0;

    .choose-lang {
      display: flex;
      flex-direction: column;
      gap: 1.25em;
      min-width: 0;

      .logo {
        display: inline-flex;
        width: min(11.5em, 100%);
      }

      .logo img {
        display: block;
        width: 100%;
        height: auto;
      }

      .mantine-InputWrapper-root {
        width: min(13em, 100%);
      }
    }

    .quick-links{
      display: grid;
      grid-template-columns: repeat(4, minmax(8.5em, 1fr));
      gap: 2em clamp(1.25em, 2.5vw, 2.5em);
      text-transform: uppercase;
      min-width: 0;

      h5{
        margin: 0 0 0.85em;
        line-height: 1.2;
      }

      .gameIn-links{
        min-width: 0;

        ul{
          display: flex;
          flex-direction: column;
          gap: 0.35em;

          li>a{
            color: ${({ theme }) => theme.colors.textWhite[0]};
            display: inline-flex;
            max-width: 100%;
            min-height: 1.75em;
            align-items: center;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
            overflow-wrap: anywhere;
            line-height: 1.25;
          }

          li>a:hover {
            color: ${({ theme }) => theme.colors.primary[0]};
          }
        }
      }
    }

    .copyrights {
      min-width: 0;

      h5 {
        margin: 0;
        line-height: 1.25;
      }

      h5 + h5 {
        margin-top: 0.55em;
      }
    }
  }

  @media (max-width: 1180px) {
    .footerFlex {
      grid-template-columns: minmax(10em, 0.8fr) minmax(0, 2.2fr);
      gap: 2.5em;

      .quick-links {
        grid-column: 1 / -1;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .copyrights {
        justify-self: end;
      }

      .copyrights h5 {
        text-align: right !important;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2.5em 0 calc(6.5em + env(safe-area-inset-bottom));

    .footerFlex {
      grid-template-columns: 1fr;
      gap: 2em;
      justify-items: center;
      text-align: center;

      .choose-lang {
        align-items: center;
      }

      .quick-links {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.75em 1.25em;
        width: 100%;
      }

      .copyrights {
        justify-self: center;
      }

      .copyrights h5 {
        text-align: center !important;
      }
    }
  }

  @media (max-width: 420px) {
    .footerFlex {
      .choose-lang .mantine-InputWrapper-root {
        width: 100%;
      }

      .quick-links {
        grid-template-columns: 1fr;
      }

      .quick-links .gameIn-links ul {
        align-items: center;
      }
    }
  }
`;
