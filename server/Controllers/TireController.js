const fs = require("fs");
const path = require("path");
const Entity = require("server\Models\TireModel.js");
const { Console } = require("console");
var casual = require("casual");
var manufacturers = require("server\Models\ManufacturerModel.js");
var connection = require("server\connection.js");

var tires = [];
var id = 0;

loadDataFromDatabase();


function loadDataFromDatabase() {
 const query = 'SELECT id, manufacturer_id, model, price, size, quantity, description, addedby FROM tire';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error loading data from database:', error);
      tires = [];
      return;
    }
  
    // Find the maximum ID from the results
    const maxId = results.reduce((max, entity) => Math.max(max, entity.id), 0);
  
    // Set the next available ID
    id = maxId + 1;

  
    // Create Tire objects from the retrieved data
    tires = results.map((entityData) => new Entity(
      entityData.id,
      entityData.manufacturer_id,
      entityData.model,
      entityData.price,
      entityData.size,
      entityData.quantity,
      entityData.description,
      entityData.addedby
    ));

  });
}


function getAllTires(req, res) {
  res.json(tires);
}

function getTireById(req, res) {
  const id = parseInt(req.params.id);

  const query = 'SELECT * FROM tire WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error retrieving tire from database:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length > 0) {
      const manufacturer = results[0];
      res.json(manufacturer);
    } else {
      res.status(404).send(`Tire with id ${id} not found`);
    }
  });
}

function deleteTire(req, res) {
  const id = parseInt(req.params.id);

  const deleteTireQuery = 'DELETE FROM tire WHERE id = ?';
  connection.query(deleteTireQuery, [id], (error, results) => {
    if (error) {
      console.error('Error deleting tire:', error);
      res.status(500).send('Error deleting tire');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send(`Tire with id ${id} was not found`);
    } else {
      tires = tires.filter((entity) => entity.id !== id);
      res.status(204).send('Tire deleted successfully');
    }
  });
}

function addTire(req, res) {
 try{
  const { brand, model, price, size, quantity, description, username } = req.body;

  if (
    brand === undefined ||
    model === undefined ||
    price === undefined ||
    size === undefined ||
    quantity === undefined ||
    description === undefined
  ) {
    res.status(400).send("All fields must be filled in");
    return;
 }
  if(price <= 0 || quantity <= 0){
  res.status(400).send("Price and quantity must be positive numbers");
  return;}
  if(isNaN(price) || isNaN(quantity) || isNaN(brand)){
    res.status(400).send("Price,brand and quantity must be numbers");
    return;
  }



  const query = 'INSERT INTO tire (id, manufacturer_id, model, price, size, quantity, description,addedby) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, brand, model, price, size, quantity, description, username], (error, results) => {
    if (error) {
      console.error('Error adding tire to database:', error);
      res.status(500).send('Error adding tire');
      return;
    }
    const tire = new Entity(id++, brand, model, price, size, quantity, description,username);
    tires.push(tire);

    res.json(tire);
  });
} catch (error) {
  console.error("Error adding tire:", error);
  res.status(500).send("Error adding tire");
}
}

function editTire(req, res) {
  try {
    const id = parseInt(req.params.id);
    const index = tires.findIndex((entity) => entity.id === id);

    if (index !== -1) {
      const { brand, model, price, size, quantity, description, username } = req.body;

      if (
        brand === undefined ||
        model === undefined ||
        price === undefined ||
        size === undefined ||
        quantity === undefined ||
        description === undefined
      ) {
        res.status(400).send("All fields must be filled in");
        return;
      }

      if (
        model === "" ||
        price === "" ||
        size === "" ||
        quantity === "" ||
        description === ""
      ) {
        res.status(400).send("All fields must be filled in");
        return;
      }

      if (isNaN(price) || isNaN(quantity) || isNaN(brand)) {
        res.status(400).send("Price,brand and quantity must be numbers");
        return;
      }

      if (parseFloat(price) <= 0 || parseInt(quantity) <= 0) {
        res.status(400).send("Price and quantity must be positive numbers");
        return;
      }

      tires[index] = new Entity(
        id,
        parseInt(brand),
        model,
        parseFloat(price),
        parseFloat(size),
        parseInt(quantity),
        description,
        username
      );

      const query = 'UPDATE tire SET manufacturer_id = ?, model = ?, price = ?, size = ?, quantity = ?, description = ?, addedby = ? WHERE id = ?';
      connection.query(query, [brand, model, price, size, quantity, description, username,id], (error, results) => {
        if (error) {
          console.error('Error updating tire in database:', error);
          res.status(500).send('Error updating tire');
          return;
        }
      });
      res.json(tires[index]);
    } else {
      res.status(404).send(`Entity with id ${id} was not found`);
    }
  } catch (error) {
    console.error("Error editing tire:", error);
    res.status(500).send("Error editing tire");
  }
}

module.exports = {
  getAllTires,
  getTireById,
  deleteTire,
  addTire,
  editTire,
};
