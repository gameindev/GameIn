import styled from "styled-components";
import { theme } from "../../styles/theme/customTheme";


export const BannerWrapper = styled.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.3); */
`;

export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 9.5rem;
  background-color: #4a5568;
  overflow: hidden;

  .banner_image {
    width: 100%;
    height: 100%;
    background-image: url("/banner.jpg");
    background-size: cover;
    background-position: center;
  }
`;

export const UserInformation = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background-color: ${theme.colors.secondaryGrey[0]};
  color: white;
`;

export const UserAvatar = styled.div`
  position: absolute;
  top: -7.5rem;
  left: 0rem;
  /* width: 10.625rem;
  height: 11.875rem; */
  overflow: hidden;

  .profile_avatar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.063rem solid #50565a;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const ProfileWrapper = styled.div`
  margin-left: 13rem;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;

  /* .personal_info {
    flex-grow: 1;
  } */
`;

export const UserSection = styled.div`
  .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.875rem;
    margin-bottom: 0.5rem;
  }

  .profile_name {
    font-size: 1.875rem;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${theme.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875rem;
    color: #a0aec0;
  }
`;

export const ProfileStats = styled.div`
  .profile_stats {
    display: flex;
    justify-content: flex-start;
    gap: 1.25rem;
    color: white;

    .stats_section {
      text-align: center;
      display: flex;
      align-items: center;

      .views,
      .followers,
      .joined {
        font-size: 0.625rem;
        margin: 0 0.188rem 0 0.5rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .helperText {
        font-size: 0.625rem;
        font-weight: 400;
        color: #a0aec0;
        text-transform: uppercase;
      }
    }
  }
`;

export const BadgeSection = styled.div`
  border-left: 0.063rem dotted #4a5568;
  border-right: 0.063rem dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25rem;

    svg text {
      font-family: ${theme.fontFamily};
    }
  }
`;

export const SponsorShip = styled.div`
  display: flex;
  align-items: end;
  gap: 2.5rem;
  font-size: 0.875rem;
  color: #a0aec0;
  padding: 0.5rem;
  border-right: 0.063rem dotted #4a5568;
  margin-right: auto;

  .sponsorship_text {
    font-size: 0.625rem;
    font-weight: 400;
  }

  .sponsorship_badge {
    background-color: #2b6cb0;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
