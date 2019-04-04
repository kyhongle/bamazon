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
  bamazon();
});

function bamazon() {
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
          message: "Which product you would like to buy?",
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
        // console.log(answer.choice);
        // console.log(answer.quantity);
        var item = answer.choice;
        var quant = parseInt(answer.quantity);
        connection.query(
          `SELECT * FROM products WHERE product_name = "${item}"`,
          function(err, res) {
            if (res[0].stock_quantity >= quant) {
              inquirer
                .prompt([
                  {
                    type: "list",
                    message: `Would you still like to purchase ${item} for ${res[0]
                      .price * quant}`,
                    choices: ["yes", "no"],
                    name: "boolean"
                  }
                ])
                .then(function(answer) {
                  if (answer.boolean === "yes") {
                    connection.query(
                      `UPDATE products SET stock_quantity="${res[0]
                        .stock_quantity - quant}" WHERE product_name="${item}"`,
                      function(err, res) {
                        console.log("item succesfully purchased");
                      }
                    );
                  } else {
                    bamazon();
                  }
                });
            } else {
              console.log("out of stock");
            }
          }
        );
      });
  });
}
