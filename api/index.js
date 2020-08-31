const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

cloudinary.config({
  cloud_name: "befittinglife",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const handler = (req, res) => {
  const signature = cloudinary.utils.api_sign_request(
    req.body,
    process.env.API_SECRET
  );
  //   const { name = "World" } = req.query;
  res.send(signature);
};

module.exports = allowCors(handler);
