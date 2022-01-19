import React, { useState, useContext } from "react";
import { Message } from "@bigcommerce/big-design";
import StoreContext from "../../contexts/store";

function ExportAlert() {
  const [show, setShow] = useState<boolean>(true);
  const { storeId } = useContext(StoreContext);

  if (!show) return null;

  return (
    <Message
      type="warning"
      messages={[
        {
          text: `There were errors during the last export. For more information `,
          link: {
            text: "open the log",
            href: `/catalog-errors?storeId=${storeId}`,
          },
        },
      ]}
      marginBottom="medium"
      onClose={() => setShow(false)}
    />
  );
}

export default ExportAlert;
