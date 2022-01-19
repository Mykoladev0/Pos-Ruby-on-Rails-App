import { Box, BoxProps } from "@bigcommerce/big-design";
import { theme as defaultTheme } from "@bigcommerce/big-design-theme";
import styled from "styled-components";

const StyledFooter = styled(Box)<BoxProps>`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 1;
  background-color: #fff;
  height: 4rem;
  border-top: 1px solid #d9dce9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 4rem;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0;
  }
`;

StyledFooter.defaultProps = { theme: defaultTheme };

export { StyledFooter };
