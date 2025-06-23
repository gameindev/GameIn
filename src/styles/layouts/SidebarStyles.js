import styled from "styled-components";

export const SidebarStyles = styled.aside`
    display: flex;
    width: 100%;
    min-width: 20.625em;
    background: ${({ theme }) => theme.colors.secondaryGrey[1]};
    position: sticky;
    top: 6.496em;
    height: calc(100vh - 6.496em);

    .profile-icons {
      background: ${({ theme }) => theme.colors.textSecondary[0]};
      padding: 1.5em 1em;

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
      flex-basis: calc(100% - 4.375em);

      ul{
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        li>a{
          display: flex;
          align-items: center;
          padding: 1em 1.5em;
          gap: 0.75em;
          border-radius: 0.313em;
          text-decoration: none;
          color: ${({ theme }) => theme.colors.text[0]};
          text-transform: uppercase;

          &:hover{
            background: ${({ theme }) => theme.colors.inputBgColor[0]};
            color: ${({ theme }) => theme.colors.primary[0]};
            transition: all 0.3s ease-in-out;
          }
        }

        .divider{
            border: 0.063em dashed ${({ theme }) => theme.colors.inputBgColor[0]};
            width: 100%;
            margin: 0.75em 0;
        }
      }
    }
`;
