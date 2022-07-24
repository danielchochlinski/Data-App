import React from "react";

// const ListItem = ({ id, step, substep, model, heatpump, tank_number, power, version, bypass, status, created_at }) => {
const ListItem = ({ data }) => {
  // console.log(data);
  return (
    <div className="flex">
      <div>{data.id}</div>
      <div>{data.step}</div>
      <div>{data.substep}</div>
      <div>{data.model}</div>
      <div>{data.heatpump}</div>
      <div>{data.tank_number}</div>
      <div>{data.power}</div>
      <div>{data.version}</div>
      <div>{data.bypass}</div>
      <div>{data.status}</div>
      <div>{data.created_at}</div>
    </div>
  );
};

export default ListItem;
