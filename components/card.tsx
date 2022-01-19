import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  H4,
  Link,
  Text,
  FlexItem,
} from "@bigcommerce/big-design";
import { ChevronRightIcon } from "@bigcommerce/big-design-icons";
import PropTypes from "prop-types";

export default function Card(props) {
  return (
    <Link href={props.href} target="_blank" rel="noreferrer">
      <Box
        border="box"
        borderRadius="normal"
        padding="medium"
        display="inline-flex"
      >
        <Grid>
          <GridItem>
            <Flex>
              <FlexItem flexGrow={1}>
                <H4>{props.header}</H4>
              </FlexItem>
              <FlexItem flexGrow={0}>
                <ChevronRightIcon size="xxLarge" />
              </FlexItem>
            </Flex>
          </GridItem>
          <GridItem>
            <Text>{props.text}</Text>
          </GridItem>
        </Grid>
      </Box>
    </Link>
  );
}

Card.propTypes = {
  href: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
};
