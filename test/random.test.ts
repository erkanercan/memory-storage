import { COMMANDS as CommandsEnum } from "../src/constants";
import MemoryStorage from "../src/memory-storage";

describe("random tests", () => {
  it("should pass random tests for n times", () => {
    const COMMANDS = Object.keys(CommandsEnum);
    const MAX_COMMANDS = 100;
    const MAX_KEY_LENGTH = 10;
    const MAX_VALUE_LENGTH = 10;
    const MAX_COUNT_VALUE_LENGTH = 10;

    const randomCommand = () => {
      return COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
    };

    const randomKey = () => {
      const length = Math.floor(Math.random() * MAX_KEY_LENGTH);
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };

    const randomValue = () => {
      const length = Math.floor(Math.random() * MAX_VALUE_LENGTH);
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };

    const randomCountValue = () => {
      const length = Math.floor(Math.random() * MAX_COUNT_VALUE_LENGTH);
      return Math.random()
        .toString(36)
        .substring(2, length + 2);
    };

    const randomArguments = (command: string) => {
      switch (command) {
        case CommandsEnum.SET:
          return [randomKey(), randomValue()];
        case CommandsEnum.GET:
          return [randomKey()];
        case CommandsEnum.DELETE:
          return [randomKey()];
        case CommandsEnum.COUNT:
          return [randomCountValue()];
        default:
          return [];
      }
    };

    const randomOperations = () => {
      const operations: any[] = [];
      const numOperations = Math.floor(Math.random() * MAX_COMMANDS);
      for (let i = 0; i < numOperations; i++) {
        const command = randomCommand();
        const args = randomArguments(command);
        operations.push({ command, args });
      }
      return operations;
    };

    const operations = randomOperations();
    const storage = new MemoryStorage();
    const storage2 = new MemoryStorage();

    operations.forEach(({ command, args }) => {
      switch (command) {
        case CommandsEnum.SET:
          storage.set(args[0], args[1]);
          storage2.set(args[0], args[1]);
          break;
        case CommandsEnum.GET:
          storage.get(args[0]);
          storage2.get(args[0]);
          break;
        case CommandsEnum.DELETE:
          storage.delete(args[0]);
          storage2.delete(args[0]);
          break;
        case CommandsEnum.COUNT:
          storage.count(args[0]);
          storage2.count(args[0]);
          break;
        case CommandsEnum.BEGIN:
          storage.begin();
          storage2.begin();
          break;
        case CommandsEnum.COMMIT:
          storage.commit();
          storage2.commit();
          break;
        case CommandsEnum.ROLLBACK:
          storage.rollback();
          storage2.rollback();
          break;
        default:
          break;
      }
    });

    expect(storage).toEqual(storage2);
  });
});
