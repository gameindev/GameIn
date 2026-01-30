import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{        
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
        font-family: 'Exo2', sans-serif !important;
        
        font-size: 75%;

        @media (min-width: 1200px) {
            font-size: 75%;
        }

        @media (min-width: 1400px) {
            font-size: 85%;
        }

        @media (min-width: 1600px) {
            font-size: 88%;
        }
    }

    * {
        font-family: 'Exo2', sans-serif !important;
    }

    ul{
        margin: 0;
        padding: 0;

        li {
            list-style: none;
        }
    }



    figure {
        margin: 0;
    }

    .wrapper{
        display: flex;
        width: 100%;
        max-width: none;
        margin: 0;
        gap: 1.5em;
        align-items: flex-start;

        .ad-banner{
            min-width: 14.875em;
            flex: 0 0 14.875em;
            position: sticky;
            top: 5em;
            height: calc(100vh - 5em);
            background: ${({ theme }) => theme.colors.secondaryGrey[1]};
        }
    }

    main{
        &:not(.logged-in){
            flex: 1;
        }
        &.logged-in{
            flex: 1 1 auto;
            padding: 2em;
            max-width: 90rem;
            width: 100%;
            margin: 0 auto;
            min-width: 0;

        }
    }
    
    .container, .container-fluid{
        width: 100%;
        margin: 0 auto;
    }

    .container{
        max-width: 75%;
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
        border: 0.125em solid ${({ theme }) =>
          theme.colors.primary[0]} !important;
     }

     .mantine-Carousel-indicator:not([data-active]){
        background-color: ${({ theme }) =>
          theme.colors.secondaryGrey[0]} !important;
        opacity: 1 !important;
     }


     /* Lucide icons overwrite styles */
     svg.lucide[width="24"] {
        width: 1.5em;
        height: 1.5em;
    }
    
    .hoverGreen:hover{
        background-color: ${({ theme }) => theme.colors.primary[0]} !important;
    }

    .hoverGreen:hover svg path {
        color: ${({ theme }) => theme.colors.black[0]} !important;
    }

    .hoverGrey:hover{
        background-color: ${({ theme }) =>
          theme.colors.hoverGrey[0]} !important;
    }

    .hoverGrey:hover svg path {
        color: ${({ theme }) => theme.colors.black[0]} !important;
    }

    .hoverRed:hover{
        background-color: ${({ theme }) => theme.colors.hoverRed[0]} !important;
    }

    .hoverRed:hover svg path {
        color: ${({ theme }) => theme.colors.inputBgColor[0]} !important;
    }

    .hoverYellow:hover{
        background-color: ${({ theme }) => theme.colors.yellow[0]} !important;
    }

    .hoverYellow:hover img {
        filter: brightness(0);
    }

    .myCropImage img{
        object-fit: contain;
    }

    .mantine-Input-input{
        font-size: 1.05em;
        padding: 1.2em;
        border-radius: 8px;
    }

    .recharts-polar-grid-concentric-polygon:nth-child(1){
        fill: rgba(92, 229, 176,1);
        filter: drop-shadow(4px 8px 12px black);
    }
    .recharts-polar-grid-concentric-polygon:nth-child(2){
        fill: rgba(92, 229, 176,0.7)
    }
    .recharts-polar-grid-concentric-polygon:nth-child(3){
        fill: rgba(92, 229, 176,0.6)
    }
    .recharts-polar-grid-concentric-polygon:nth-child(4){
        fill: rgba(92, 229, 176,0.4)
    }
    .recharts-polar-grid-concentric-polygon:nth-child(5){
        fill: rgba(92, 229, 176,0.2)
    }

    .terms_condition .mantine-Checkbox-icon{
        color: ${({ theme }) => theme.colors.skyblue[0]} !important;
        background: ${({ theme }) => theme.colors.skyblue[0]} !important;
    }

    .faq_accordion .mantine-Accordion-control[data-active],
    .faq_accordion .mantine-Accordion-control:hover {
        background-color: ${({ theme }) => theme.colors.inputBgColor[0]} !important;
        border-radius: ${({ theme }) => theme.radius.md} !important;
    }

    .showmore_logo img{
            transform: scale(0.8);
        object-fit: contain !important;
        clip-path: initial !important;
    }
    
`;
