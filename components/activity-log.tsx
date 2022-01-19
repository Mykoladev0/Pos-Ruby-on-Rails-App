import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Flex,
  Panel,
  Table,
  H2,
  Button,
  FlexItem,
} from "@bigcommerce/big-design";
import { ExpandMoreIcon, FilterListIcon } from "@bigcommerce/big-design-icons";

export default function ActivityLog() {
  const [data] = useState([
    {
      event: "Last inventory sync",
      summary:
        "0 variants from BigCommerce were updated. 0 variants from POS were updated.",
      date: "Today, 7:50pm",
    },
    {
      event: "Import from POS",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    },
    {
      event: "Import from POS",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    },
    {
      event: "Import from POS",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    },
    {
      event: "Import from POS",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    },
    {
      event: "Import from POS",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    },
    {
      event: "Import from POS",
      summary: "11 products matched, 0 products created and 0 updated.",
      date: "April 30, 7:50pm",
    },
    {
      event: "Settings changed",
      summary: "Location changed to Jason Home.",
      date: "December 27, 2019 9:51 AM",
    },
  ]);
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

  const [filterItems] = useState([
    {
      content: "All activities",
      onItemClick: (item) => item,
    },
    {
      content: "Product Import",
      onItemClick: (item) => item,
    },
    {
      content: "Product Export",
      onItemClick: (item) => item,
    },
    {
      content: "Last inventory sync",
      onItemClick: (item) => item,
    },
    {
      content: "Settings changed",
      onItemClick: (item) => item,
    },
  ]);

  return (
    <>
      <Panel>
        <Flex>
          <FlexItem flexGrow={1}>
            <H2>Activity log</H2>
          </FlexItem>
          <FlexItem flexGrow={0}>
            <Dropdown
              items={filterItems}
              placement="bottom-end"
              toggle={
                <Button
                  variant="subtle"
                  iconLeft={<FilterListIcon />}
                  iconRight={<ExpandMoreIcon />}
                >
                  All activities
                </Button>
              }
            />
          </FlexItem>
        </Flex>
        <Table
          columns={columns}
          items={currentItems}
          itemName="activities"
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
