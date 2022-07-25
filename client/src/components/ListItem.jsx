import React from "react";

// const ListItem = ({ id, step, substep, model, heatpump, tank_number, power, version, bypass, status, created_at }) => {
const ListItem = ({ data }) => {
  // console.log(data);
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.id}</th>
      <td className="py-4 px-6">{data.step}</td>
      <td className="py-4 px-6">{data.substep}</td>
      <td className="py-4 px-6">{data.model}</td>
      <td className="py-4 px-6">{data.heatpump}</td>
      <td className="py-4 px-6">{data.tank_number}</td>
      <td className="py-4 px-6">{data.power}</td>
      <td className="py-4 px-6">{data.version}</td>
      <td className="py-4 px-6">{data.bypass}</td>
      <td className="py-4 px-6">{data.status}</td>
      <td className="py-4 px-6">{data.created_at}</td>
    </tr>
  );
};

export default ListItem;
