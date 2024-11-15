export const API_TOKEN = import.meta.env.VITE_WAQI_API_TOKEN;
export const API_BASE_URL = "https://api.waqi.info/feed";

export const endpoints = {
  here: `${API_BASE_URL}/here/?token=${API_TOKEN}`,
  getByGeo: (lat, lng) =>
    `${API_BASE_URL}/geo:${lat};${lng}/?token=${API_TOKEN}`,
  getByStation: (stationId) =>
    `${API_BASE_URL}/@${stationId}/?token=${API_TOKEN}`,
};
