import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzeria.db');
    return cx;
}

export async function createTable(query) {
    return new Promise((resolve, reject) => {
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


export function getProduct() {

    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProducts where ProductCode=?';
            tx.executeSql(query, [productCode],
                (tx, records) => {
                    var productReturnList = []

                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            Id: records.rows.item(n).Id,
                            ProductCode: records.rows.item(n).ProductCode,
                            Description: records.rows.item(n).Description,
                            UnitPrice: records.rows.item(n).UnitPrice
                        }
                        productReturnList.push(obj);
                    }
                    resolve(productReturnList);
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

export function insertRecord(recordFields, query) {

    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, recordFields,
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


export function updateRecord(recordFields, query) {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, recordFields,
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



export function deleteRecordDB(query, recordId) {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [recordId],
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
