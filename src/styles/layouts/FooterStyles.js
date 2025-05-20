import styled from "styled-components";

export const FooterSection = styled.footer`
  padding: 4rem 0;

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

      select{
        padding: 0rem 1.25rem !important;
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

          li>a{
            color: ${({ theme }) => theme.colors.textWhite[0]};
            text-decoration: none;
            transition: color 0.2s ease-in-out;
          }
        }
      }
    }
  }
`;
