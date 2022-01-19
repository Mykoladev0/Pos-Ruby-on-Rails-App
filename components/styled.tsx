import { Box, BoxProps } from "@bigcommerce/big-design";
import { theme as defaultTheme } from "@bigcommerce/big-design-theme";
import styled from "styled-components";

const StyledTabs = styled(Box)<BoxProps>`
  border-bottom: 1px solid #d9dce9;
`;

StyledTabs.defaultProps = { theme: defaultTheme };

export { StyledTabs };
