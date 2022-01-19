import React from "react";
import { Badge, Button, H2, Panel, Text } from "@bigcommerce/big-design";
import { useRouter } from "next/router";
import { PanelHeader } from "./styled";

export default function ImportNotice() {
  const { push } = useRouter();

  const openSettings = (): void => {
    push("/settings");
  };

  return (
    <Panel>
      <PanelHeader>
        <header>
          <H2>Keep inventory up to date</H2>
          <Badge variant="success" label="enabled" />
          <Badge variant="secondary" label="Use POS inventory" />
        </header>
        <Button variant="secondary" onClick={openSettings} mobileWidth="auto">
          Edit
        </Button>
      </PanelHeader>
      <Text>Product inventory levels will be copied from POS every 5mins.</Text>
    </Panel>
  );
}
