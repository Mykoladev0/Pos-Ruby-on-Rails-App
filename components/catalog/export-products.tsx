import React, { useEffect, useState } from "react";
import { Box, H3, Panel, Small, Text, Modal } from "@bigcommerce/big-design";
import { useRouter } from "next/router";
import Progress from "./progress";
import Settings from "./settings";

export default function ExportProducts() {
  const [exportInProgress, setExportInProgress] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { query } = useRouter();

  function startExport(): void {
    // TODO: Actually run import here
    setExportInProgress(true);
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
    if (query.import) setExportInProgress(true);
  }, [query.import]);

  return (
    <Panel
      header="Export products"
      action={{
        text: "Export",
        variant: "secondary",
        onClick: showEditModal,
        disabled: exportInProgress,
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
      {exportInProgress ? (
        <Progress
          useImport={false}
          onCancel={() => setExportInProgress(false)}
          onRetry={() => {
            setExportInProgress(false);
            setShowModal(true);
          }}
        />
      ) : (
        <Box marginTop="xxLarge">
          <H3>Last Export</H3>
          <Small>Started on April 30, 2020 7:48 AM</Small>
          <Text>11 products were matched, 0 products created or updated.</Text>
        </Box>
      )}
      <Modal
        actions={[
          { text: "Cancel", variant: "subtle", onClick: closeEditModal },
          { text: "Export", onClick: startExport },
        ]}
        header="Export products"
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
