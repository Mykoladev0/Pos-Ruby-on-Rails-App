import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Flex } from "@bigcommerce/big-design";
import {
  CheckCircleIcon,
  RemoveCircleOutlineIcon,
} from "@bigcommerce/big-design-icons";
import { Step, StepDivider } from "./styled";

const steps = ["Connect with POS", "Channel settings", "Sync products"];

function Steps({ step }): JSX.Element {
  return (
    <Flex
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="center"
      marginTop="medium"
    >
      {steps.map((stepText, index) => (
        <Fragment key={stepText}>
          <Step>
            {index + 1 < step ? (
              <CheckCircleIcon color="success" />
            ) : (
              <RemoveCircleOutlineIcon
                color={index + 1 === step ? "primary" : "secondary"}
              />
            )}
            {stepText}
          </Step>
          {index !== steps.length - 1 && <StepDivider />}
        </Fragment>
      ))}
    </Flex>
  );
}

Steps.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Steps;
