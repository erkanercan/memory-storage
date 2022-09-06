import { RETURN_CODES } from "../src/constants";
import MemoryStorage from "../src/memory-storage";

describe("MemoryStorage", () => {
  // get a new instance of MemoryStorage for each test
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  describe("set", () => {
    it("should set a key to a value", () => {
      storage.set("key", "value");
      expect(storage.get("key")).toBe("value");
    });
    it("should return OK if key is set successfully", () => {
      expect(storage.set("key", "value")).toBe(RETURN_CODES.OK);
    });
  });

  describe("get", () => {
    it("should get a value for a key", () => {
      storage.set("key", "value");
      expect(storage.get("key")).toBe("value");
    });
    it("should return RETURN_CODES.KEY_NOT_FOUND if key does not exist", () => {
      expect(storage.get("key")).toBe(RETURN_CODES.KEY_NOT_FOUND);
    });
  });

  describe("delete", () => {
    it("should delete a key", () => {
      storage.set("key", "value");
      storage.delete("key");
      expect(storage.get("key")).toBe(RETURN_CODES.KEY_NOT_FOUND);
    });
    it("should return OK if key is deleted successfully", () => {
      storage.set("key", "value");
      expect(storage.delete("key")).toBe(RETURN_CODES.OK);
    });
    it("should return RETURN_CODES.KEY_NOT_FOUND if key does not exist", () => {
      expect(storage.delete("key")).toBe(RETURN_CODES.KEY_NOT_FOUND);
    });
  });

  describe("count", () => {
    it("should return the number of keys in the storage", () => {
      storage.set("key", "value");
      storage.set("key2", "value2");
      storage.set("key3", "value");
      expect(storage.count("value")).toBe(2);
    });
  });

  describe("begin", () => {
    it("should create a new transaction", () => {
      storage.begin();
      expect(storage.transactions.length).toBe(1);
    });
    it("should return OK if transaction is created successfully", () => {
      expect(storage.begin()).toBe(RETURN_CODES.OK);
    });
  });

  describe("commit", () => {
    it("should commit a transaction", () => {
      storage.set("key", "value");
      storage.set("key2", "value2");
      storage.begin();
      storage.set("key", "other value");
      storage.commit();
      expect(storage.get("key")).toBe("other value");
    });
    it("should return OK if transaction is committed successfully", () => {
      storage.begin();
      expect(storage.commit()).toBe(RETURN_CODES.OK);
    });
    it("should return RETURN_CODES.NO_TRANSACTION if there is no transaction", () => {
      expect(storage.commit()).toBe(RETURN_CODES.NO_TRANSACTION);
    });
  });

  describe("rollback", () => {
    it("should rollback a transaction", () => {
      storage.set("key", "value");
      storage.begin();
      storage.set("key", "other value");
      storage.rollback();
      expect(storage.get("key")).toBe("value");
    });
    it("should return OK if transaction is rolled back successfully", () => {
      storage.begin();
      expect(storage.rollback()).toBe(RETURN_CODES.OK);
    });
    it("should return RETURN_CODES.NO_TRANSACTION if there is no transaction", () => {
      expect(storage.rollback()).toBe(RETURN_CODES.NO_TRANSACTION);
    });
  });

  describe("nested transactions", () => {
    it("should rollback to the correct state", () => {
      storage.set("key", "value");
      storage.begin();
      storage.set("key", "other value");
      storage.begin();
      storage.set("key", "another value");
      storage.rollback();
      expect(storage.get("key")).toBe("other value");
    });

    it("should commit to the correct state", () => {
      storage.set("key", "value");
      storage.begin();
      storage.set("key", "other value");
      storage.begin();
      storage.set("key", "another value");
      storage.commit();
      expect(storage.get("key")).toBe("another value");
    });

    it("should commit multiple caches to the correct state", () => {
      storage.set("key", "value");
      storage.begin();
      storage.set("key", "other value");
      storage.begin();
      storage.set("key", "another value");
      storage.commit();
      storage.commit();
      expect(storage.get("key")).toBe("another value");
    });

    it("should rollback multiple caches to the correct state", () => {
      storage.set("key", "value");
      storage.begin();
      storage.set("key", "other value");
      storage.begin();
      storage.set("key", "another value");
      storage.rollback();
      storage.rollback();
      expect(storage.get("key")).toBe("value");
    });
  });
});
