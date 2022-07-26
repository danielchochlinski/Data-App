import React, { useEffect, useState, useCallback } from "react";
import ListItem from "./ListItem";
import { dummyID } from "../utils/functions";
const List = ({ arr, setValue }) => {
  const headers = [
    "ID",
    "STEP",
    "SUBSTEP",
    "MODEL",
    "HEATPUMP",
    "TANK_NUMBER",
    "POWER",
    "VERSION",
    "BYPASS",
    "STATUS",
    "CREATED_AT",
  ];
  //set arrays no duplicate
  const uniqueHeatPump = [...new Set(arr.map((item) => item.heatpump))];
  const uniqueModel = [...new Set(arr.map((item) => item.model))];

  const [pump, setPump] = useState("none");
  const [model, setModel] = useState("none");

  //filtered is responsible for filtered and displaying data
  const [filtered, setFiltered] = useState();

  const setAllHandle = () => {
    setPump("none");
    setModel("none");
  };
  const filterAll = useCallback(() => {
    if (pump === "none" && model === "none") {
      setFiltered(arr);
    }
  }, [arr, model, pump]);
  useEffect(() => {
    filterAll();
  }, [arr, model, pump, filterAll]);

  useEffect(() => {
    const result = arr.filter(
      (item) => (item.heatpump === pump || pump === "none") && (item.model === model || model === "none")
    );
    setFiltered(result);
  }, [arr, model, pump]);

  return (
    <div className="flex flex-col ">
      <div className="grid gap-5 ml-10 mr-10	tablet:flex">
        <div
          onClick={setAllHandle}
          className=" cursor-pointer bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col justify-center	pb-0"
        >
          <label className="mb-2  cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-400">all</label>
        </div>
        <div className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">by HeatPump</label>
          <select
            className="cursor-pointer"
            onChange={(e) => setPump(e.target.value)}
            value={pump}
            name="pump"
            id="pump"
          >
            <option value="none">none</option>
            {uniqueHeatPump.map((el, i) => (
              <option key={`pump${i}`} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">by Model</label>
          <select
            className="cursor-pointer"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            name="model"
            id="model"
          >
            <option value={"none"}>none</option>
            {uniqueModel.map((el, i) => (
              <option key={`model${i}`} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Test ID</label>
          <select className="cursor-pointer" name="dummy" id="dummy" onChange={(e) => setValue(e.target.value)}>
            {dummyID.map((el) => (
              <option key={el.id}>{el}</option>
            ))}
          </select>
        </div>
      </div>
      <div className=" overflow-x-auto relative shadow-md sm:rounded-lg m-10 justify-center">
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-sky-100 dark:bg-gray-500 dark:text-gray-400">
            <tr>
              {headers.map((el) => (
                <td className="py-3 px-6" key={el}>
                  {el}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered?.map((el) => (
              <ListItem key={el.id} data={el} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
