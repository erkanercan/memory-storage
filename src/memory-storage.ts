import { RETURN_CODES } from "./constants";
import { isEmptyArray } from "./utils";
import { TransactionType } from "./types";

class MemoryStorage {
  cache: Record<string, string> = {};
  transactions: TransactionType[] = [];

  /**
   * @description Starts a new transaction
   * @returns {string} Returns OK if transaction started successfully
   */
  begin(): string {
    const transactionId = this.transactions.length + 1;
    const cache = isEmptyArray(this.transactions)
      ? { ...this.cache }
      : { ...this.transactions[this.transactions.length - 1].cache };
    this.transactions.push({ transactionId, cache });
    return RETURN_CODES.OK;
  }

  /**
   * @description Commits the current transaction
   * @returns {string} Returns OK if transaction committed successfully, NO_TRANSACTION if no transaction is in progress
   */
  commit(): string {
    if (isEmptyArray(this.transactions)) {
      return RETURN_CODES.NO_TRANSACTION;
    }
    const { cache: tempCache } = this.transactions.pop();
    if (isEmptyArray(this.transactions)) {
      this.cache = tempCache;
    } else {
      this.transactions[this.transactions.length - 1].cache = tempCache;
    }
    return RETURN_CODES.OK;
  }

  /**
   * @description - Rolls back the current transaction
   * @returns {string} - Returns OK if transaction rolled back successfully, NO_TRANSACTION if no transaction is in progress
   */
  rollback(): string {
    if (isEmptyArray(this.transactions)) {
      return RETURN_CODES.NO_TRANSACTION;
    }
    this.transactions.pop();
    return RETURN_CODES.OK;
  }

  /**
   * @description Sets a key to a value
   * @param key Key to be set
   * @param value Value to be set
   * @returns {string} Returns OK if key is set successfully
   */
  set(key: string, value: string): string {
    const cache = isEmptyArray(this.transactions)
      ? this.cache
      : this.transactions[this.transactions.length - 1].cache;
    cache[key] = value;
    return RETURN_CODES.OK;
  }

  /**
   * @description Gets the value of a key
   * @param key Key to be retrieved
   * @returns {string} Returns the value of the key if it exists, KEY_NOT_FOUND if key does not exist
   */
  get(key: string): string {
    const cache = isEmptyArray(this.transactions)
      ? this.cache
      : this.transactions[this.transactions.length - 1].cache;
    if (!cache[key]) {
      return RETURN_CODES.KEY_NOT_FOUND;
    }
    return cache[key];
  }

  /**
   * @description Deletes a key
   * @param key Key to be deleted
   * @returns {string} Returns OK if key is deleted successfully
   */
  delete(key: string): string {
    const cache = isEmptyArray(this.transactions)
      ? this.cache
      : this.transactions[this.transactions.length - 1].cache;
    if (!cache[key]) {
      return RETURN_CODES.KEY_NOT_FOUND;
    }
    delete cache[key];
    return RETURN_CODES.OK;
  }

  /**
   * @description Gets the number of occurences of a value in the cache
   * @param value Value to be counted
   * @returns {number} Returns the number of times a value appears in the cache
   */
  count(value: string): number {
    const cache = isEmptyArray(this.transactions)
      ? this.cache
      : this.transactions[this.transactions.length - 1].cache;
    return Object.values(cache).filter((v) => v === value).length;
  }
}

export default MemoryStorage;
