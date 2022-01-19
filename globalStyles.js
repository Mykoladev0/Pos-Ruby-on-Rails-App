// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: auto !important;
    background-color: #F6F7FC;

    @media (max-width: 768px) {
      padding-bottom: 4rem;
    }
  }
`;

export default GlobalStyle;
