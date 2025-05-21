import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
`;
