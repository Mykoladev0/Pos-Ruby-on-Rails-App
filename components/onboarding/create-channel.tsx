import React, { useState, useContext } from "react";
import { Box, Button, Flex, H1 } from "@bigcommerce/big-design";
import Axios from "axios";
import { useRouter } from "next/router";
import Steps from "./steps";
import Connect from "./connect";
import Settings from "./settings";
import ImportProducts from "./import-products";
import { Footer } from "./styled";
import StoreContext from "../../contexts/store";
import { useSettings } from "../../contexts/settings";

const stepComponents = {
  1: Connect,
  2: Settings,
  3: ImportProducts,
};

function CreateChannel(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { storeId, channelName } = useContext(StoreContext);
  const { state } = useSettings();

  function increaseStep(): void {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save settings data
      Axios.put(`/api/store/${storeId}`, {
        settings: state,
      });

      // Save channel data
      Axios.post("/api/channel", {
        storeId,
        channelName,
      }).then(() => router.push("/catalog?import=true"));
    }
  }

  function decreaseStep(): void {
    if (step > 1) setStep(step - 1);
  }

  const CurrentStep = stepComponents[step];

  return (
    <Flex flexDirection="column" alignItems="center" marginTop="medium">
      <H1>Create POS channel</H1>
      <Steps step={step} />
      <CurrentStep />
      <Footer>
        <Box>
          <Button disabled={step === 1} variant="subtle" onClick={decreaseStep}>
            Cancel
          </Button>
        </Box>
        <Box>
          <Button variant="primary" onClick={increaseStep}>
            {step === 3 ? "Create channel" : "Continue"}
          </Button>
        </Box>
      </Footer>
    </Flex>
  );
}

export default CreateChannel;
