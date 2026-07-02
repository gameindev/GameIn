import styled from "styled-components";
import { theme } from "../../../shared/styles/theme/customTheme";

export const SearchStyles = styled.div`
  .header,
  .banner_image {
    margin: 0 0 1em;
  }

  .mantine-Grid-col {
    /* padding: calc(${theme.spacing.xs} / 3); */
  }

  .forms-fields {
    /* flex: 1; */
    flex-basis: calc(calc(60% - 0.8em));

    .input-wrapper {
      flex-basis: calc(25% - 0.8em);
    }
  }

  .switch-buttons {
    flex-direction: column;
    align-items: flex-end;
    /* flex-basis: calc(17% - 0.8em); */
  }

  .pagination {
    /* flex: 1; */
    flex-direction: column;
    /* flex-basis: calc(18% - 0.8em); */
  }

  .action-buttons {
    gap: ${theme.gap.xs};
  }

  .search-grid-results {
    align-items: stretch;
    gap: 1em;
  }

  .search-grid-card {
    flex: 1 1 calc(33.333% - 1em);
    min-width: 17.5rem;
    display: flex;
  }

  .search-grid-card > * {
    width: 100%;
  }

  .search-table-view {
    width: 100%;
    min-width: 0;
  }

  .tabGroup {
    position: relative;
    background-color: ${theme.colors.secondaryGrey[0]};
    border-radius: ${theme.radius.md};
    margin-top: 0.625em;
    padding: 1rem;
  }

  @media (max-width: 1024px) {
    form > .mantine-Group-root {
      align-items: stretch;
      gap: 1em;
    }

    .forms-fields {
      flex: 1 1 100%;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75em;

      .input-wrapper {
        flex-basis: auto;
        width: 100%;
      }
    }

    .pagination {
      flex: 1 1 auto;
      align-items: flex-start;
      flex-direction: row;
      gap: 0.75em;
    }

    .action-buttons {
      flex: 1 1 auto !important;
      justify-content: flex-end !important;
    }
  }

  @media (max-width: 768px) {
    .header {
      margin-bottom: 0.75em;
    }

    .banner_image {
      margin-bottom: 1em;
    }

    form {
      background: ${theme.colors.secondaryGrey[0]};
      border-radius: ${theme.radius.md};
      padding: 0.85rem;
      margin-bottom: 1rem;
    }

    .forms-fields {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65em;
    }

    .forms-fields .mantine-Input-input {
      min-height: 2.55rem;
      padding: 0.75rem 2rem 0.75rem 0.85rem;
      font-size: 0.9rem;
    }

    .pagination {
      width: 100%;
      justify-content: space-between;
      align-items: stretch;
    }

    .pagination > .mantine-Group-root {
      flex: 1 1 0;
      min-width: 0;
      justify-content: space-between;
      background: rgba(0,0,0,0.12);
      border-radius: ${theme.radius.md};
      padding: 0.55rem;
    }

    .pagination .mantine-Text-root {
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .pagination .mantine-SegmentedControl-root,
    .pagination .mantine-TextInput-root {
      min-width: 0;
    }

    .action-buttons {
      width: 100%;
      justify-content: stretch !important;
      flex-wrap: nowrap;
      gap: 0.65em;
    }

    .action-buttons .mantine-Button-root {
      flex: 1 1 0;
      min-width: 0;
      padding-left: 0.65rem;
      padding-right: 0.65rem;
    }

    .search-grid-results {
      width: 100%;
      gap: 0.85em;
    }

    .search-grid-card {
      flex: 1 1 100%;
      min-width: 0;
    }
  }

  @media (max-width: 460px) {
    .forms-fields {
      grid-template-columns: minmax(0, 1fr);
    }

    .pagination {
      flex-direction: column;
    }
  }
`;
