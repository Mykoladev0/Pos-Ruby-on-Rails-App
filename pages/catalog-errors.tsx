import React, { useState } from "react";
import Head from "next/head";
import { Box, Button, Flex, H1, Table, Panel } from "@bigcommerce/big-design";
import { ChevronLeftIcon } from "@bigcommerce/big-design-icons";
import { useRouter } from "next/router";
import withStore from "../components/withStore";
import withStoreServerSide from "../components/withStoreServerSide";
import { useSettings } from "../contexts/settings";

const data = [
  { id: "WHGK7D6E4LDXANIEPU2I7ROJ1", error: "Error message here." },
  { id: "WHGK7D6E4LDXANIEPU2I7ROJ2", error: "Error message here." },
  { id: "WHGK7D6E4LDXANIEPU2I7ROJ3", error: "Error message here." },
  { id: "WHGK7D6E4LDXANIEPU2I7ROJ4", error: "Error message here." },
];

const columns = [
  { header: "POS ID", hash: "id", render: ({ id }) => id },
  { header: "Error", hash: "error", render: ({ error }) => error },
];

export const CatalogErrors = (): JSX.Element => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOptions] = useState([5, 10, 20]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const {
    state: { importData },
  } = useSettings();

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  return (
    <>
      <Head>
        <title>{importData ? "Import" : "Export"} Errors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box padding={{ mobile: "none", tablet: "xLarge", desktop: "xxxLarge" }}>
        <Button
          variant="subtle"
          iconLeft={<ChevronLeftIcon />}
          onClick={() => router.push("/catalog")}
        >
          {importData ? "Import" : "Export"}
        </Button>

        <Flex justifyContent="space-between" alignItems="flex-start">
          <H1>Last {importData ? "import" : "export"}’s error log</H1>
          <Button variant="secondary">Download</Button>
        </Flex>
      </Box>
      <Panel
        marginHorizontal={{
          mobile: "none",
          tablet: "xLarge",
          desktop: "xxxLarge",
        }}
      >
        <Table
          columns={columns}
          items={data}
          stickyHeader
          pagination={{
            currentPage,
            totalItems: data.length,
            onPageChange: setCurrentPage,
            itemsPerPageOptions,
            onItemsPerPageChange,
            itemsPerPage,
          }}
        />
      </Panel>
    </>
  );
};

export default withStore(CatalogErrors);
export const getServerSideProps = withStoreServerSide();
