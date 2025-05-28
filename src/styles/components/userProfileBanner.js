import styled from "styled-components";
import { theme } from "./../theme/customTheme";

export const BannerWrapper = styled.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
  padding: 24px;
  background-color: ${theme.colors.secondaryGrey[0]};
  color: white;
`;

export const UserAvatar = styled.div`
  position: absolute;
  top: -6rem;
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
    /* clip-path: polygon(
      170.499px 126.357px,
      170.499px 62.592px,
      170.499px 62.592px,
      170.457889px 61.0291316px,
      170.335112px 59.4748888px,
      170.131503px 57.9323652px,
      169.847896px 56.4046544px,
      169.485125px 54.89485px,
      169.044024px 53.4060456px,
      168.525427px 51.9413348px,
      167.930168px 50.5038112px,
      167.259081px 49.0965684px,
      166.513px 47.7227px,
      166.513px 47.7227px,
      165.695729px 46.3899766px,
      164.812032px 45.1055568px,
      163.864183px 43.8717062px,
      162.854456px 42.6906904px,
      161.785125px 41.564775px,
      160.658464px 40.4962256px,
      159.476747px 39.4873078px,
      158.242248px 38.5402872px,
      156.957241px 37.6574294px,
      155.624px 36.841px,
      100.374px 4.95598px,
      100.374px 4.95598px,
      98.9993267px 4.210497004px,
      97.5913456px 3.539975272px,
      96.1531449px 2.945241688px,
      94.6878128px 2.427123136px,
      93.1984375px 1.9864465px,
      91.6881072px 1.624038664px,
      90.1599101px 1.340726512px,
      88.6169344px 1.137336928px,
      87.0622683px 1.014696796px,
      85.499px 0.973633px,
      85.499px 0.973633px,
      83.935756px 1.014696796px,
      82.381104px 1.137336928px,
      80.838134px 1.340726512px,
      79.309936px 1.624038664px,
      77.7996px 1.9864465px,
      76.310216px 2.427123136px,
      74.844874px 2.945241688px,
      73.406664px 3.539975272px,
      71.998676px 4.210497004px,
      70.624px 4.95598px,
      15.374px 36.841px,
      15.374px 36.841px,
      14.04071296px 37.6574023px,
      12.75568368px 38.5402384px,
      11.52117992px 39.4872421px,
      10.33946944px 40.4961472px,
      9.21282px 41.5646875px,
      8.14349936px 42.6905968px,
      7.13377528px 43.8716089px,
      6.18591552px 45.1054576px,
      5.30218784px 46.3898767px,
      4.48486px 47.7226px,
      4.48486px 47.7226px,
      3.738724812px 49.0964712px,
      3.067610456px 50.5037216px,
      2.472346744px 51.9412564px,
      1.953763488px 53.4059808px,
      1.5126905px 54.8948px,
      1.149957592px 56.4046192px,
      0.866394576px 57.9323436px,
      0.662831264px 59.4748784px,
      0.540097468px 61.0291288px,
      0.499023px 62.592px,
      0.499023px 126.357px,
      0.499023px 126.357px,
      0.540097468px 127.919752px,
      0.662831264px 129.473936px,
      0.866394576px 131.016444px,
      1.149957592px 132.544168px,
      1.5126905px 134.054px,
      1.953763488px 135.542832px,
      2.472346744px 137.007556px,
      3.067610456px 138.445064px,
      3.738724812px 139.852248px,
      4.48486px 141.226px,
      4.48486px 141.226px,
      5.30218784px 142.558883px,
      6.18591552px 143.843424px,
      7.13377528px 145.077361px,
      8.14349936px 146.258432px,
      9.21282px 147.384375px,
      10.33946944px 148.452928px,
      11.52117992px 149.461829px,
      12.75568368px 150.408816px,
      14.04071296px 151.291627px,
      15.374px 152.108px,
      70.624px 183.993px,
      70.624px 183.993px,
      71.998676px 184.738483px,
      73.406664px 185.408984px,
      74.844874px 186.003681px,
      76.310216px 186.521752px,
      77.7996px 186.962375px,
      79.309936px 187.324728px,
      80.838134px 187.607989px,
      82.381104px 187.811336px,
      83.935756px 187.933947px,
      85.499px 187.975px,
      85.499px 187.975px,
      87.0622683px 187.933947px,
      88.6169344px 187.811336px,
      90.1599101px 187.607989px,
      91.6881072px 187.324728px,
      93.1984375px 186.962375px,
      94.6878128px 186.521752px,
      96.1531449px 186.003681px,
      97.5913456px 185.408984px,
      98.9993267px 184.738483px,
      100.374px 183.993px,
      155.624px 152.108px,
      155.624px 152.108px,
      156.957241px 151.291627px,
      158.242248px 150.408816px,
      159.476747px 149.461829px,
      160.658464px 148.452928px,
      161.785125px 147.384375px,
      162.854456px 146.258432px,
      163.864183px 145.077361px,
      164.812032px 143.843424px,
      165.695729px 142.558883px,
      166.513px 141.226px,
      166.513px 141.226px,
      167.259081px 139.852248px,
      167.930168px 138.445064px,
      168.525427px 137.007556px,
      169.044024px 135.542832px,
      169.485125px 134.054px,
      169.847896px 132.544168px,
      170.131503px 131.016444px,
      170.335112px 129.473936px,
      170.457889px 127.919752px,
      170.499px 126.357px
    ); */

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const ProfileWrapper = styled.div`
  margin-left: 11.625rem;
  flex: 1;
  display: flex;
  /* align-items: center; */
  justify-content: center;

  .infoSection {
    flex-grow: 1;

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
  }

  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25rem;
    border-left: 1px solid #4a5568;
    border-right: 1px solid #4a5568;
  }

  .sponsorship {
    display: flex;
    align-items: end;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #a0aec0;
    padding: 0 1.5rem;
    border-right: 1px solid #4a5568;
    margin-right: 1rem;

    .sponsorship_text {
      font-size: 0.625rem;
      font-weight: 400;
    }

    .sponsorship_badge {
      background-color: #2b6cb0;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;

  .action_button {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #4a5568;
    color: white;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2d3748;
    }
  }
`;
