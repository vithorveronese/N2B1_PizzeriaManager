import { getDbConnection } from "./dbservice";

export async function createCategoriesTable(query) {
  return new Promise((resolve, reject) => {
      let dbCx = getDbConnection();        
      dbCx.transaction(tx => {
          tx.executeSql(`CREATE TABLE IF NOT EXISTS categories
          (
            id Integer not null primary key AUTOINCREMENT,
            name text not null,
            description text
          )`);
          resolve(true); 
      },
          error => {
              console.log(error);
              resolve(false);
          }
      );
  });
};

export async function createProductsTable(query) {
  return new Promise((resolve, reject) => {
      let dbCx = getDbConnection();        
      dbCx.transaction(tx => {
          tx.executeSql(`CREATE TABLE IF NOT EXISTS products
          (
            id Integer not null primary key AUTOINCREMENT,
            name text not null,
            description text,
            price decimal not null,
            category_id integer not null,
            FOREIGN KEY(category_id) REFERENCES categories(id)
          )`);
          resolve(true); 
      },
          error => {
              console.log(error);
              resolve(false);
          }
      );
  });
};

export async function createSalesTable(query) {
  return new Promise((resolve, reject) => {
      let dbCx = getDbConnection();
      dbCx.transaction(tx => {
          tx.executeSql(`CREATE TABLE IF NOT EXISTS sales
          (
            id Integer not null primary key AUTOINCREMENT,
            value decimal not null,
            date text not null
          )`);
          resolve(true); 
      },
          error => {
              console.log(error);
              resolve(false);
          }
      );
  });
};

export async function createSalesProductTable(query) {
  return new Promise((resolve, reject) => {
      let dbCx = getDbConnection();        
      dbCx.transaction(tx => {
          tx.executeSql(`CREATE TABLE IF NOT EXISTS sales_product
          (
            id Integer not null primary key AUTOINCREMENT,
            sale_id integer not null,
            product_id integer not null,
            FOREIGN KEY(sale_id) REFERENCES sales(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
          )`);
          resolve(true); 
      },
          error => {
              console.log(error);
              resolve(false);
          }
      );
  });
};
