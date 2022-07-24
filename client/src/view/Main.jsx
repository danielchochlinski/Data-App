import React, { useState, useReducer } from "react";
import { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import axios from "axios";
import SearchedData from "../components/SearchedData";
import List from "../components/List";
const URL = "http://localhost:5000/api";
const dataLocalStorage = JSON.parse(localStorage.getItem("history") || "[]");
const Main = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [arr, setArr] = useState(dataLocalStorage);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${URL}/data/${value}`);

    if (response.data.message) {
      return response.data.message;
      //notification
    }
    setData(response.data);
    setArr((state) => [...state, response.data]);
  };

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(arr));
  }, [arr]);

  let hey = true;

  const result = arr.filter((el) => {
    return el.heatpu === "Samsung";
  });
  console.log("filtered", result);

  console.log("arr", arr);

  return (
    <>
      <section className="justify-center">
        <div className="m-4">
          <form onSubmit={onSubmit} className="flex flex-col ">
            <label>id</label>
            <h1>031010103031320322129664</h1>
            <h2>031010103031320322347815</h2>
            <input
              type="text"
              className="w-1/2 justify-center border-solid border-2 border-indigo-600"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <button type="submit">search</button>
          </form>
        </div>
      </section>
      <section>
        <SearchedData data={data} />
      </section>

      <section>
        <List arr={arr} />
      </section>
    </>
  );
};

export default Main;
