import styled from "styled-components";
import { theme } from "../styles/theme/customTheme";
import ReusableModal from "./Modals";
import EditAvatar from "../../features/edit-avatar/pages/EditAvatar";

export const Banner = styled.div`
    position: relative;
    width: 100%;
    height: ${({ size }) => size};
    background-color: #4a5568;
    overflow: ${({ size }) => (size === "auto" ? "unset" : "hidden")};

    .banner_image {
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.secondaryGrey[0]};
    }

    .action {
        position: absolute;
        top: 1em;
        right: 1.25em;
    }
`;

export default function CoverBanner({ coverImage, controls, size = "9.5em" }) {
    return (
        <Banner size={size}>
            <div className="banner_overlay" />
            <div className="banner_image">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt="Cover"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.colors.white[0],
                        }}
                    >
                        No Cover Image
                    </div>
                )}
            </div>
            {controls && (
                <div className="action">
                    <ReusableModal title={"Update Cover Screen"}>
                        {({ close }) => <EditAvatar type="cover" close={close} />}
                    </ReusableModal>
                </div>
            )}
        </Banner>
    )
}