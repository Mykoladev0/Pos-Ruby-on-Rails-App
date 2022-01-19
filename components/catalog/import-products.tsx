import React, { useEffect, useState } from "react";
import { Box, H3, Panel, Small, Text, Modal } from "@bigcommerce/big-design";
import { useRouter } from "next/router";
import Progress from "./progress";
import Settings from "./settings";

export default function ImportProducts() {
  const [importInProgress, setImportInProgress] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { query } = useRouter();

  function startImport(): void {
    // TODO: Actually run import here
    setImportInProgress(true);
    setShowModal(false);
  }

  function showEditModal(): void {
    setShowModal(true);
  }

  function closeEditModal(): void {
    setShowModal(false);
  }

  useEffect(() => {
    // Check the query parameter to see if the import should be running
    if (query.import) setImportInProgress(true);
  }, [query.import]);

  return (
    <Panel
      header="Import products"
      action={{
        text: "Import",
        variant: "secondary",
        onClick: showEditModal,
        disabled: importInProgress,
      }}
    >
      <Small>
        All products in [POS] Register for location “Main Street” will be
        created in your BigCommerce catalog, if not present there.
      </Small>
      <Small>
        Pre-existing products core product details, product image and inventory
        levels will be updated to match the [POS] register product data.
      </Small>
      {importInProgress ? (
        <Progress
          useImport
          onCancel={() => setImportInProgress(false)}
          onRetry={() => {
            setImportInProgress(false);
            setShowModal(true);
          }}
        />
      ) : (
        <Box marginTop="xxLarge">
          <H3>Last import</H3>
          <Small>Started on April 30, 2020 7:48 AM</Small>
          <Text>11 products were matched, 0 products created or updated.</Text>
        </Box>
      )}
      <Modal
        actions={[
          { text: "Cancel", variant: "subtle", onClick: closeEditModal },
          { text: "Import", onClick: startImport },
        ]}
        header="Import products"
        isOpen={showModal}
        onClose={closeEditModal}
        closeOnEscKey={true}
        closeOnClickOutside={true}
      >
        <Settings />
      </Modal>
    </Panel>
  );
}
