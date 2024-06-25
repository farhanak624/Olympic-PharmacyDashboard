import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country } from "country-state-city";

const SingleCountrySelect = ({ onChange, value }) => {
  const [options, setOptions] = useState([]);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(21, 21, 21, 1)",
      color: "white",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(21, 21, 21, 1)",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(31, 31, 31, 1)"
        : "rgba(21, 21, 21, 1)",
      color: "white",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };
  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setOptions(countries);
  }, []);

  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      styles={customStyles}
    />
  );
};

export default SingleCountrySelect;
