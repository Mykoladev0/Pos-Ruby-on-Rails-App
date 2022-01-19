import React from "react";
import Head from "next/head";
import { Box, H1 } from "@bigcommerce/big-design";
import FallbackNav from "../components/fallback-nav";
import Connect from "../components/settings/connect";
import Inventory from "../components/settings/inventory";
import withStore from "../components/withStore";
import withStoreServerSide from "../components/withStoreServerSide";

const Settings = (): JSX.Element => (
  <>
    <Head>
      <title>Settings</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Box padding={{ mobile: "none", tablet: "xLarge", desktop: "xxxLarge" }}>
      <Box
        paddingLeft={{ mobile: "small", tablet: "none" }}
        paddingTop={{ mobile: "small", tablet: "none" }}
      >
        <H1>Settings</H1>
        <FallbackNav activeTab="settings" />
      </Box>
      <Connect />
      <Inventory />
    </Box>
  </>
);

export default withStore(Settings);
export const getServerSideProps = withStoreServerSide();
