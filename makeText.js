const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }

function makeText(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}
async function makeTextUrl(url) {
    let resp;
    try {
        resp = await axios.get(url);
    }
    catch (err) {
        console.error(`Had trouble reading ${url}: ${err}`)
        process.exit(1)
    }
    generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if(method === "file") {
    makeText(path)
}
else if(method === "url") {
    makeTextUrl(url)
}
else{
    console.error(`Method, ${method}, does not exist` );
    process.exit(1);
}