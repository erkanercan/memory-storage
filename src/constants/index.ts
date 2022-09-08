export enum RETURN_CODES {
  OK = 'OK',
  NO_TRANSACTION = 'NO TRANSACTION',
  KEY_NOT_FOUND = 'Key not found',
  ENTER_KEY_VALUE = 'Please enter a key and value',
  ENTER_KEY = 'Please enter a key',
  ENTER_VALUE = 'Please enter a value',
  INVALID_COMMAND = 'Invalid command',
}

export enum COMMANDS {
  SET = 'SET',
  GET = 'GET',
  DELETE = 'DELETE',
  COUNT = 'COUNT',
  BEGIN = 'BEGIN',
  COMMIT = 'COMMIT',
  ROLLBACK = 'ROLLBACK',
  HELP = 'HELP',
}
