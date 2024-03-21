export interface SearchType {
  city: string;
  country: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface Geo {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface LocalNames {
  [key: string]: string;
}

export interface Weather {
  name: string;
  main: Main;
}

export interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
}
