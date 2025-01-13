import axios from "axios";

export async function fetchCruxData(url) {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`;
    const payload = {
      formFactor: "ALL_FORM_FACTORS",
      origin: url,
    };

    const { data } = await axios.post(apiUrl, payload);
    const { key, metrics } = data.record;
    return { ...key, ...metrics };
  } catch (error) {
    throw { ...error };
  }
}
export async function fetchAllCruxData(urls) {
  const promises = urls.map((url) => fetchCruxData(url));
  const results = await Promise.allSettled(promises);
  return results;
}
