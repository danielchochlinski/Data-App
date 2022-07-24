import React from "react";

const SearchedData = ({ data }) => {
  //   console.log(data);
  return (
    <div>
      <h3>Current Data</h3>
      <div>
        <ul>
          <li>{data?.id}</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchedData;
