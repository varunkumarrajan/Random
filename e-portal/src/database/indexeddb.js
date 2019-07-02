import Dexie from 'dexie';
class iDB {
    static init(databseName) {
        return new Dexie(databseName);
     }
} 
export default iDB;