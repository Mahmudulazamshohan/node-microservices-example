import UserSeeders from "./user.seeders";
import Database from "../utils/database";
import SeederInterface from "../utils/interfaces/seeder.interface";
import Event from "events";

var EventEmitter = new Event.EventEmitter();

const PROCESS_KILL_EVENT = "killProcessNow";

EventEmitter.on(PROCESS_KILL_EVENT, () => {
  // process.exit(0);
  console.log("Exit");
});

(async () => {
  // Database connectivity
  await Database();

  const seeders: Array<SeederInterface> = [new UserSeeders()];

  seeders.forEach(async (seeder: SeederInterface, index: number) => {
    await seeder.run();

    const size = index + 1;

    if (size === seeders.length) {
      console.log("--->");

      EventEmitter.emit(PROCESS_KILL_EVENT, {});
    }
  });

  //
})();

process.on("SIGTERM", function () {
  console.log("end");
});

process.on("unhandledRejection", () => process.exit(0));
