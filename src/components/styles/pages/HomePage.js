import styled from "styled-components";
import HeroSvgDecor from "../../../assets/homepage/bottom-decor.png";

export const HeroSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 8rem 0;

  .left_section {
    width: 100%;
    height: 100%;

    .heroContent {
      width: 100%;
      height: 100%;

      .banner_title {
        font-family: ${({ theme }) => theme.typography.exo2.semiBold};
        font-size: 3.125rem;
        font-weight: 600;
        line-height: 1.1;
        margin: 1.25rem 0;
      }
      .banner_subTitle {
        font-family: ${({ theme }) => theme.typography.exo2.light};
        font-size: 2.128rem;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 1.875rem;
        width: 65%;
      }
      .cta_container {
        font-family: ${({ theme }) => theme.typography.exo2.medium};
        font-weight: 400;
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        width: 13rem;
      }
    }
  }

  .right_section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
  }
`;

export const FlexCard = styled.div`
  display: flex;
  gap: 6.25rem;
  padding-bottom: 2.5rem;
  margin-bottom: 3rem;

  .creator_card {
    padding: 3.75rem;
    background: ${({ theme }) => theme.baseColors.brandPrimary};
    border-radius: 0.125rem;
    flex: 0 0 calc(50% - 6.25rem / 2);
    min-height: 36rem;
  }

  .sponsor_card {
    padding: 3.75rem;
    background: ${({ theme }) => theme.baseColors.brandSecondary};
    border-radius: 0.125rem;
    flex: 0 0 calc(50% - 6.25rem / 2);
    min-height: 36rem;
  }
`;

export const CardTitle = styled.h2`
  font-size: 2.188rem;
  font-family: ${({ theme }) => theme.typography.exo2.extraBold};
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    width: 3.5rem;
    height: 0.125rem;
    background: #ffffff;
    left: 0;
  }
`;

export const CardSubtitle = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.exo2.bold};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.875rem;
`;

export const TwocolumnLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1rem;
`;

export const PresentationCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-radius: 0.125rem;
  background: ${({ theme }) => theme.colors.bgGray};
  text-align: left;
  gap: 3rem;

  .presentation_cardContent {
    flex: 0 0 40%;
    padding: 3.25rem 0 3.25rem 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .presentation_cardTitle {
      font-size: 2.188rem;
      font-family: ${({ theme }) => theme.typography.exo2.medium};
      font-weight: 400;
      line-height: 1;
      margin-bottom: 2.75rem;
      color: ${({ theme }) => theme.colors.text};
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -1.5rem;
        width: 3.3rem;
        height: 0.125rem;
        background: ${({ theme }) => theme.baseColors.brandPrimary};
        left: 0;
      }

      span {
        font-family: ${({ theme }) => theme.typography.exo2.extraBold};
        font-weight: 900;
        color: ${({ theme }) => theme.baseColors.brandPrimary};
        display: block;
      }
    }

    button:not(.readmore button) {
      margin-top: 1rem;
    }
  }

  &.odd {
    flex-direction: row-reverse;
    text-align: right;

    .presentation_cardContent {
      padding: 3.25rem 4.5rem 3.25rem 0;
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
      margin-bottom: 15rem;

      &::after {
        content: "";
        position: absolute;
        bottom: -15rem;
        left: -8rem;
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

export const MileStone = styled.div`
  .milestone_banner {
    position: relative;
    margin: 7.5rem 0;
    background: linear-gradient(
      225deg,
      #9d7fef 0%,
      #69b3e7 48.8%,
      #5ce5b0 100%
    );
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
    /* clip-path: polygon(calc(100% - 28.5px) calc(100% - 0.90000000000001px), 32.2px calc(100% - 0.90000000000001px), 32.2px calc(100% - 0.90000000000001px), 26.973px calc(100% - 1.321px), 22.016px calc(100% - 2.54px), 17.395px calc(100% - 4.491px), 13.176px calc(100% - 7.108px), 9.425px calc(100% - 10.325px), 6.208px calc(100% - 14.076px), 3.591px calc(100% - 18.295px), 1.64px calc(100% - 22.916px), 0.421px calc(100% - 27.873px), 5.3248111102418E-31px calc(100% - 33.1px), 0px 87.4px, 0px 87.4px, 0.1942px 84.5609px, 0.7616px 81.8232px, 1.6794px 79.2163px, 2.9248px 76.7696px, 4.475px 74.5125px, 6.3072px 72.4744px, 8.3986px 70.6847px, 10.7264px 69.1728px, 13.2678px 67.9681px, 16px 67.1px, calc(100% - 30.8px) 0.700002px, calc(100% - 30.8px) 0.700002px, calc(100% - 26.1225px) 0.019601458px, calc(100% - 21.568px) 0.212801024px, calc(100% - 17.2235px) 1.211200686px, calc(100% - 13.176px) 2.946400432px, calc(100% - 9.5125px) 5.35000025px, calc(100% - 6.3200000000001px) 8.353600128px, calc(100% - 3.6855px) 11.888800054px, calc(100% - 1.696px) 15.887200016px, calc(100% - 0.43850000000003px) 20.280400002px, calc(100% - 5.6843418860808E-14px) 25px, calc(100% - 0px) calc(100% - 29.4px), calc(100% - 0px) calc(100% - 29.4px), calc(100% - 0.37139999999999px) calc(100% - 24.7869px), calc(100% - 1.4471999999999px) calc(100% - 20.4072px), calc(100% - 3.1698px) calc(100% - 16.3203px), calc(100% - 5.4816px) calc(100% - 12.5856px), calc(100% - 8.325px) calc(100% - 9.2625px), calc(100% - 11.6424px) calc(100% - 6.4104px), calc(100% - 15.3762px) calc(100% - 4.0887px), calc(100% - 19.4688px) calc(100% - 2.3568px), calc(100% - 23.8626px) calc(100% - 1.2741px), calc(100% - 28.5px) calc(100% - 0.90000000000001px)); */
    // max-width: 120rem;
    // margin: 0 auto;
    // clip-path: polygon(0% 0%, 32% 0%, 37% 6%, 63% 6%, 68% 0%, 100% 0%, 100% 100%, 68% 100%, 63% 93%, 37% 93%, 32% 100%, 0% 100%);
    // clip-path: path("M 0 100 c 150 0 120 -75 200 -75 C 280 25 250 100 400 100 L400 1000 0 1000 Z");

    /* &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        225deg,
        #9d7fef 0%,
        #69b3e7 48.8%,
        #5ce5b0 100%
      );
    } */

    .milestone_container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 5.625rem;
      max-width: 70rem;
      margin: 0 auto;

      .startJourney {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          margin-bottom: 1.25rem;
        }

        h3 {
          font-size: 2.188rem;
          font-family: ${({ theme }) => theme.typography.exo2.extraBold};
          font-weight: 900;
          line-height: 1;
          color: ${({ theme }) => theme.colors.text};
          margin-bottom: 0.125rem;
        }

        p {
          font-size: 1rem;
          font-family: ${({ theme }) => theme.typography.exo2.medium};
          font-weight: 400;
          line-height: 1;
          color: ${({ theme }) => theme.colors.text};
        }
      }

      .counts_block {
        display: flex;
        align-items: center;
        margin-top: 2.75rem;
        width: 100%;
        justify-content: space-between;

        .count {
          font-size: 3.75rem;
          font-family: ${({ theme }) => theme.typography.exo2.medium};
          font-weight: 400;
          color: ${({ theme }) => theme.colors.text};
        }

        span {
          font-size: 0.875rem;
          font-family: ${({ theme }) => theme.typography.exo2.medium};
          font-weight: 400;
          color: ${({ theme }) => theme.colors.text};
          text-transform: uppercase;
        }
      }

      button {
        margin-top: 1.875rem;
      }
    }
  }
`;
