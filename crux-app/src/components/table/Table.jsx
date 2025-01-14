import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../../utils/constants";
import { CustomNoRowsOverlay } from "../icons/no-rows-overlay";
import { TableFooterRow } from "./TableFooter";

const CruXTable = ({ data }) => {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography
          sx={{
            border: "1px solid #e0e0e0",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottom: 0,
            padding: "10px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          CruX Data
        </Typography>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSizeOptions={[5]}
          disableColumnResize
          disableRowSelectionOnClick
          showCellVerticalBorder
          showColumnVerticalBorder
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{
            borderBottom: data.length >= 2 ? "none" : undefined,
            borderBottomLeftRadius: data.length >= 2 ? 0 : 10,
            borderBottomRightRadius: data.length >= 2 ? 0 : 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          disableColumnSelector
          hideFooterPagination
          hideFooter
        />
        {data.length >= 2 && <TableFooterRow columns={columns} data={data} />}
      </Box>
    </>
  );
};
export default CruXTable;
