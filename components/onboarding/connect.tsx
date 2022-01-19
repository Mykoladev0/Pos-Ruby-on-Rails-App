import React, { useState } from "react";
import { Panel, H2, Text, Button, Message } from "@bigcommerce/big-design";
import { PanelHeader } from "./styled";

export default function Connect(): JSX.Element {
  const [connected, setConnected] = useState<boolean>(false);

  return (
    <Panel
      margin={{ mobile: "medium", tablet: "xLarge", desktop: "xxxLarge" }}
      marginBottom="xxLarge"
    >
      <PanelHeader>
        <img src="/images/square-pos-logo.svg" />
        <H2>POS</H2>
      </PanelHeader>
      <Text>
        Connect your POS account with BigCommerce to continue setting up your
        channel.
      </Text>
      {connected ? (
        <Message
          header="You’ve successfully connected with POS"
          messages={[
            {
              text: "Connected as myaccount@email.com",
              link: {
                text: "Change",
                href: "#",
              },
            },
          ]}
          onClose={() => null}
        />
      ) : (
        <Button onClick={() => setConnected(true)} variant="primary">
          Open POS to connect
        </Button>
      )}
    </Panel>
  );
}
