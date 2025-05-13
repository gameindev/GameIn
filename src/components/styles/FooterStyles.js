import styled from "styled-components";

export const FooterSection = styled.footer`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding: 4rem 0;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  .footerFlex {
    display: flex;
    justify-content: space-between;

    .choose-lang {
      flex-basis: 20%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .logo {
        width: 11.5rem;
      }      
    }

    .quick-links{
      flex-basis: 50%;
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;

      h5{
        margin: 0 0 1rem;
      }

      .gameIn-links{
        ul{
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          li>a:hover{
            color: ${({ theme }) => theme.baseColors.brandPrimary};
            transition: all 0.2s ease-in-out;
          }
        }
      }
    }
  }
`;
