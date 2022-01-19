import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CreateChannel from "../components/onboarding/create-channel";
import Authorize from "../components/onboarding/authorize";
import withStore from "../components/withStore";
import withStoreServerSide from "../components/withStoreServerSide";

const Onboarding = (): JSX.Element => {
  const { query } = useRouter();
  const [authorized, setAuthorized] = useState<Boolean>(!!query.authorized);

  return (
    <>
      <Head>
        <title>Onboarding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authorized ? (
        <CreateChannel />
      ) : (
        <Authorize onContinue={setAuthorized} />
      )}
    </>
  );
};

export default withStore(Onboarding);
export const getServerSideProps = withStoreServerSide();
