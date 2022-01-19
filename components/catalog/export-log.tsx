import React, { useEffect, useState } from "react";
import { Panel, Table } from "@bigcommerce/big-design";

export default function ImportLog() {
  const [data] = useState(
    Array.from(Array(6)).map(() => ({
      event: "Synchronizing product data",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    }))
  );
  const [columns] = useState([
    { header: "Event", hash: "event", render: ({ event }) => event },
    { header: "Summary", hash: "summary", render: ({ summary }) => summary },
    { header: "Date", hash: "date", render: ({ date }) => date },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOptions] = useState([5, 10, 20]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState([]);

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  useEffect(() => {
    const maxItems = currentPage * itemsPerPage;
    const lastItem = Math.min(maxItems, data.length);
    const firstItem = Math.max(0, maxItems - itemsPerPage);

    setCurrentItems(data.slice(firstItem, lastItem));
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <Panel header="Export log">
        <Table
          columns={columns}
          items={currentItems}
          itemName="import events"
          pagination={{
            currentPage,
            totalItems: data.length,
            onPageChange: setCurrentPage,
            itemsPerPageOptions,
            onItemsPerPageChange,
            itemsPerPage,
          }}
          stickyHeader
        />
      </Panel>
    </>
  );
}
