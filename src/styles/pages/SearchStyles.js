import styled from "styled-components";
import { theme } from "../theme/customTheme";

export const SearchStyles = styled.div`
    .header, .banner_image{
        margin: 0 0 1rem;
    }

    .mantine-Grid-col{
        /* padding: calc(${theme.spacing.xs} / 3); */
    }

    .forms-fields{
        flex-basis: calc(calc(65% - 0.8rem));

        .input-wrapper{
            flex-basis: calc(25% - 0.8rem);
        }
    }

    .switch-buttons{
        flex-direction: column;
        flex-basis: calc(17% - 0.8rem);
    }

    .pagination{
        flex-direction: column;
        flex-basis: calc(18% - 0.8rem);
    }
`
