import React from "react";
import PropTypes from "prop-types";
import { Text, Modal } from "@bigcommerce/big-design";
import { CheckCircleIcon } from "@bigcommerce/big-design-icons";
import { List } from "./styled";

function Authorize({ onContinue }): JSX.Element {
  return (
    <Modal
      header="Authorize Sample POS"
      isOpen={true}
      actions={[
        { text: "Cancel", variant: "subtle", onClick: () => null },
        { text: "Continue", onClick: onContinue },
      ]}
    >
      <Text>
        To get started you must authorize the Sample POS app to access the
        following details within your BigCommerce store.
      </Text>
      <List>
        <li>
          <CheckCircleIcon color="success" /> Read and Write Catalog
        </li>
        <li>
          <CheckCircleIcon color="success" /> Read Customers
        </li>
        <li>
          <CheckCircleIcon color="success" /> Read Orders
        </li>
        <li>
          <CheckCircleIcon color="success" /> Read Store Profile
        </li>
      </List>
      <Text>
        These details are shared securely with the app and your password will
        not be shared.
      </Text>
    </Modal>
  );
}

Authorize.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

export default Authorize;
