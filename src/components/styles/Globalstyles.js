import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Exo 2', sans-serif;
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  h1 {
    color: ${({ theme }) => theme.baseColors.brandPrimary};
  }

  p {
    color: ${({ theme }) => theme.baseColors.brandSecondary};
  }

  button {
    font-family: 'Exo 2', sans-serif;
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    color: #fff;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bgSecondary};
    }
  }
`;