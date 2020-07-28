import { createGlobalStyle } from "styled-components";

import theme from "./theme";

export default createGlobalStyle`

  html {
    text-align: center;
    background-color: ${theme.colors.mainBackground};
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;
