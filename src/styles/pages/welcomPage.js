import styled from "styled-components";

export const HeroSectionStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  height: calc(100vh - 3.125rem);

  .heroContent {
    width: 60%;

    .heroTitle {
      font-size: 3.125rem;
    }
    .heroSubTitle {
      font-size: 2.128rem;
    }
  }

  .scroll_down {
    all: unset;
    position: absolute;
    bottom: 10rem;
    left: 50%;
    font-weight: 800;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      border-right: 4px solid #ffffff;
      border-bottom: 4px solid #ffffff;
      width: 0.625rem;
      height: 0.625rem;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%) rotate(-315deg);
    }
  }
`;

export const FlexCardStyles = styled.div`
  display: flex;
  gap: 6.25rem;
  padding-bottom: 2.5rem;
  margin-bottom: 3rem;
  scroll-margin: 6.25rem;

  .creator_card, .sponsor_card{
    padding: 3.75rem;
    border-radius: 0.125rem;
    flex: 0 0 calc(50% - 6.25rem / 2);
    min-height: 36rem;
  }

  .creator_card {
    background: ${({ theme }) => theme.colors.primary[0]};
  }

  .sponsor_card {
    background: ${({ theme }) => theme.colors.secondary[0]};
  }

  .flexTitle{
    font-size: 2.188rem;
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
  }
`;

export const PresentationStyles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-radius: 0.125rem;
  background: ${({ theme }) => theme.colors.textSecondary[0]};
  gap: 3rem;

  .presentation_cardContent {
    flex: 0 0 40%;
    padding: 3.25rem 0 3.25rem 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .presentation_cardTitle {
      font-size: 2.188rem;
      font-weight: 400;
      line-height: 1;
      margin-bottom: 2.75rem;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -1.5rem;
        width: 3.3rem;
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