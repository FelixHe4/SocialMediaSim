import { promisify } from "util";
import path from "path";
import { Database } from "sqlite3";

const db = new Database(path.join(process.cwd(), "database.db"));

export const query = promisify(db.all).bind(db);
export const get = promisify(db.get).bind(db);

export default db;
