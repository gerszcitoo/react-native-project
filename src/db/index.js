import * as SQLite from "expo-sqlite";

let dbPromise = null;

let isDatabaseReady = false;

export const waitForDatabaseReady = async () => {
  while (!isDatabaseReady) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

export const initializeDatabase = async () => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise(async (resolve, reject) => {
    try {
      const db = await SQLite.openDatabaseAsync("ludomania.db");

      const checkTableExists = await db.prepareAsync(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'
      `);
      const result = await checkTableExists.executeAsync();
      const tables = await result.getAllAsync();
      await checkTableExists.finalizeAsync();

      if (tables.length === 0) {
        await db.execAsync(`
          CREATE TABLE sessions (
            localId TEXT PRIMARY KEY NOT NULL,
            email TEXT NOT NULL,
            token TEXT NOT NULL
          )
        `);
      }

      isDatabaseReady = true;
      resolve(db);
    } catch (error) {
      isDatabaseReady = false;
      reject(error);
    }
  });

  return dbPromise;
};

export const getDatabase = async () => {
  await waitForDatabaseReady();
  if (!dbPromise) {
    throw new Error("La base de datos aún no ha sido inicializada");
  }
  return dbPromise;
};

export const createSessionsTable = async () => {
  try {
    const db = await getDatabase();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessions (
        localId TEXT PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        token TEXT NOT NULL
      )
    `);
  } catch (error) {
    throw error;
  }
};

export const getActiveSession = async () => {
  try {
    const db = await getDatabase();
    const statement = await db.prepareAsync("SELECT * FROM sessions LIMIT 1");
    const result = await statement.executeAsync();
    const sessions = await result.getAllAsync();
    await statement.finalizeAsync();
    return sessions.length > 0 ? sessions[0] : null;
  } catch (error) {
    throw error;
  }
};

export const insertSession = async ({ email, localId, token }) => {
  try {
    const db = await getDatabase();

    const checkStatement = await db.prepareAsync(`
      SELECT COUNT(*) AS count FROM sessions WHERE localId = ?
    `);
    const checkResult = await checkStatement.executeAsync(localId);
    const [{ count }] = await checkResult.getAllAsync();
    await checkStatement.finalizeAsync();

    if (count > 0) {
      return;
    }

    const insertStatement = await db.prepareAsync(`
      INSERT INTO sessions (email, localId, token)
      VALUES (?, ?, ?)
    `);
    await insertStatement.executeAsync(email, localId, token);
    await insertStatement.finalizeAsync();
  } catch (error) {
    throw error;
  }
};

export const insertUniqueSession = async ({ email, localId, token }) => {
  try {
    const existingSession = await getActiveSession();

    if (existingSession && existingSession.localId === localId) {
      return;
    }

    await clearSessions();
    await insertSession({ email, localId, token });
  } catch (error) {
    throw error;
  }
};

export const fetchSessions = async () => {
  try {
    const db = await getDatabase();
    const statement = await db.prepareAsync("SELECT * FROM sessions");
    const result = await statement.executeAsync();
    const sessions = await result.getAllAsync();
    await statement.finalizeAsync();
    return sessions;
  } catch (error) {
    throw error;
  }
};

export const clearSessions = async () => {
  try {
    const db = await getDatabase();
    await db.execAsync("DELETE FROM sessions");
  } catch (error) {
    throw error;
  }
};
