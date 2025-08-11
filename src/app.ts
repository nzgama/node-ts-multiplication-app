import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
    await main();
})();

async function main() {
    // console.log(yarg);
    const { b: base, l: limit, s: show, n: name, d: destination } = yarg;
    ServerApp.run({ base, limit, show, name, destination });
}