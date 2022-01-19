import React from "react";
import Head from "next/head";
import { Box, H1 } from "@bigcommerce/big-design";
import FallbackNav from "../components/fallback-nav";
import ImportLog from "../components/catalog/import-log";
import Notice from "../components/catalog/notice";
import ImportProducts from "../components/catalog/import-products";
import ImportAlert from "../components/catalog/import-alert";
import ExportAlert from "../components/catalog/export-alert";
import ExportProducts from "../components/catalog/export-products";
import ExportLog from "../components/catalog/export-log";
import withStore from "../components/withStore";
import withStoreServerSide from "../components/withStoreServerSide";
import { useSettings } from "../contexts/settings";

const Catalog = (): JSX.Element => {
  const {
    state: { importData: useImport },
  } = useSettings();

  // Do not display the page until it is not clear if it's import or export
  if (useImport === undefined) return null;

  return (
    <>
      <Head>
        <title>Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box padding={{ mobile: "none", tablet: "xLarge", desktop: "xxxLarge" }}>
        <Box
          paddingLeft={{ mobile: "small", tablet: "none" }}
          paddingTop={{ mobile: "small", tablet: "none" }}
        >
          <H1>{useImport ? "Import" : "Export"}</H1>
          <FallbackNav activeTab="catalog" />
        </Box>
        {useImport ? (
          <>
            <ImportAlert />
            <Notice />
            <ImportProducts />
            <ImportLog />
          </>
        ) : (
          <>
            <ExportAlert />
            <Notice />
            <ExportProducts />
            <ExportLog />
          </>
        )}
      </Box>
    </>
  );
};

export default withStore(Catalog);
export const getServerSideProps = withStoreServerSide();
