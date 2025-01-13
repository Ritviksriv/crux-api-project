import React from "react";
import { CALCULATION_ROWS, UNIT_ROWS } from "../../utils/constants";
import { Box } from "@mui/material";

export function TableFooterRow({ columns, data }) {
  const columnMetrics = columns.map((column) => {
    if (!CALCULATION_ROWS.includes(column.field)) {
      return { sum: "", average: "" };
    }

    const values = data.map((row) =>
      Number(row[column.field]?.percentiles?.p75 || 0)
    );
    const sum = values.reduce((acc, value) => acc + value, 0);
    const average = values.length > 0 ? sum / values.length : 0;

    return { sum, average };
  });

  const renderRow = (label, metricKey) => (
    <Box
      sx={{
        display: "flex",
        width: "100%",

        border: "1px solid #e0e0e0",
        borderTop: metricKey === "average" ? "none" : "",
      }}
    >
      {columns.map((column, index) => {
        const showUnit = UNIT_ROWS.includes(column.field);
        return (
          <Box
            key={`${metricKey}-${column.field}`}
            sx={{
              flex: `${column.flex || 1}`,
              padding: "8px",
              textAlign: column.field === "origin" ? "center" : "right",
              alignItems: "end",
              fontWeight: "bold",
            }}
          >
            {column.field === "origin"
              ? label
              : columnMetrics[index][metricKey] !== ""
              ? `${columnMetrics[index][metricKey].toFixed(2)} ${
                  showUnit ? "ms" : ""
                }`
              : ""}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box>
      {renderRow("Sum", "sum")}
      {renderRow("Average", "average")}
    </Box>
  );
}
