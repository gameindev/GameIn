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
        max-width: 80%;
        @media (min-width: 1920px){
            max-width: 70rem;
        }
    }

    .container-fluid{
        max-width: 95%;
        @media (min-width: 1920px){
            max-width: 90rem;
        }
    }
`;
