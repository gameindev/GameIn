import styled from "styled-components";

export const HeroSectionStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  height: calc(100vh - 5.188em);

  .heroContent {
    width: 60%;

    img{
      max-width: 22.5em;
    }

    .heroTitle {
      font-size: 3.125em;
    }
    .heroSubTitle {
      font-size: 2.128em;
    }
  }

  .scroll_down {
    all: unset;
    position: absolute;
    bottom: 10em;
    left: 50%;
    font-weight: 800;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      border-right: 0.25emsolid #ffffff;
      border-bottom: 0.25emsolid #ffffff;
      width: 0.625em;
      height: 0.625em;
      bottom: -1em;
      left: 50%;
      transform: translateX(-50%) rotate(-315deg);
    }
  }
`;

export const FlexCardStyles = styled.div`
  display: flex;
  gap: 6.25em;
  padding-bottom: 2.5em;
  margin-bottom: 3em;
  scroll-margin: 6.25em;

  .creator_card, .sponsor_card{
    padding: 3.75em;
    border-radius: 0.125em;
    flex: 0 0 calc(50% - 6.25em/ 2);
    min-height: 36em;
  }

  .creator_card {
    background: ${({ theme }) => theme.colors.primary[0]};

    .banner_img{
      max-width: 10em;
    }
  }

  .sponsor_card {
    background: ${({ theme }) => theme.colors.secondary[0]};
    .banner_img{
      max-width: 12.938em;
    }
  }

  .flexTitle{
    font-size: 2.188em;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: -1em;
        width: 3.5em;
        height: 0.125em;
        background: #ffffff;
        left: 0;
    }
  }
`;

export const PresentationStyles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
  border-radius: 0.125em;
  background: ${({ theme }) => theme.colors.textSecondary[0]};
  gap: 3em;

  .presentation_cardContent {
    flex: 0 0 40%;
    padding: 3.25em0 3.25em4.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .presentation_cardTitle {
      font-size: 2.188em;
      font-weight: 400;
      line-height: 1;
      margin-bottom: 2.75em;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -1.5em;
        width: 3.3em;
        height: 0.125em;
        background: ${({ theme }) => theme.colors.primary[0]};
        left: 0;
      }

      span {
        font-weight: 900;
        color: ${({ theme }) => theme.colors.primary};
        display: block;
      }
    }
  }

  .presentation_img{
    flex-basis: 60%;
    img{
      height: 100%;
      object-fit: cover;
    }
  }

  &.odd {
    flex-direction: row-reverse;
    text-align: right;

    .presentation_cardContent {
      padding: 3.25em4.5em3.25em0;
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
`;

export const MileStoneStyles = styled.div`
  .milestone_banner {
    position: relative;
    margin: 7.5em0;
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
      padding: 5.625em;
      max-width: 70em;
      margin: 0 auto;

      .startJourney {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          margin-bottom: 1.25em;
          max-width: 18.75em;
        }

        h3 {
          color: ${({ theme }) => theme.colors.textWhite[0]};
          font-size: 2.188em;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 0.125em;
        }

        p {
          color: ${({ theme }) => theme.colors.textWhite[0]};
          font-size: 1em;
          font-weight: 400;
          line-height: 1;
        }
      }

      .counts_block {
        display: flex;
        align-items: center;
        margin-top: 2.75em;
        width: 100%;
        justify-content: space-between;

        .count {
          color: ${({ theme }) => theme.colors.textWhite[0]};
          font-size: 3.75em;
          font-weight: 400;
        }

        span {
          color: ${({ theme }) => theme.colors.textWhite[0]};
          font-size: 0.875em;
          font-weight: 400;
          text-transform: uppercase;
        }
      }

      button {
        margin-top: 1.875em;
      }
    }
  }
`;