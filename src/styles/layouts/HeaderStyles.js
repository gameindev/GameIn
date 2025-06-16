import styled from "styled-components";

export const HeaderSection = styled.header`
  /* padding: 1.625rem 0; */
  position: sticky;
  top: 0;
  z-index: 99;
  
  .headerCard{
    padding: 1.5rem 0;
  }

  .headerFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 11.5rem;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;

    ul {
      display: flex;
      gap: 1rem;

      li > a {
        color: ${({ theme }) => theme.colors.textWhite[0]};
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        text-transform: uppercase;
      }
    }

    .access-btns {
      display: flex;
      gap: 0.5rem;
    }
  }
`;
