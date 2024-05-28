const fs = require("fs");
const path = require("path");
const Manufacturer = require("../Models/ManufacturerModel.js");
const { Console } = require("console");
var casual = require("casual");
var connection = require("../connection.js");


var manufacturers = [];
var id = 0;

loadDataFromDatabase();

function loadDataFromDatabase() {
  const query = 'SELECT id, name, country, city, address, addedby FROM manufacturer';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error loading data from database:', error);
      manufacturers = [];
      return;
    }

    // Find the maximum ID from the results
    maxId = results.reduce((max, entity) => Math.max(max, entity.id), 0);

    // Set the next available ID
    id = maxId + 1;

    // Create Manufacturer objects from the retrieved data
    manufacturers = results.map((entityData) => new Manufacturer(
      entityData.id,
      entityData.name,
      entityData.country,
      entityData.city,
      entityData.address,
      entityData.addedby
    ));
  });
}


function getAllManufacturers(req, res) {
  res.json(manufacturers);
}

function getManufacturerById(req, res) {
  const id = parseInt(req.params.id);

  // Query the database to get manufacturer by id
  const query = 'SELECT * FROM manufacturer WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error retrieving manufacturer from database:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    // If manufacturer found, send it in the response
    if (results.length > 0) {
      const manufacturer = results[0];
      res.json(manufacturer);
    } else {
      res.status(404).send(`Manufacturer with id ${id} not found`);
    }
  });
}

function deleteManufacturer(req, res) {
  const id = parseInt(req.params.id);

  // Delete manufacturer from the database
  const deleteManufacturerQuery = 'DELETE FROM manufacturer WHERE id = ?';
  connection.query(deleteManufacturerQuery, [id], (error, results) => {
    if (error) {
      console.error('Error deleting manufacturer:', error);
      res.status(500).send('Error deleting manufacturer');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send(`Manufacturer with id ${id} was not found`);
    } else {
      manufacturers = manufacturers.filter((manufacturer) => manufacturer.id !== id);
      res.status(204).send('Manufacturer deleted successfully');
    }
  });
}

function addManufacturer(req, res) {
  try {
    const { name, country, city, address, username} = req.body;

    // Check if all fields are filled in
    if (!name || !country || !city || !address) {
      res.status(400).send("All fields must be filled in");
      return;
    }
    
    console.log("id",id);

    // Insert new manufacturer data into the database
    const query = 'INSERT INTO manufacturer (id,name, country, city, address,addedby) VALUES (?,?, ?, ?, ?,?)';
    connection.query(query, [id,name, country, city, address, username], (error, results) => {
      if (error) {
        console.error('Error adding manufacturer to database:', error);
        res.status(500).send('Error adding manufacturer');
        return;
      }
      

      const newManufacturerId = results.insertId;
      const newManufacturer = {
        id: newManufacturerId,
        name: name,
        country: country,
        city: city,
        address: address,
        addedby: username
      };

      id++;
      manufacturers.push(newManufacturer);

      res.status(201).json(newManufacturer);
    });
  } catch (error) {
    console.error("Error adding manufacturer:", error);
    res.status(500).send("Error adding manufacturer");
  }
}


function editManufacturer(req, res) {
  try {
    const id = parseInt(req.params.id);
    const index = manufacturers.findIndex((entity) => entity.id === id);

    if (index !== -1) {
      const { name, country, city, address, username } = req.body;

      // Check if all fields are filled in
      if (!name || !country || !city || !address) {
        res.status(400).send("All fields must be filled in");
        return;
      }

      // Update manufacturer data in the 'manufacturers' array
      manufacturers[index] = new Manufacturer(id, name, country, city, address,username);

      // Update manufacturer data in the database
      const updateManufacturerQuery = 'UPDATE manufacturer SET name = ?, country = ?, city = ?, address = ? WHERE id = ?';
      connection.query(updateManufacturerQuery, [name, country, city, address, id], (error, results) => {
        if (error) {
          console.error('Error updating manufacturer in database:', error);
          res.status(500).send('Error editing Manufacturer');
          return;
        }

        res.json(manufacturers[index]);
      
      });
    } else {
      res.status(404).send(`Manufacturer with id ${id} was not found`);
    }
  } catch (error) {
    console.error("Error editing manufacturer:", error);
    res.status(500).send("Error editing Manufacturer");
  }
}


module.exports = {
    getAllManufacturers,
    getManufacturerById,
    deleteManufacturer,
    addManufacturer,
    editManufacturer,
};
