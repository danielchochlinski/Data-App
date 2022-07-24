import React, { useEffect, useState, useCallback } from "react";
import ListItem from "./ListItem";

const List = ({ arr }) => {
  const headers = ["ID", "STEP", "SUBSTEP", "MODEL", "HEATPUMP", "TANK_NUMBER", "POWER", "VERSION", "BYPASS", "STATUS"];
  // const heatPumpFilter = () => {};
  // useEffect(() => {}, []);
  const [all, setAll] = useState(true);
  console.log(arr);
  const uniqueHeatPump = [...new Set(arr.map((item) => item.heatpump))];
  const uniqueModel = [...new Set(arr.map((item) => item.model))];
  const [pump, setPump] = useState();
  const [model, setModel] = useState();
  const [filtered, setFiltered] = useState();
  console.log(pump);
  console.log(all);

  // const filterFunction = useCallback(() => {
    // arr.filter((el) => {
    //   if (all) {
    //     return setFiltered(el);
    //   } else if (el.heatpump === pump) {
    //     setFiltered(el);
    //     setAll(false);
    //   }
    // });
  // }, [all, arr, pump]);
  // console.log(filtered);
  // useEffect(() => {
  //   filterFunction();
  // }, [filterFunction]);
  return (
    <div className="flex flex-col mt-10 ">
      <div className="flex gap-5 justify-center	">
        <button onClick={() => setAll((state) => !state)}>all</button>
        <label>by HeatPump</label>
        <select onChange={(e) => setPump(e.target.value)} name="cars" id="cars">
          <option value={undefined}>clear</option>
          {uniqueHeatPump.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
        <label>by model</label>
        <select onChange={(e) => setModel(e.target.value)} name="cars" id="cars">
          <option value={undefined}>clear</option>
          {uniqueModel.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
        {/* <span>HEATPUMP</span>
        <span>MODEL</span> */}
      </div>
      <div className="flex gap-20 cursor-pointer">
        {headers.map((el) => (
          <div className="">{el}</div>
        ))}
      </div>
      <div className="flex flex-col">
        {arr?.map((el) => (
          <ListItem data={el} />
        ))}
      </div>
    </div>
  );
};

export default List;
