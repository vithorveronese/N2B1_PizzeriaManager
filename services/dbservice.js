import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('tbUsers.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbUsers
        (
            id text not null primary key,
            name text not null,
            email text not null,
            code text not null,
            password text not null      
        )`;
        let dbCx = getDbConnection();        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};




export function getAllUsers() {

    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbUsers';
            tx.executeSql(query, [],
                (tx, records) => {
                    var userReturnList = []

                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            id: records.rows.item(n).id,
                            name: records.rows.item(n).name,
                            email: records.rows.item(n).email,
                            code: records.rows.item(n).code,
                            password: records.rows.item(n).password,
                        }
                        userReturnList.push(obj);
                    }
                    resolve(userReturnList);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function insertUser(user) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbUsers (id, code, name, email, password) values (?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [user.id, user.code, user.name, user.email, user.password],
                (tx, result) => {
                    resolve(result.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function updateUser(user) {
    return new Promise((resolve, reject) => {
        let query = 'update tbUsers set name=?, email=?, password=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [user.name, user.email, user.password, user.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}



export function deleteUserDB(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbUsers where id=?';
        let dbCx = getDbConnection();
        console.log('userId => ' + id)
        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function deleteAllUsers() {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbUsers';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
