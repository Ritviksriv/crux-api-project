export const columns = [
  {
    field: "origin",
    width: 180,
    renderCell: ({ value }) => (
      <a href={value} target="_blank">
        {value}
      </a>
    ),
    filterable: false,
    renderHeader: () => <b>URL</b>,
  },
  {
    field: "cumulative_layout_shift",
    type: "number",
    width: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>CLS (p75)</b>,
  },
  {
    field: "first_contentful_paint",
    type: "number",
    width: 135,
    valueGetter: (value) => `${value.percentiles.p75} ms`,
    renderHeader: () => <b>FCP (p75)</b>,
  },
  {
    field: "largest_contentful_paint",
    type: "number",
    width: 135,
    valueGetter: (value) => `${value.percentiles.p75} ms`,
    renderHeader: () => <b>LCP (p75)</b>,
  },
  {
    field: "round_trip_time",
    type: "number",
    width: 135,
    valueGetter: (value) => `${value.percentiles.p75} ms`,
    renderHeader: () => <b>RTT (p75)</b>,
  },
  {
    field: "interaction_to_next_paint",
    type: "number",
    width: 135,
    valueGetter: (value) => `${value.percentiles.p75} ms`,
    renderHeader: () => <b>INP (p75)</b>,
  },

  {
    field: "experimental_time_to_first_byte",
    type: "number",
    width: 135,
    valueGetter: (value) => `${value.percentiles.p75} ms`,
    renderHeader: () => <b>TTFB (p75)</b>,
  },
];

export const CALCULATION_ROWS = [
  "largest_contentful_paint",
  "interaction_to_next_paint",
  "cumulative_layout_shift",
  "experimental_time_to_first_byte",
  "round_trip_time",
  "first_contentful_paint",
];

export const UNIT_ROWS = [
  "largest_contentful_paint",
  "interaction_to_next_paint",
  "experimental_time_to_first_byte",
  "round_trip_time",
  "first_contentful_paint",
];
