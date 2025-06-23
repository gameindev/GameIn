import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root{
        /* font-size: 0.833334vw; */
        /* font-size: clamp(0.75em, -2.3321em + 3.6101vw, 2em); */

        /* @media(max-width: 1366px){
            font-size: 0.9vw;
        } */
    }    

    body{
        background: ${({ theme }) => theme.colors.body[0]};
        @media (max-width: 1600px) {
            font-size: 85%;
        }
        @media (max-width: 1400px) {
            font-size: 75%;
        }
    }

    ul{
        margin: 0;
        padding: 0;

        li {
            list-style: none;
        }
    }

    img {
        width: 100%;
        max-width: 100%;
        vertical-align: middle;
    }

    figure {
        margin: 0;
    }

    .wrapper{
        display: flex;

        .ad-banner{
            min-width: 14.875em;
            position: sticky;
            top: 6.496em;
            height: calc(100vh - 6.496em);
            background: ${({ theme }) => theme.colors.secondaryGrey[1]};
        }
    }

    main{
        &:not(.logged-in){
            flex: 1;
        }
        &.logged-in{
            padding: 2.5em;
            min-width: calc(100% - 35.5em);
        }
    }
    
    .container, .container-fluid{
        width: 100%;
        margin: 0 auto;
    }

    .container{
        max-width: 65%;
        /* padding: 0 4em; */
        /* @media (min-width: 1920px){
            max-width: 70em;
        } */
    }

    .container-fluid{
        max-width: 90%;
        /* padding: 0 2em; */
        /* @media (min-width: 1920px){
            max-width: 90em;
        } */
    }

    ::placeholder {
        color: ${({ theme }) => theme.colors.white[0]} !important;
        opacity: 0.7 !important;
    }

    /* Mantine Overwrite Styles */
    
    /* .mantine-PasswordInput-innerInput{
        padding: 4em !important;
    } */

     .mantine-RadioCard-card[data-checked] {
        border: 0.125em solid ${({ theme }) => theme.colors.primary[0]} !important;
     }


     /* Lucide icons overwrite styles */
     svg.lucide[width="24"] {
        width: 1.5em;
        height: 1.5em;
    }

    .avatar-icon-small{
        transform: scale(1.3);
    }

    

`;
