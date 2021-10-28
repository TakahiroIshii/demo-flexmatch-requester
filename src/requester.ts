import * as aws from "aws-sdk";
import { Player } from "aws-sdk/clients/gamelift";
import { config } from "../configs";

async function main() {
  console.time("runTime");
  console.log("START!");
  const [num] = process.argv.slice(2);
  const n = Number(num);
  const players: Player[] = [];
  for (let i = 0; i < n; i++) {
    const player: Player = {
      PlayerId: `player${i}`,
      PlayerAttributes: {
        matchmaking_id: { S: "mmID" },
        st_player_id: { N: i },
      },
    };
    players.push(player);
  }
  const credentials = new aws.SharedIniFileCredentials({ profile: "default" });
  aws.config.credentials = credentials;
  const gameLift = new aws.GameLift({
    region: config.region,
  });
  const res = await gameLift
    .startMatchmaking({
      ConfigurationName: config.gameLift.matchmakingConfigurationName,
      Players: players,
    })
    .promise();
  console.log(res.MatchmakingTicket);
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
