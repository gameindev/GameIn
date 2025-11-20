import styled, { css } from "styled-components";

export const HeroAltStyles = styled.div`
  padding: 6em 0em;
  text-align: center;
  background: ${({ theme }) => theme.colors.textSecondary[0]};

  .logo {
    max-width: 18.75em;
    margin: 0 auto 1.5em;
    display: block;
  }

  .headline {
    font-size: 3.75em;
    line-height: 1.1;
    font-weight: 500;
  }
  .subhead {
    font-size: 1.25em;
    opacity: 0.9;
    max-width: 30em;
    font-weight: 300;
    margin: 0.75em auto 0;
  }
  .gamein-engine-banner {
    width: 10rem;
    max-width: 48em;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    margin-top: 5rem;
  }
  .search-demo {
    margin: 0 auto 1em;
    padding: 1.25em;
    max-width: 48em;
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

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75em;
  }
  .playerData {
    background: ${({ theme }) => theme.colors.bannerGrey[0]};
    border-color: #2b2d30;
  }
  .small_badge {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
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
`;

export const TwoColSection = styled.section`
  padding: 3.125rem 0;

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5em;
    align-items: center;
  }
  .section-title {
    font-size: 3.125rem;
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
    font-size: 1.875rem;
    font-weight: 300;
    a {
      font-size: 1.25rem;
      display: block;
      width: fit-content;
    }
  }
  .art {
    background: ${({ theme }) => theme.colors.textSecondary[0]};
    /* padding: 1.25em; */
    aspect-ratio: 1 / 0.8;
  }
  .art img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }

  ${({ reversed }) =>
    reversed &&
    css`
      p {
    a {
      justify-self: end;
    }
  }
      .two-col {
        grid-template-columns: 1fr 1fr;
        .text{
          text-align: right;
        }
      }
      .dashedTitle {
    &::after {
      left: unset;
      right: 0;
    }
    `}
`;

export const HowItWorksStyles = styled.section`
  padding: 4em 0 10em;
  text-align: center;
  .how-title.dashedTitle {
    text-transform: capitalize;
    font-size: 3.125rem;
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
    font-size: 1.875rem;
  }
  .video-container {
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
  }
  .how-copy {
    max-width: 46em;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

export const GridCard = styled.section`
  background: linear-gradient(225deg, #9d7fef 0%, #69b3e7 48.8%, #5ce5b0 100%);
  position: relative;
  padding: 7.5rem 0;

  .card_body {
    row-gap: 6.25rem !important;
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 1 calc(33.33% - (2.5rem / 1.5));
      .logo {
        width: 13.125rem;
        height: 13.125rem;
        background: ${({ theme }) => theme.colors.textSecondary[0]};
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.75rem;
      }
      .title {
        font-size: 1.875rem;
        color: ${({ theme }) => theme.colors.textSecondary[0]};
        /* width: 60%; */
        margin: 0 auto;
        text-align: center;
        line-height: 1.2;
        margin-bottom: 0.5rem;
      }
      .para {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.colors.textSecondary[0]} !important;
        text-align: center;
        line-height: 1.2;
      }
    }
  }
`;

export const SponsorshipMarketplace = styled.section`
  background: linear-gradient(225deg, #9d7fef 0%, #69b3e7 48.8%, #5ce5b0 100%);
  position: relative;
  padding: 7.5rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary[0]};
  .eyebrow {
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin-bottom: 1.5rem;
  }
  .section-title.dashedTitle {
    font-size: 3.125rem;
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
    font-size: 1.875rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.textSecondary[0]} !important;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 4rem;
  }
`;

export const MileStoneStyles = styled.section`
  .milestone_banner {
    padding: 22.5rem 0;
    .milestone_container {
      margin-bottom: 5rem;
    }
    .count_block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 65%;
      margin: 0 auto 2rem;
      .counter {
        color: ${({ theme }) => theme.colors.primary[0]};
        font-size: 3.75rem;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        span {
          color: ${({ theme }) => theme.colors.white[0]};
          font-size: 1.25rem;
          font-weight: 400;
          display: block;
        }
      }
    }
    .milestone_title {
      font-size: 3.125rem;
      line-height: 1.2;
    }
  }
`;
