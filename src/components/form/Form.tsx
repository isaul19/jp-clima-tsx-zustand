import styles from "./Form.module.css";
import { countries } from "../../data/countries";
import { ChangeEvent, FormEvent, useState } from "react";
import { SearchType } from "../../types";
import { Alert } from "../alert/Alert";

interface Props {
  fetchWeather: (search: SearchType) => Promise<void>;
}

const initialState: SearchType = {
  city: "",
  country: "",
};

export const Form = ({ fetchWeather }: Props) => {
  const [search, setSearch] = useState<SearchType>(initialState);
  const [alert, setAlert] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }

    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        {alert && <Alert>{alert}</Alert>}
        <label htmlFor="city">Ciudad</label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country"></label>
        <select name="country" id="country" value={search.country} onChange={handleChange}>
          <option value="">Seleccione un País</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="Consultar clima" />
    </form>
  );
};
