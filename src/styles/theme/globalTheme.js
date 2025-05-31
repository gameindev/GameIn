import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root{
        font-size: 0.8vw;
    }

    body{
        background: ${({ theme }) => theme.colors.body[0]};
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

    main{
        padding: 40px;
        margin: 0 15.875rem 0 20.625rem;
    }
    
    .container, .container-fluid{
        width: 100%;
        margin: 0 auto;
    }

    .container{
        max-width: 1200px;
        padding: 0 4rem;
            @media (min-width: 1920px){
            max-width: 70rem;
        }
    }

    .container-fluid{
        max-width: 1440px;
        padding: 0 2rem;
            @media (min-width: 1920px){
            max-width: 90rem;
        }
    }

    ::placeholder {
        color: ${({ theme }) => theme.colors.white[0]} !important;
        opacity: 0.7 !important;
    }

    /* .mantine-PasswordInput-innerInput{
        padding: 4rem !important;
    } */

     .mantine-RadioCard-card[data-checked] {
        border: 2px solid ${({ theme }) => theme.colors.primary[0]} !important;
     }
`;
