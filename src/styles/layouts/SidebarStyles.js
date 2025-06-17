import styled from "styled-components";

export const SidebarStyles = styled.aside`
    display: flex;
    width: 100%;
    min-width: 20.625rem;
    background: ${({ theme }) => theme.colors.darkText[1]};
    position: sticky;
    top: 6.496rem;
    height: calc(100vh - 6.496rem);

    .profile-icons {
      background: ${({ theme }) => theme.colors.textSecondary[0]};
      padding: 1.5rem 1rem;

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

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
      padding: 1.5rem 1rem;
      flex-basis: calc(100% - 4.375rem);

      ul{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        li>a{
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          gap: 0.75rem;
          border-radius: 0.313rem;
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
            border: 0.063rem dashed ${({ theme }) => theme.colors.inputBgColor[0]};
            width: 100%;
            margin: 0.75rem 0;
        }
      }
    }
`;
