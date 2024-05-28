const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tireController = require('./Controllers/TireController');
const manufacturerController = require('./Controllers/ManufacturerController');
const userController = require('./Controllers/UserController');
const connection = require('./connection');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

//tire routes
app.get('/api/tires', tireController.getAllTires);
app.get('/api/tires/:id', tireController.getTireById);
app.delete('/api/tires/:id', tireController.deleteTire);
app.post('/api/tires', tireController.addTire);
app.put('/api/tires/:id', tireController.editTire);

//manufacturer routes
app.get('/api/manufacturers', manufacturerController.getAllManufacturers)
app.get('/api/manufacturers/:id', manufacturerController.getManufacturerById)
app.delete('/api/manufacturers/:id', manufacturerController.deleteManufacturer)
app.post('/api/manufacturers', manufacturerController.addManufacturer)
app.put('/api/manufacturers/:id', manufacturerController.editManufacturer)


//user routes
app.post('/api/login', userController.loginUser);
app.post('/api/register', userController.registerUser);


//Default route
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});

app.close = () => {
  connection.end();
};