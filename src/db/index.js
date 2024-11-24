import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("ludomania.db");

export const createSessionsTable = async () => {
  const promise = new Promise(async (resolved, rejected) => {
    const query =
      "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) ";
    await db.withTransactionAsync((tx) =>
      tx.executeSql(
        query,
        [],
        (_, result) => resolved(result),
        (_, result) => rejected(result)
      )
    );
  });
  return promise;
};
