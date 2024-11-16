export interface AirQualityData {
  aqi: number;
  idx: number;
  city: {
    name: string;
    geo: [number, number];
  };
  dominentpol: string;
  iaqi: {
    [key: string]: {
      v: number;
    };
  };
  time: {
    iso: string;
  };
}

export interface Report {
  id: number;
  type: string;
  time: string;
  likes: number;
}