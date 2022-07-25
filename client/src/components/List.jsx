import React, { useEffect, useState, useCallback } from "react";
import ListItem from "./ListItem";
const List = ({ arr }) => {
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

  const [all, setAll] = useState("all");
  const uniqueHeatPump = [...new Set(arr.map((item) => item.heatpump))];
  const uniqueModel = [...new Set(arr.map((item) => item.model))];
  const [pump, setPump] = useState("none");
  const [model, setModel] = useState("none");
  const [filtered, setFiltered] = useState();

  console.log("arr", arr);
  console.log("filtered", filtered);
  const setAllHandle = () => {
    setPump("none");
    setModel("none");
  };
  const setAllF = useCallback(() => {
    if (pump === "none" && model === "none") {
      setFiltered(arr);
    }
  }, [arr, model, pump]);
  useEffect(() => {
    setAllF();
  }, [all, arr, model, pump, setAllF]);

  //filter for duplicates
  const filterFunction = useCallback(() => {
    const arrayList = JSON.parse(localStorage.getItem("history"));
    // arr.reduce((unique, o) => {
    //   if (!unique.some((obj) => obj?.id === o?.id)) {
    //     unique.push(o);
    //   }
      setFiltered(arrayList);
    //   return unique;
    // }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr]);

  useEffect(() => {
    filterFunction();
  }, [filterFunction, arr]);

  //fulter by heatpump
  const filterByPump = useCallback(() => {
    if (pump !== "none") {
      const filtered = arr.filter((el) => el.heatpump === pump);
      setModel("none");
      setFiltered(filtered);
    }
    if (pump === "none") {
      setFiltered(arr);
    }
  }, [arr, pump]);

  useEffect(() => {
    filterByPump();
  }, [filterByPump]);

  //filter by model
  const filterByModel = useCallback(() => {
    if (model !== "none") {
      const filtered = arr.filter((el) => el.model === model);
      setPump("none");
      setFiltered(filtered);
    }
    if (model === "none") {
      setFiltered(arr);
    }
  }, [arr, model]);

  useEffect(() => {
    filterByModel();
  }, [filterByModel]);

  return (
    <div className="flex flex-col ">
      <div className="flex gap-20 justify-left ml-12 	">
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
            {uniqueHeatPump.map((el) => (
              <option key={el?.value} value={el}>
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
            {uniqueModel.map((el) => (
              <option key={el?.value} value={el}>
                {el}
              </option>
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
