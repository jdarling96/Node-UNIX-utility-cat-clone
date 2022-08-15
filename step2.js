const { default: axios } = require("axios");
const fs = require("fs");
let path = process.argv[2];

async function webCat(path) {
  if (path.startsWith("http:")) {
    try {
      let res = await axios.get(path);
      console.log(res);
    } catch (error) {
      console.log(`Error fetching ${path}`, error.response.status, error.response.statusText);
    }
  } else {
    cat(path);
  }
}

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}`, err);
      process.kill(1);
    }
    console.log(data);
  });
}

webCat(path);
