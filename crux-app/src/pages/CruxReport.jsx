import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Alert,
  Snackbar,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isValidUrl } from "../utils/func";
import CruXTable from "../components/table/Table";
import { v4 as uuidv4 } from "uuid";
import { removeDuplicates } from "../utils/func";
import { fetchAllCruxData } from "../utils/api";

const CruxReport = () => {
  const [cruxData, setCruxData] = useState([]);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [errorData, setErrorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const addedURLs = cruxData.reduce(
    (acc, url) => [...acc, new URL(url.origin).href],
    []
  );

  const searchHandler = async () => {
    const duplicateUrls = selectedUrls.filter((url) =>
      addedURLs.includes(new URL(url).href)
    );
    if (duplicateUrls.length > 0) {
      setErrorData(`${duplicateUrls.join(", ")} has/have already been added!`);
      return;
    }
    try {
      setIsLoading(true);

      const metricsResponses = await fetchAllCruxData(
        removeDuplicates(selectedUrls)
      );

      const successfulData = metricsResponses
        .filter((response) => response.status === "fulfilled")
        .map((response) => ({
          id: uuidv4(),
          ...response.value,
        }));
      const failedUrls = metricsResponses
        .filter((response) => response.status === "rejected")
        .map((error) => error);
      setCruxData((prevState) => [...prevState, ...successfulData]);
      setErrorData(
        failedUrls.length > 0
          ? "Could not find data for one or more URLs!"
          : null
      );
      setSelectedUrls([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddUrl = (url) => {
    if (isValidUrl(url)) {
      setSelectedUrls((prev) => [...prev, url]);
    } else {
      setErrorData(`The given URL is invalid!`);
    }
  };

  return (
    <div>
      {errorData ? (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={Boolean(errorData)}
          autoHideDuration={2000}
          onClose={() => setErrorData(null)}
        >
          <Alert severity="error">{errorData}</Alert>
        </Snackbar>
      ) : null}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        maxWidth="100%"
      >
        <Typography>URL(s):</Typography>
        <Autocomplete
          multiple
          disableClearable
          freeSolo
          value={selectedUrls}
          options={[]}
          inputValue={inputValue}
          onChange={(_, value) => setSelectedUrls(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={index} label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              }}
              placeholder="Type or paste URLs!"
              sx={{ width: "500px", margin: "5px" }}
              variant="outlined"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        />
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ boxShadow: "none" }}
        >
          <Button
            onClick={() => {
              handleAddUrl(inputValue);
              setInputValue("");
            }}
            disabled={!inputValue}
          >
            <Typography textTransform={"capitalize"}>Add</Typography>
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={searchHandler}
            disabled={!selectedUrls.length}
          >
            <Typography textTransform={"capitalize"}>Search</Typography>
          </LoadingButton>
        </ButtonGroup>
      </Box>

      <Box display="flex" flexDirection="column" gap={0}>
        <CruXTable data={cruxData} />
      </Box>
    </div>
  );
};

export default CruxReport;
