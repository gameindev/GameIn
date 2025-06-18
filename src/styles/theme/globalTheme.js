import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root{
        font-size: 0.833334vw;

        /* @media(max-width: 1366px){
            font-size: 0.9vw;
        } */
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
            min-width: 15.875rem;
            position: sticky;
            top: 6.496rem;
            height: calc(100vh - 6.496rem);
            background: ${({ theme }) => theme.colors.secondaryGrey[1]};
        }
    }

    main{
        &:not(.logged-in){
            flex: 1;
        }
        &.logged-in{
            padding: 2.5rem;
            min-width: calc(100% - 36.5rem);
        }
    }
    
    .container, .container-fluid{
        width: 100%;
        margin: 0 auto;
    }

    .container{
        max-width: 65%;
        /* padding: 0 4rem; */
        /* @media (min-width: 1920px){
            max-width: 70rem;
        } */
    }

    .container-fluid{
        max-width: 90%;
        /* padding: 0 2rem; */
        /* @media (min-width: 1920px){
            max-width: 90rem;
        } */
    }

    ::placeholder {
        color: ${({ theme }) => theme.colors.white[0]} !important;
        opacity: 0.7 !important;
    }

    /* Mantine Overwrite Styles */
    .mantine-Switch-input:checked + * > .mantine-Switch-thumb{
        background-color: ${({ theme }) => theme.colors.primary[0]} !important;
    }

    .mantine-Switch-labelWrapper{
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }

    /* .mantine-PasswordInput-innerInput{
        padding: 4rem !important;
    } */

     .mantine-RadioCard-card[data-checked] {
        border: 0.125rem solid ${({ theme }) => theme.colors.primary[0]} !important;
     }


     /* Lucide icons overwrite styles */
     svg.lucide[width="24"] {
        width: 1.5rem;
        height: 1.5rem;
    }

    .avatar-icon-small{
        transform: scale(1.3);
    }

    

`;
