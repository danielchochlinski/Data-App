const asyncHandler = require("express-async-handler");
const database = require("../database/device.json");

// @desc        Get data
// @router      GET /api/data/:id
// @access     Public
const getDatabase = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const singleData = database.filter((db) => db.id === req.params.id);

  if (!singleData.length) {
    throw new Error("No data found");
  }

  const [data] = singleData;
  console.log(singleData);
  res.status(200).json(data);
});

module.exports = {
  getDatabase,
};
