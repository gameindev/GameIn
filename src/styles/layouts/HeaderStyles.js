import styled from "styled-components";

export const HeaderSection = styled.header`
  /* padding: 1.625em 0; */
  position: sticky;
  top: 0;
  z-index: 99;
  
  .headerCard{
    padding: 1.5em 0;
  }

  .headerFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 11.5em;
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
  }
`;
