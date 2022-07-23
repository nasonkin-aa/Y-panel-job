// Имитация базы данных

import { TEquipment } from '../types';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let db: Database | null = null;

const openDB = async () => {
  db = await open({
    filename: 'src/db/expositions.db',
    driver: sqlite3.Database,
  });
}

const Eq : TEquipment[] = [
];
// eslint-disable-next-line import/prefer-default-export
export {
  openDB,
  db,
};
