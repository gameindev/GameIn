import styled, { css } from "styled-components";

export const HeroAltStyles = styled.div`
  padding: clamp(3rem, 6vw, 6rem) 0;
  text-align: center;
  background: ${({ theme }) => theme.colors.textSecondary[0]};

  .logo {
    max-width: min(18.75rem, 90vw);
    margin: 0 auto 1.5em;
    display: block;
  }

  .headline {
    font-size: clamp(2rem, 5vw, 3.75rem);
    line-height: 1.1;
    font-weight: 500;
  }
  .subhead {
    font-size: clamp(1rem, 2vw, 1.25em);
    opacity: 0.9;
    max-width: 30em;
    font-weight: 300;
    margin: 0.75em auto 0;
  }
  .gamein-engine-banner {
    width: min(10rem, 80vw);
    max-width: 48em;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    margin-top: clamp(2rem, 5vw, 5rem);
  }
  .search-demo {
    margin: 0 auto 1em;
    padding: clamp(0.75rem, 2vw, 1.25em);
    max-width: min(48em, 95vw);
    background: ${({ theme }) => theme.colors.bannerGrey[0]};
    border-color: #2b2d30;
    position: relative;
    overflow: hidden;
  }

  .search-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
  }

  .search-text {
    width: 60%;
  }

  .cta-btn {
    min-width: 7.5em;
    width: auto;
    max-width: 100%;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75em;
  }
  .playerData {
    background: ${({ theme }) => theme.colors.bannerGrey[0]};
    border-color: #2b2d30;
  }
  /* Badge inside the rank hex – size relative to parent */
  .small_badge {
    position: absolute;
    /* Position near the bottom centre of the hex */
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    /* Scale badge proportionally (about 30% of parent hex) */
    width: 30%;
    height: auto;
  }
  .stat {
    background: rgba(255, 255, 255, 0.04);
    padding: 0.75em;
    border-radius: 0.25em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stat .k {
    color: ${({ theme }) => theme.colors.textWhite[0]};
    font-size: 1.125em;
    font-weight: 800;
  }
  .stat span:last-child {
    color: ${({ theme }) => theme.colors.textWhite[0]};
    opacity: 0.7;
    font-size: 0.75em;
  }

  /* PlayerStats component */
  .player-stats {
    width: min(48em, 100%);
    margin: 0 auto;
    text-align: center;
  }
  .player-stats .demo-row,
  .player-stats .follower-row {
    width: 100%;
    max-width: 11rem;
  }
  .player-stats .rank-hex {
    position: relative;
    width: clamp(8rem, 22vw, 18.75rem);
    aspect-ratio: 1;
  }
  .player-stats .rank-hex .hex_container {
    width: 100% !important;
    height: 100% !important;
  }
  .player-stats .rank-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    padding: clamp(2rem, 5vw, 3rem) 0;

    .search-row {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
      justify-content: center;
    }

    .search-text {
      width: 100%;
      text-align: center;
    }

    .search-demo .mantine-Text-root {
      width: 100% !important;
      text-align: center !important;
    }

    .cta-btn {
      width: 100%;
      max-width: 20rem;
    }

    .player-stats .demo-row,
    .player-stats .follower-row {
      max-width: 16rem;
    }
  }

  @media (max-width: 480px) {
    .search-demo {
      padding: 1rem;
    }

    .search-row {
      gap: 0.5rem;
    }

    .player-stats .demo-row,
    .player-stats .follower-row {
      max-width: 14rem;
    }
  }
`;

export const TwoColSection = styled.section`
  padding: clamp(2rem, 5vw, 3.125rem) 0;

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 5em);
    align-items: center;
  }
  .section-title {
    font-size: clamp(1.75rem, 4vw, 3.125rem);
    line-height: 1.15;
    margin-bottom: 1.75rem;
    padding-bottom: 1.75rem;
  }
  .dashedTitle {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 3.5rem;
      height: 0.313rem;
      background: ${({ theme }) => theme.colors.primary[0]};
    }
  }
  .copy {
    max-width: 36em;
    opacity: 0.9;
  }
  p {
    font-size: clamp(1.25rem, 2.5vw, 1.875rem);
    font-weight: 300;
    a {
      font-size: 1.25rem;
      display: block;
      width: fit-content;
    }
  }
  .art {
    background: ${({ theme }) => theme.colors.textSecondary[0]};
    aspect-ratio: 1 / 0.8;
    min-width: 0;
  }
  .art img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }
  
  /* New responsive class hooks */
  /* CTA button container within TwoColSection */
  .col-cta {
    /* Fit the button width to its content */
    width: fit-content;
    max-width: 20rem;
    /* Remove centering margin; alignment handled by flex container */
    margin: 0;
  }

  /* Align button to the left (default) */
  .col-cta.left-cta {
    margin-left: 0;
  }

  /* Align button to the right */
  .col-cta.right-cta {
    margin-left: auto;
  }


  .how-cta,
  .milestone-cta {
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
  }

  .two-col-spaced {
    margin-top: clamp(2rem, 5vw, 3rem);
  }

  /* Align text right for reversed sections on desktop */
  ${({ reversed }) =>
    reversed &&
    css`
      .two-col {
        .text {
          text-align: right;
        }
      }
      .dashedTitle::after {
        left: unset;
        right: 0;
      }
    `}

  @media (max-width: 900px) {
    .two-col {
      grid-template-columns: 1fr;
      gap: clamp(1.5rem, 4vw, 2.5rem);
    }

    .art {
      aspect-ratio: 16 / 10;
    }

    ${({ reversed }) =>
      reversed &&
      css`
        .two-col {
          .text {
            text-align: left;
            order: 1;
          }
        }
        .art {
          order: 2;
        }
        .dashedTitle::after {
          left: 0;
          right: unset;
        }
      `}

  }

  @media (max-width: 480px) {
    padding: clamp(1.5rem, 4vw, 2rem) 0;

    .section-title {
      font-size: clamp(1.5rem, 5vw, 1.75rem);
      margin-bottom: 1.25rem;
      padding-bottom: 1.25rem;
    }

    p {
      font-size: 1.125rem;
    }
  }
`;

export const HowItWorksStyles = styled.section`
  padding: clamp(3rem, 6vw, 4em) 0 clamp(5rem, 10vw, 10em);
  text-align: center;
  .how-title.dashedTitle {
    text-transform: capitalize;
    font-size: clamp(1.75rem, 4vw, 3.125rem);
    padding-bottom: 1.75rem;
    margin-bottom: 1.75rem;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      right: 0;
      width: 3.5rem;
      height: 0.313rem;
      background: ${({ theme }) => theme.colors.primary[0]};
      transform: translateX(-50%);
    }
  }
  .helperText {
    font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  }
  .video-container {
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
    max-width: min(100%, 60rem);
    margin: 0 auto;
  }
  .how-copy {
    max-width: 46em;
    margin: 0 auto;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: clamp(2rem, 5vw, 3rem) 0 clamp(3rem, 8vw, 5rem);

    .how-title.dashedTitle {
      font-size: clamp(1.5rem, 4vw, 1.75rem);
      padding-bottom: 1.25rem;
      margin-bottom: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    padding: clamp(1.5rem, 4vw, 2rem) 0 clamp(2rem, 6vw, 3rem);

    .helperText {
      font-size: 1.125rem;
    }
  }
`;

export const GridCard = styled.section`
  background: linear-gradient(225deg, #9d7fef 0%, #69b3e7 48.8%, #5ce5b0 100%);
  position: relative;
  padding: clamp(3rem, 7vw, 7.5rem) 0;

  .card_body {
    row-gap: clamp(2rem, 4vw, 6.25rem) !important;
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 1 calc(33.33% - (2.5rem / 1.5));
      .logo {
        width: clamp(5rem, 13vw, 13.125rem);
        height: clamp(5rem, 13vw, 13.125rem);
        background: ${({ theme }) => theme.colors.textSecondary[0]};
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.75rem;
        img {
          width: clamp(2.5rem, 6vw, 6rem);
          height: auto;
        }
      }
      .title {
        font-size: clamp(1.125rem, 2.5vw, 1.875rem);
        color: ${({ theme }) => theme.colors.textSecondary[0]};
        margin: 0 auto;
        text-align: center;
        line-height: 1.2;
        margin-bottom: 0.5rem;
      }
      .para {
        font-size: clamp(0.875rem, 1.5vw, 1.25rem);
        color: ${({ theme }) => theme.colors.textSecondary[0]} !important;
        text-align: center;
        line-height: 1.2;
      }
    }
  }

  @media (max-width: 900px) {
    .card_body {
      .card {
        flex: 0 1 calc(50% - 1.5rem);
      }
    }
  }

  @media (max-width: 600px) {
    .card_body {
      justify-content: center !important;
      .card {
        flex: 0 1 100%;
        max-width: 20rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: clamp(2rem, 5vw, 3rem) 0;

    .card_body {
      row-gap: clamp(1.5rem, 4vw, 2rem) !important;
      .card {
        .logo {
          width: clamp(4rem, 15vw, 5rem);
          height: clamp(4rem, 15vw, 5rem);
          margin-bottom: 1rem;
          img {
            width: clamp(2rem, 7vw, 2.5rem);
          }
        }
        .title {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .para {
          font-size: 0.875rem;
        }
      }
    }
  }
`;

export const SponsorshipMarketplace = styled.section`
  background: linear-gradient(225deg, #9d7fef 0%, #69b3e7 48.8%, #5ce5b0 100%);
  position: relative;
  padding: clamp(3rem, 7vw, 7.5rem) 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary[0]};
  .eyebrow {
    font-size: clamp(0.875rem, 1.5vw, 1.25rem);
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin-bottom: 1.5rem;
    img {
      height: clamp(1rem, 2vw, 1.5rem);
      width: auto;
    }
  }
  .section-title.dashedTitle {
    font-size: clamp(1.75rem, 4vw, 3.125rem);
    line-height: 1;
    padding-bottom: 1.75rem;
    margin-bottom: 1.75rem;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      right: 0;
      width: 3.5rem;
      height: 0.313rem;
      background: ${({ theme }) => theme.colors.textSecondary[0]};
      transform: translateX(-50%);
    }
  }
  .para {
    font-size: clamp(1rem, 2vw, 1.875rem);
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.textSecondary[0]} !important;
    width: min(60%, 36rem);
    margin: 0 auto;
    text-align: center;
    margin-bottom: clamp(2rem, 5vw, 4rem);
  }
  .image_block {
    img {
      margin: 0 auto;
      max-width: min(100%, 40rem);
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    .eyebrow {
      flex-wrap: wrap;
      justify-content: center;
    }
    .para {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    padding: clamp(2rem, 5vw, 3rem) 0;

    .section-title.dashedTitle {
      font-size: clamp(1.5rem, 5vw, 1.75rem);
      padding-bottom: 1.25rem;
      margin-bottom: 1.25rem;
    }

    .para {
      font-size: 1rem;
      width: 95%;
      margin-bottom: clamp(1.5rem, 4vw, 2rem);
    }
  }
`;

export const MileStoneStyles = styled.section`
  .milestone_banner {
    padding: clamp(10rem, 25vw, 22.5rem) 0;
    .milestone_container {
      margin-bottom: clamp(2.5rem, 5vw, 5rem);
    }
    .count_block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 65%;
      margin: 0 auto clamp(1.5rem, 3vw, 2rem);
      .counter {
        color: ${({ theme }) => theme.colors.primary[0]};
        font-size: clamp(2rem, 5vw, 3.75rem);
        font-weight: 600;
        line-height: 1;
        text-align: center;
        span {
          color: ${({ theme }) => theme.colors.white[0]};
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          font-weight: 400;
          display: block;
        }
      }
    }
    .milestone_title {
      font-size: clamp(1.75rem, 4vw, 3.125rem);
      line-height: 1.2;
    }
  }

  @media (max-width: 900px) {
    .milestone_banner {
      padding: clamp(8rem, 20vw, 15rem) 0;
      .count_block {
        max-width: 85%;
        flex-wrap: wrap;
        gap: clamp(1.5rem, 3vw, 2rem);
        justify-content: center;
      }
    }
  }

  @media (max-width: 600px) {
    .milestone_banner {
      padding: clamp(6rem, 18vw, 10rem) 0;
      .count_block {
        max-width: 100%;
        .counter {
          flex: 0 1 calc(50% - 1rem);
        }
      }
    }
  }

  @media (max-width: 480px) {
    .milestone_banner {
      padding: clamp(5rem, 15vw, 7rem) 0;
      .milestone_container {
        margin-bottom: clamp(2rem, 4vw, 2.5rem);
      }
      .count_block {
        gap: clamp(1rem, 3vw, 1.5rem);
        margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
        .counter {
          font-size: clamp(1.75rem, 6vw, 2rem);
          span {
            font-size: 0.875rem;
          }
        }
      }
      .milestone_title {
        font-size: clamp(1.5rem, 5vw, 1.75rem);
      }
    }
  }
`;
