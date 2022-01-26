const express = require('express')
const app = express()

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vehicle_rent'
})
connection.connect(error => {
  if(error) throw error;
  console.log('Successfully connected to database')
})

app.use(express.urlencoded({
  extended: true
}))


app.post('/add-vehicle', (req, res) => {
  const data = {
    manufacture: req.body.manufacture,
    model: req.body.model,
    plate_number: req.body.plate_number,
    color: req.body.color
  }
  connection.query('INSERT INTO vehicle SET ?;', [data], (error, results, fields) => {
    if(error) {
      res.send({
        success: false,
        messages: error.message
      })
    }
    return res.json({
      success: true,
      messages: 'Successfully added'
    })
  })
  
})

app.get('/vehicles', (req, res) => {
  connection.query('SELECT * FROM vehicle', (error, results, fields) => {
    if(error) {
      res.send({
        success: false,
        messages: error.message
      })
    }
    return res.json({
      success: true,
      messages: 'List of vehicles',
      data: results
    })
  })
})

app.patch('/vehicle/edit/:id', (req, res) => {
  const dataEdit = {
    manufacture: req.body.manufacture,
    model: req.body.model,
    plate_number: req.body.plate_number,
    color: req.body.color
  }
  const id = req.params.id
  connection.query('UPDATE vehicle SET ? WHERE id = ?;', [dataEdit, id], (error, result) => {
    if(error) {
      res.send({
        success: false,
        messages: error.message
      })
    }
    return res.json({
      success: true,
      messages: 'Edited successfully'
    })
  })
})

app.delete('/vehicle/delete/:id', (req, res) => {
  const id = req.params.id
  connection.query('DELETE FROM vehicle WHERE id=?;', [id], (error, result) => {
    if(error) {
      res.send({
        success: false,
        messages: error.message
      })
    }
    return res.json({
      success: true,
      messages: 'Deleted successfully'
    })
  })
})

app.listen(5000, ()=> {
  console.log('App running on port 5000')
})