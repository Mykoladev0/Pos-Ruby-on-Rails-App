import React from "react";
import { Panel } from "@bigcommerce/big-design";
import Settings from "../catalog/settings";
import { useSettings } from "../../contexts/settings";

export default function ImportProducts(): JSX.Element {
  const { state } = useSettings();
  return (
    <Panel
      margin={{ mobile: "medium", tablet: "xLarge", desktop: "xxxLarge" }}
      header={`${state.importData ? "Import" : "Export"} products`}
    >
      <Settings />
    </Panel>
  );
}
