import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.typography.exo2.regular};
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.875rem;
  }

  h1 {
    color: ${({ theme }) => theme.baseColors.brandPrimary};
  }

  p {
    color: ${({ theme }) => theme.baseColors.brandSecondary};
  }

  ul{
    margin: 0;
    padding: 0;

    li {
        list-style: none;
    }
  }

  img {
    max-width: 100%;
    vertical-align: middle;
  }

  figure {
      margin: 0;
  }

  button {
    font-family: ${({ theme }) => theme.typography.exo2.regular};
    background-color: ${({ theme }) => theme.baseColors.brandSecondary};
    color: #33363A;
    font-size: 1.25rem;
    width: 100%;
    border: none;
    text-align: center;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .container{
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
    padding: 0 4rem;

    @media (min-width: 1920px){
      max-width: 90rem;
    }
  }

  .color-primary{
    color: ${({ theme }) => theme.baseColors.brandPrimary};
  }

  .form-select select{
    padding: 0.5rem 1rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.hoverCta.text};
    background-color: ${({ theme }) => theme.colors.hoverCta.background};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;
