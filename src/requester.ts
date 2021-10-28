import * as aws from "aws-sdk";
import axios from "axios";
import Aigle from "aigle";

async function main() {
  console.time("runTime");
  console.log("START!");
  const [num] = process.argv.slice(2);
  const n = Number(num);
  console.log("DONE!");
  console.timeEnd("runTime");
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
