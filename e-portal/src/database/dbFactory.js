import firebase from './firebasedb';
import iDB from './indexeddb';
export default class dbFactory {
    static create(dbName) {
        switch (dbName) {
            case 'firebase':
                return firebase;
            case 'indexeddb':
                return iDB;
            default:
                return firebase;
        }
    }
}