import React from "react";
import Head from "next/head";
import { Box, H1, Panel } from "@bigcommerce/big-design";
import ActivityLog from "../components/activity-log";
import FallbackNav from "../components/fallback-nav";
import Card from "../components/card";
import withStore from "../components/withStore";
import withStoreServerSide from "../components/withStoreServerSide";

const Overview = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box padding={{ mobile: "none", tablet: "xLarge", desktop: "xxxLarge" }}>
        <Box
          paddingLeft={{ mobile: "small", tablet: "none" }}
          paddingTop={{ mobile: "small", tablet: "none" }}
        >
          <H1>Overview</H1>
          <FallbackNav activeTab="overview" />
        </Box>

        <ActivityLog />

        <Panel header="Resources">
          <Card
            header="POS Article"
            text="Need help getting started? Visit our knowledge base for answers."
            href="https://support.bigcommerce.com/"
          />
        </Panel>
      </Box>
    </>
  );
};

export default withStore(Overview);
export const getServerSideProps = withStoreServerSide();
