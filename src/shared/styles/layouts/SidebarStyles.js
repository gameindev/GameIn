import styled from "styled-components";

export const SidebarStyles = styled.aside`
  display: flex;
  width: 20.625em;
  min-width: 20.625em;
  max-width: 20.625em;
  background: ${({ theme }) => theme.colors.secondaryGrey[1]};
  position: sticky;
  top: 5em;
  height: calc(100vh - 5em);
  align-self: flex-start;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;

  .drawer-head {
    display: none;
  }

  .profile-icons {
    background: ${({ theme }) => theme.colors.textSecondary[0]};
    padding: 1.5em 1em;
    flex: 0 0 4.625em;
    min-width: 4.625em;

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

        li {
          .profile-hexagon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .avatar-icon {
            position: unset;

            & > div {
              border: none;
            }
          }
        }
      }
    }

    .profile-links{
      padding: 1.5em 1em;
      flex: 1 1 auto;
      width: auto;
      min-width: 0;

      ul{
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        li{
          .menu-accordion{
            .mantine-Accordion-icon{
              color: ${({ theme }) => theme.colors.text[0]};
            }

            .mantine-Accordion-label{
              color: ${({ theme }) => theme.colors.text[0]};
              text-transform: uppercase;
              padding: 0.5rem 0;
            }

            & .mantine-Accordion-control:hover{
              background: ${({ theme }) => theme.colors.inputBgColor[0]};
              color: ${({ theme }) => theme.colors.primary[0]};
              border-radius: 0.313em;
              transition: all 0.3s ease-in-out;

              .mantine-Accordion-icon{
                color: ${({ theme }) => theme.colors.primary[0]};
              }

              .mantine-Accordion-label{
                color: ${({ theme }) => theme.colors.primary[0]};
              }
            }

            .mantine-Accordion-panel a{
              display: flex;
              align-items: center;
              padding: 0.5em 1.5em;
              gap: 0.75em;
              border-radius: 0.313em;
              text-decoration: none;
              color: ${({ theme }) => theme.colors.text[0]};
              text-transform: uppercase;
              /* font-size: ${({ theme }) => theme.fontSizes.sm};; */

              &:hover, &.active{
                background: ${({ theme }) => theme.colors.inputBgColor[0]};
                color: ${({ theme }) => theme.colors.primary[0]};
                transition: all 0.3s ease-in-out;
              }

              .arrow{
                display: inline-flex;
                margin-left: auto;
              }
            }
          }
          a{
            text-decoration: none;
          }
        }

        .avatar-icon {
          position: unset;

          & > div {
            border: none;
          }
        }
      }
    }

  .profile-links {
    padding: 1.5em 1em;
    flex: 1 1 auto;
    min-width: 0;

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      li > a {
        display: flex;
        align-items: center;
        padding: 0.5em 1.5em;
        gap: 0.75em;
        border-radius: 0.313em;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text[0]};
        text-transform: uppercase;

        &:hover, &.active {
          background: ${({ theme }) => theme.colors.inputBgColor[0]};
          color: ${({ theme }) => theme.colors.primary[0]};
          transition: all 0.3s ease-in-out;
        }
      }

      /* li.active a {
        background: ${({ theme }) => theme.colors.inputBgColor[0]};
        color: ${({ theme }) => theme.colors.primary[0]};
      } */

      .divider {
        border: 0.063em dashed ${({ theme }) => theme.colors.inputBgColor[0]};
        width: 100%;
        margin: 0.75em 0;
      }
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: min(20rem, 86vw);
    min-width: 0;
    max-width: none;
    display: grid;
    grid-template-columns: 4.75em minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-105%")});
    transition: transform 0.28s cubic-bezier(.4, 0, .2, 1);
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.secondaryGrey[1]};
    box-shadow: ${({ $isOpen }) => ($isOpen ? "0 1.5rem 3rem rgba(0,0,0,0.35)" : "none")};

    .drawer-head {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1.25em 1em 0.75em;
      color: ${({ theme }) => theme.colors.white[0]};
      font-weight: 800;

      img {
        display: block;
        width: 7.75rem;
        max-width: calc(100% - 3.25rem);
        height: auto;
      }

      button {
        width: 2.5em;
        height: 2.5em;
        border: 0;
        border-radius: ${({ theme }) => theme.radius.md};
        background: ${({ theme }) => theme.colors.inputBgColor[0]};
        color: ${({ theme }) => theme.colors.white[0]};
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }

    .profile-icons {
      padding: 1em 0.75em;
      grid-column: 1;
      grid-row: 2;
      min-width: 0;
      height: 100%;
    }

    .profile-links {
      padding: 1em 0.75em 2em;
      grid-column: 2;
      grid-row: 2;
      width: auto;
      min-width: 0;
    }
  }

  @media (max-width: 768px) {
    width: min(18rem, 88vw);
  }
    
`;

