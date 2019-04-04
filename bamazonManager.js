var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  //   viewProducts();
  //   viewLow();
  addInvent();
});

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
  });
}

function viewLow() {
  connection.query("SELECT * FROM products WHERE stock_quantity<5", function(
    err,
    res
  ) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
  });
}

function addInvent() {
  connection.query("SELECT * FROM products", function(err, results) {
    inquirer
      .prompt([
        {
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which product you would like to update?",
          name: "choice"
        },
        {
          type: "list",
          message: "how many of this product would you like to buy?",
          choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          name: "quantity"
        }
      ])
      .then(function(answer) {
        connection.query(
          `SELECT * FROM products WHERE product_name="${answer.choice}"`,
          function(err, res) {
            //console.log(res);
            console.log(parseInt(answer.quantity) + res[0]);
            connection.query(
              `UPDATE products SET stock_quantity="${parseInt(answer.quantity) +
                res[0].stock_quantity}" WHERE product_name="${answer.choice}"`,
              function(err, res) {
                console.log("product updated successfully");
              }
            );
          }
        );
      });
  });
}
