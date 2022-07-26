import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../components/List";
import SearchedDataModal from "../components/SearchedDataModal";
import { useNotification } from "../context/NotificationProvider";
import { uniqueID } from "../utils/functions";
const URL_PROD = "https://device-data-app.herokuapp.com/api/data";
const URL = "http://localhost:5000/api/data";
const dataLocalStorage = JSON.parse(localStorage.getItem("history") || "[]");
const Main = () => {
  const dispatch = useNotification();
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [arr, setArr] = useState(dataLocalStorage);
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${URL_PROD}/${value}`);
    if (value === "") {
      dispatch({
        id: uniqueID(),
        type: "ERROR",
        title: "No Id entered",
        message: "Please enter an id!",
      });
      return;
    }

    if (response.data.message) {
      dispatch({
        id: uniqueID(),
        type: "ERROR",
        title: "Device not found",
        message: "Please ensure that the id is correct",
      });
      setData(null);
      return response.data.message;
    }
    const isInArray = arr.find((element) => element.id === response.data.id);
    if (isInArray)
      dispatch({
        id: uniqueID(),
        type: "SUCCESS",
        message: "",
        title: "Data found",
      });
    setData(response.data);

    if (!isInArray) {
      setArr((state) => [...state, response.data]);
      dispatch({
        id: uniqueID(),
        type: "SUCCESS",
        message: "Data added to your list",
        title: "Data found",
      });
    }
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
          <div className="justify-items-center mt-10 ">
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-center mb-5 "
            >
              <input
                type="text"
                placeholder="search by id"
                id="small-input"
                className="block text-center	 p-2 w-2/3 text-black-900 bg-sky-100 rounded-lg border border-gray-300 sm:text-xs  focus:outline-gray-400 hover:bg-sky-200"
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
          <List arr={arr} setValue={setValue} />
        </div>
      </section>
    </>
  );
};

export default Main;
