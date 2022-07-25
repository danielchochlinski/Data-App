import React, { useState, useReducer } from "react";
import { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import axios from "axios";
import SearchedData from "../components/SearchedData";
import List from "../components/List";
import SearchedDataModal from "../components/SearchedDataModal";
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
    const unique = arr.reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);
    localStorage.setItem("history", JSON.stringify(unique));
  }, [arr, data]);

  return (
    <>
      <section>
        <div>
          <div className="justify-items-center mt-10">
            <form onSubmit={onSubmit} className="flex flex-col items-center mb-5 ">
              {/* <h1>031010103031320322129664</h1>
            <h2>031010103031320322347815</h2> */}

              <input
                type="number"
                placeholder="search by id"
                id="small-input"
                className="block text-center	 p-2 w-2/3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <button
                id="small-button"
                type="submit"
                class="w-1/5 h-8 mt-3 inline-block px-4 py-1 border-2 border-grey-600  bg-gray-50 text-gray-400 font-medium text-xs leading-normal uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                search
              </button>
              <div className="m-6">
                <SearchedDataModal data={data} />
              </div>
            </form>
          </div>
          <List arr={arr} />
        </div>
      </section>
    </>
  );
};

export default Main;
