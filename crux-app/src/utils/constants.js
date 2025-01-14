export const columns = [
  {
    field: "origin",
    flex: 1,
    minWidth: 180,
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
    flex: 1,
    minWidth: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>CLS (p75)</b>,
  },
  {
    field: "first_contentful_paint",
    type: "number",
    flex: 1,
    minWidth: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>FCP (p75)</b>,
    renderCell: ({ value }) => `${value} ms`,
  },
  {
    field: "largest_contentful_paint",
    type: "number",
    flex: 1,
    minWidth: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>LCP (p75)</b>,
    renderCell: ({ value }) => `${value} ms`,
  },
  {
    field: "round_trip_time",
    type: "number",
    flex: 1,
    minWidth: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>RTT (p75)</b>,
    renderCell: ({ value }) => `${value} ms`,
  },
  {
    field: "interaction_to_next_paint",
    type: "number",
    flex: 1,
    minWidth: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>INP (p75)</b>,
    renderCell: ({ value }) => `${value} ms`,
  },

  {
    field: "experimental_time_to_first_byte",
    type: "number",
    flex: 1,
    minWidth: 135,
    valueGetter: (value) => value.percentiles.p75,
    renderHeader: () => <b>TTFB (p75)</b>,
    renderCell: ({ value }) => `${value} ms`,
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

export const VISIBLE_COLUMNS = {
  origin: true,
  largest_contentful_paint: true,
  interaction_to_next_paint: true,
  cumulative_layout_shift: true,
  experimental_time_to_first_byte: true,
  round_trip_time: true,
  first_contentful_paint: true,
};
