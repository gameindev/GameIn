import styled from "styled-components";

export const HeroSectionStyles = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    min-height: calc(100vh - 4.5rem);
    padding: clamp(3rem, 7vw, 5.5rem) 0 clamp(5.5rem, 9vw, 7rem);

    .heroContent {
        width: min(58%, 44rem);
        max-width: 100%;

        img{
            width: clamp(12rem, 24vw, 21rem);
            max-width: 100%;
            display: block;
        }

        .heroTitle,
        .heroSubTitle {
            max-width: 100%;
            overflow-wrap: break-word;
        }

        .heroTitle {
            font-size: clamp(2rem, 4.2vw, 3.25rem);
            line-height: 1.08;
            letter-spacing: 0;
        }
        .heroSubTitle {
            font-size: clamp(1.125rem, 2.3vw, 1.875rem);
            line-height: 1.25;
            max-width: 34rem;
            letter-spacing: 0;
        }
    }

    .scroll_down {
        all: unset;
        position: absolute;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 800;
        font-size: 0.875rem;
        cursor: pointer;
        color: #ffffff;
        white-space: nowrap;

        &::after {
            content: "";
            position: absolute;
            border-right: 0.1875rem solid #ffffff;
            border-bottom: 0.1875rem solid #ffffff;
            width: 0.625rem;
            height: 0.625rem;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%) rotate(-315deg);
        }
    }

    @media (max-width: 768px) {
        min-height: calc(100svh - 4.25rem);
        padding: 3.25rem 0 6rem;
        align-items: flex-start;

        .heroContent {
            width: 100%;

            .heroTitle,
            .heroSubTitle {
                width: min(100%, 24rem);
                white-space: normal;
            }
        }
    }

    @media (max-width: 480px) {
        padding-top: 2.75rem;

        .heroContent {
            width: 100%;

            > div {
                width: 100%;
            }

            a,
            button {
                width: min(100%, 16rem) !important;
            }
        }
    }
`;

export const FlexCardStyles = styled.div`
    display: flex;
    gap: clamp(1.25rem, 4vw, 4rem);
    padding-bottom: clamp(2rem, 4vw, 3rem);
    margin-bottom: clamp(2rem, 4vw, 3rem);
    scroll-margin: 6rem;

    .creator_card, .sponsor_card{
        padding: clamp(1.5rem, 3.5vw, 3rem);
        border-radius: 0.125em;
        flex: 1 1 0;
        min-width: 0;
        min-height: clamp(24rem, 38vw, 32rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .creator_card {
            background: ${({ theme }) => theme.colors.primary[0]};

        .banner_img{
            width: clamp(7rem, 13vw, 10rem);
            max-width: 100%;
        }
    }

    .sponsor_card {
        background: ${({ theme }) => theme.colors.secondary[0]};
        .banner_img{
            width: clamp(8rem, 16vw, 12rem);
            max-width: 100%;
        }
    }

    .flexTitle{
        font-size: clamp(1.5rem, 2.6vw, 2rem);
        line-height: 1.12;
        position: relative;
        letter-spacing: 0;

        &::after {
            content: "";
            position: absolute;
            bottom: -0.875rem;
            width: 3.5rem;
            height: 0.125rem;
            background: #ffffff;
            left: 0;
        }
    }

    .mantine-Text-root {
        font-size: clamp(1rem, 1.4vw, 1.125rem);
        line-height: 1.45;
    }

    @media (max-width: 900px) {
        flex-direction: column;

        .creator_card, .sponsor_card {
            min-height: auto;
        }
    }

    @media (max-width: 480px) {
        .creator_card, .sponsor_card {
            padding: 1.5rem;
        }

        .creator_card > div:last-child,
        .sponsor_card > div:last-child {
            gap: 1.25rem;
            align-items: center;
            flex-wrap: wrap;
        }
    }
`;

export const PresentationStyles = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3em;
    border-radius: 0.125em;
    background: ${({ theme }) => theme.colors.textSecondary[0]};
    gap: clamp(1.5rem, 3vw, 3rem);
    overflow: hidden;

    .presentation_cardContent {
        flex: 0 0 min(42%, 32rem);
        padding: clamp(2rem, 4vw, 3.25rem) 0 clamp(2rem, 4vw, 3.25rem) clamp(2rem, 5vw, 4rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 0;

        .presentation_cardTitle {
            font-size: clamp(1.5rem, 2.6vw, 2rem);
            font-weight: 400;
            line-height: 1.12;
            margin-bottom: 2.5rem;
            position: relative;
            letter-spacing: 0;

            &::after {
                content: "";
                position: absolute;
                bottom: -1.25rem;
                width: 3.25rem;
                height: 0.125rem;
                background: ${({ theme }) => theme.colors.primary[0]};
                left: 0;
            }

            span {
                font-weight: 900;
                color: ${({ theme }) => theme.colors.primary};
                display: block;
            }
        }

        .mantine-Text-root {
            font-size: clamp(1rem, 1.35vw, 1.125rem);
            line-height: 1.5;
        }
    } 

    .presentation_img{
        flex: 1 1 60%;
        min-width: 0;
        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &.odd {
        flex-direction: row-reverse;
        text-align: right;

        .presentation_cardContent {
            padding: clamp(2rem, 4vw, 3.25rem) clamp(2rem, 5vw, 4rem) clamp(2rem, 4vw, 3.25rem) 0;
            align-items: flex-end;

            .text_block {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }

            .presentation_cardTitle::after {
                left: unset;
                right: 0;
            }
        }
            &:last-child {
            position: relative;
            margin-bottom: 15em;

            &::after {
                content: "";
                position: absolute;
                bottom: -15em;
                left: -8em;
                background-image: url(/src/assets/homepage/bottom-decor.png);
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                z-index: -1;
                background-size: 20%;
            }
        }
    }

    @media (max-width: 900px) {
        flex-direction: column-reverse;
        gap: 0;

        .presentation_cardContent {
            flex-basis: auto;
            padding: 2rem;
        }

        .presentation_img {
            flex-basis: auto;

            img {
                aspect-ratio: 16 / 10;
                height: auto;
            }
        }

        &.odd {
            flex-direction: column-reverse;
            text-align: left;

            .presentation_cardContent {
                padding: 2rem;
                align-items: flex-start;

                .text_block {
                    align-items: flex-start;
                }

                .presentation_cardTitle::after {
                    left: 0;
                    right: unset;
                }
            }

            &:last-child {
                margin-bottom: 4rem;

                &::after {
                    display: none;
                }
            }
        }
    }

    @media (max-width: 480px) {
        .presentation_cardContent {
            padding: 1.5rem;
        }

        &.odd .presentation_cardContent {
            padding: 1.5rem;
        }
    }
`;

export const MileStoneStyles = styled.div`
    .milestone_banner {
        position: relative;
        margin: clamp(3rem, 7vw, 6rem) 0;
        background: linear-gradient( 225deg, #9d7fef 0%, #69b3e7 48.8%, #5ce5b0 100%);
        clip-path: polygon(
            -0.018% 0.021%,
            -0.018% 99.883%,
            24.783% 99.883%,
            24.783% 99.883%,
            24.894% 99.873%,
            25.004% 99.84%,
            25.112% 99.783%,
            25.218% 99.703%,
            25.322% 99.6%,
            25.423% 99.476%,
            25.52% 99.329%,
            25.615% 99.161%,
            25.705% 98.972%,
            25.79% 98.763%,
            27.046% 95.356%,
            27.046% 95.356%,
            27.131% 95.148%,
            27.221% 94.959%,
            27.315% 94.792%,
            27.412% 94.645%,
            27.513% 94.521%,
            27.616% 94.418%,
            27.722% 94.338%,
            27.83% 94.28%,
            27.939% 94.247%,
            28.05% 94.237%,
            71.929% 94.237%,
            71.929% 94.237%,
            72.04% 94.246%,
            72.15% 94.279%,
            72.258% 94.336%,
            72.364% 94.416%,
            72.468% 94.519%,
            72.569% 94.644%,
            72.667% 94.791%,
            72.761% 94.959%,
            72.851% 95.147%,
            72.936% 95.356%,
            74.192% 98.763%,
            74.192% 98.763%,
            74.278% 98.972%,
            74.368% 99.161%,
            74.462% 99.329%,
            74.559% 99.476%,
            74.66% 99.601%,
            74.764% 99.703%,
            74.87% 99.783%,
            74.978% 99.84%,
            75.088% 99.874%,
            75.199% 99.883%,
            100% 99.883%,
            100% 0.021%,
            75.199% 0.021%,
            75.199% 0.021%,
            75.088% 0.031%,
            74.978% 0.064%,
            74.87% 0.121%,
            74.764% 0.201%,
            74.66% 0.304%,
            74.559% 0.429%,
            74.462% 0.575%,
            74.368% 0.743%,
            74.278% 0.932%,
            74.192% 1.141%,
            72.936% 4.548%,
            72.936% 4.548%,
            72.851% 4.756%,
            72.761% 4.945%,
            72.667% 5.112%,
            72.57% 5.259%,
            72.469% 5.384%,
            72.366% 5.486%,
            72.26% 5.566%,
            72.152% 5.624%,
            72.043% 5.657%,
            71.932% 5.667%,
            28.053% 5.667%,
            28.053% 5.667%,
            27.942% 5.658%,
            27.833% 5.625%,
            27.724% 5.568%,
            27.618% 5.488%,
            27.514% 5.385%,
            27.413% 5.26%,
            27.316% 5.114%,
            27.222% 4.946%,
            27.132% 4.757%,
            27.046% 4.548%,
            25.79% 1.141%,
            25.79% 1.141%,
            25.705% 0.932%,
            25.615% 0.743%,
            25.521% 0.575%,
            25.423% 0.428%,
            25.322% 0.303%,
            25.218% 0.201%,
            25.112% 0.121%,
            25.004% 0.064%,
            24.894% 0.031%,
            24.783% 0.021%,
            -0.018% 0.021%
        );

        .milestone_container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            padding: clamp(2.75rem, 6vw, 5rem) 1.5rem;
            max-width: 70rem;
            margin: 0 auto;

            .startJourney {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img {
                    margin-bottom: 1.25rem;
                    width: min(18rem, 70vw);
                    max-width: 100%;
                }

                h3 {
                    color: ${({ theme }) => theme.colors.textWhite[0]};
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    font-weight: 900;
                    line-height: 1.12;
                    margin-bottom: 0.25rem;
                    letter-spacing: 0;
                }

                p {
                    color: ${({ theme }) => theme.colors.textWhite[0]};
                    font-size: clamp(1rem, 1.35vw, 1.125rem);
                    font-weight: 400;
                    line-height: 1.35;
                }
            }

            .counts_block {
                display: flex;
                align-items: center;
                margin-top: 2.5rem;
                width: 100%;
                justify-content: space-between;
                gap: 1.5rem;

                .count {
                    color: ${({ theme }) => theme.colors.textWhite[0]};
                    font-size: clamp(2rem, 5vw, 3.25rem);
                    font-weight: 400;
                    line-height: 1;
                }

                span {
                    color: ${({ theme }) => theme.colors.textWhite[0]};
                    font-size: 0.875rem;
                    font-weight: 400;
                    text-transform: uppercase;
                }
            }

            button {
                margin-top: 1.75rem;
            }
        }
    }

    @media (max-width: 768px) {
        .milestone_banner {
            clip-path: none;

            .milestone_container {
                .counts_block {
                    flex-wrap: wrap;
                    justify-content: center;

                    .counter {
                        flex: 1 1 calc(50% - 1.5rem);
                        min-width: 10rem;
                    }
                }
            }
        }
    }

    @media (max-width: 420px) {
        .milestone_banner .milestone_container .counts_block {
            .counter {
                flex-basis: 100%;
            }
        }
    }
`;
