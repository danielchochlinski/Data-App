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

  const [all, setAll] = useState(true);
  const uniqueHeatPump = [...new Set(arr.map((item) => item.heatpump))];
  const uniqueModel = [...new Set(arr.map((item) => item.model))];
  const [pump, setPump] = useState();
  const [model, setModel] = useState();
  const [filtered, setFiltered] = useState();
  // console.log(pump);
  // console.log(all);

  const filterFunction = useCallback(() => {
    arr.reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id)) {
        unique.push(o);
      }
      setFiltered(unique);
      return unique;
    }, []);
  }, [arr]);
  const filterByCriteria = useCallback(() => {
    // arr.filter(()=>)
  }, []);
  console.log(arr);
  useEffect(() => {
    filterFunction();
  }, [filterFunction, arr]);
  return (
    <div className="flex flex-col ">
      <div className="flex gap-20 justify-left ml-12 	">
        <div className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col justify-center	pb-0">
          <label
            className="mb-2  text-sm font-medium text-gray-700 dark:text-gray-400"
            onClick={() => setAll((state) => !state)}
          >
            all
          </label>
        </div>
        <div className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">by HeatPump</label>
          <select className="cursor-pointer" onChange={(e) => setPump(e.target.value)} name="cars" id="cars">
            <option value={undefined}>none</option>
            {uniqueHeatPump.map((el) => (
              <option key={el.value} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">by Model</label>
          <select className="cursor-pointer" onChange={(e) => setModel(e.target.value)} name="cars" id="cars">
            <option value={undefined}>none</option>
            {uniqueModel.map((el) => (
              <option key={el.value} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" overflow-x-auto relative shadow-md sm:rounded-lg m-10 justify-center">
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-500 dark:text-gray-400">
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
