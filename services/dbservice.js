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

export function getProduct(productCode) {

    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProducts where ProductCode=?';
            tx.executeSql(query, [productCode],
                (tx, records) => {
                    let productReturnList = [];
                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            Id: records.rows.item(n).Id,
                            ProductCode: records.rows.item(n).ProductCode,
                            Description: records.rows.item(n).Description,
                            UnitPrice: records.rows.item(n).UnitPrice
                        }
                        console.log('obj => ' + JSON.stringify(obj))
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

export function getProducts() {

    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProducts';
            tx.executeSql(query, [],
                (tx, records) => {
                    var productReturnList = []

                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
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

export function getOrders() {

    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbOrders';
            tx.executeSql(query, [],
                (tx, records) => {
                    var orderReturnList = []
                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            Id: records.rows.item(n).Id,
                            Date: records.rows.item(n).Date,
                            OrderCode: records.rows.item(n).OrderCode,
                            OrderItens: []
                        }
                        orderReturnList.push(obj);
                    }
                    resolve(orderReturnList);
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

export function deleteTables(query) {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, records) => {
                    var orderItemReturnList = []
                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            Id: records.rows.item(n).Id,
                            ProductId: records.rows.item(n).ProductId,
                            TotalPrice: records.rows.item(n).TotalPrice,
                            OrderId: records.rows.item(n).OrderId
                        }
                        orderItemReturnList.push(obj);
                    }
                    resolve(orderItemReturnList);
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

export function getOrderItens(orderId) {
    return new Promise((resolve, reject) => {
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbOrderItens WHERE OrderId=?';
            tx.executeSql(query, [orderId],
                (tx, records) => {
                    var orderItemReturnList = []
                    for (let n = 0; n < records.rows.length; n++) {
                        let obj = {
                            Id: records.rows.item(n).Id,
                            ProductId: records.rows.item(n).ProductId,
                            TotalPrice: records.rows.item(n).TotalPrice,
                            OrderId: records.rows.item(n).OrderId
                        }
                        orderItemReturnList.push(obj);
                    }
                    resolve(orderItemReturnList);
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
