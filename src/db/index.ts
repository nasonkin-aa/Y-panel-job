import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let db: Database | null = null;

const openDB = async () => {
  db = await open({
    filename: 'src/db/expositions.db',
    driver: sqlite3.Database,
  });
}

export {
  openDB,
  db,
};
