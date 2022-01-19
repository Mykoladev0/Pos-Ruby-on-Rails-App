import React from "react";
import {
  Box,
  Button,
  Dropdown,
  Flex,
  H3,
  ProgressBar,
  Small,
} from "@bigcommerce/big-design";
import { MoreHorizIcon } from "@bigcommerce/big-design-icons";

type Props = {
  onCancel: () => void;
  onRetry: () => void;
  useImport: boolean;
};

function Progress({ onCancel, onRetry, useImport }: Props) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <Box marginTop="xxLarge">
      <H3>{useImport ? "Import" : "Export"} in progress</H3>
      <Small>Started on {new Date().toLocaleString("en-US", options)}</Small>
      <ProgressBar />
      <Flex justifyContent="space-between">
        <Small>
          {useImport ? "Importing" : "Exporting"} 37 of 2863 products
        </Small>
        <Dropdown
          items={[
            {
              content: `Retry ${useImport ? "import" : "export"}`,
              onItemClick: onRetry,
            },
            {
              content: `Cancel ${useImport ? "import" : "export"}`,
              onItemClick: onCancel,
            },
          ]}
          toggle={<Button variant="subtle" iconOnly={<MoreHorizIcon />} />}
        />
      </Flex>
    </Box>
  );
}

export default Progress;
