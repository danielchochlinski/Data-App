import React, { useState, useReducer } from "react";
import { useEffect } from "react";
import axios from "axios";
import List from "../components/List";
import SearchedDataModal from "../components/SearchedDataModal";
import { useNotification } from "../context/NotificationProvider";

const URL = "http://localhost:5000/api";
const dataLocalStorage = JSON.parse(localStorage.getItem("history") || "[]");
const Main = () => {
  const dispatch = useNotification();
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [arr, setArr] = useState(dataLocalStorage);
  const [helperArr, setHelperArr] = useState(dataLocalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, isError] = useState(false);

  const uniqueID = () => {
    const uniq = "id" + new Date().getTime();
    return uniq;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${URL}/data/${value}`);

    if (response.data.message) {
      return response.data.message;
      //notification
    }
    setHelperArr((state) => [...state, response.data]);

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
              <input
                type="number"
                placeholder="search by id"
                id="small-input"
                className="block text-center	 p-2 w-2/3 text-black-900 bg-sky-100 rounded-lg border border-gray-300 sm:text-xs dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-gray-400 hover:bg-sky-200"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <button
                id="small-button"
                type="submit"
                class="w-1/5 h-8 mt-3 inline-block px-4 py-1 border-2 border-grey-800  bg-sky-100 text-gray-500 font-medium text-xs leading-normal uppercase rounded-lg  hover:bg-sky-200 focus:outline-red-500  transition duration-150 ease-in-out"
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
