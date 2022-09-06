import { createInterface } from "readline";
import { COMMANDS, RETURN_CODES } from "./constants";
import MemoryStorage from "./memory-storage";
import { getEasterEgg, getHelpText } from "./utils";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const storage = new MemoryStorage();

console.log(getHelpText());

rl.prompt();

rl.on("line", (line) => {
  const [command, ...args] = line.split(" ");
  switch (command.toUpperCase()) {
    case COMMANDS.SET:
      if (!args[0]) {
        console.log(RETURN_CODES.ENTER_KEY);
        break;
      } else if (!args[1]) {
        console.log(RETURN_CODES.ENTER_VALUE);
        break;
      }
      console.log(storage.set(args[0], args[1]));
      break;
    case COMMANDS.GET:
      if (!args) {
        console.log(RETURN_CODES.ENTER_KEY);
        break;
      }
      console.log(storage.get(args[0]));
      break;
    case COMMANDS.DELETE:
      if (!args) {
        console.log(RETURN_CODES.ENTER_KEY);
        break;
      }
      console.log(storage.delete(args[0]));
      break;
    case COMMANDS.COUNT:
      if (!args[0]) {
        console.log(RETURN_CODES.ENTER_VALUE);
        break;
      }
      console.log(storage.count(args[0]));
      break;
    case COMMANDS.BEGIN:
      console.log(storage.begin());
      break;
    case COMMANDS.COMMIT:
      console.log(storage.commit());
      break;
    case COMMANDS.ROLLBACK:
      console.log(storage.rollback());
      break;
    case COMMANDS.HELP:
      console.log(getHelpText());
      break;
    case "EGG":
      console.log(getEasterEgg());
      break;
    default:
      console.log(RETURN_CODES.INVALID_COMMAND);
      break;
  }
  rl.prompt();
});
