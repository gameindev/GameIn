import styled from "styled-components";
import { theme } from "../theme/customTheme";

export const SearchStyles = styled.div`
    .header, .banner_image{
        margin: 0 0 1em;
    }

    .mantine-Grid-col{
        /* padding: calc(${theme.spacing.xs} / 3); */
    }

    .forms-fields{
        /* flex: 1; */
        flex-basis: calc(calc(60% - 0.8em));

        .input-wrapper{
            flex-basis: calc(25% - 0.8em);
        }
    }

    .switch-buttons{
        flex-direction: column;
        align-items: flex-end;
        /* flex-basis: calc(17% - 0.8em); */
    }

    .pagination{
        /* flex: 1; */
        flex-direction: column;
        /* flex-basis: calc(18% - 0.8em); */
    }
`
