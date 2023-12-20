import express from 'express';
import pg from 'pg';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
const { Pool } = pg;
dotenv.config();

const APIPORT = 3000;

const app = express();

const pool = new Pool ({
  connectionString: process.env.DB_URL
});

app.use(express.static('./public'));

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

// User Routes

app.get('/api/users' , async (req,res) => {
  console.log("Fetching Users")
  try {
    const result = await pool.query(`SELECT * FROM users;`)
    res.status(200).send(result.rows)
  } catch (err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

app.post('/api/users', async (req,res) => {
  console.log('Fetching User Id')
  const userData = req.body
  try {
    const result = await pool.query(`SELECT id FROM users WHERE username = $1 AND password = $2`, [userData.userName, userData.password])
    res.status(200).send(result.rows)
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

app.put('/api/users', async (req,res) => {
  console.log('Creating User')
  const userData = req.body
  try {
    const result = await pool.query(`INSERT INTO users ( username, password ) VALUES ($1,$2) RETURNING id`, [userData.userName, userData.password] )
    res.status(200).send(result.rows)
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

app.delete('/api/users/:id', async (req,res) => {
  console.log('Deleting User')
  const userId = req.params.id
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId])
    res.status(204).send('User Deleted Successfully')
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

// Goal Routes

app.get('/api/goal/:id', async (req,res) => {
  console.log('Fetching Goals')
  const userId = req.params.id
  try {
    const result = await pool.query(`SELECT * FROM goal WHERE user_id = $1`, [userId])
    res.status(200).send(result.rows)
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

app.put('/api/goal/:id', async (req,res) => {
  console.log('Creating Goal')
  const userId = req.params.id
  const userData = req.body
  try {
    const result = await pool.query(`INSERT INTO goal (user_id, goal_title) VALUES ($1,$2);`, [userId,userData.goalTitle])
    res.status(200).send('Goal Created Successfully')
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

app.delete('/api/goal/:id', async (req,res) => {
  console.log('Deleting Goal')
  const goalId = req.params.id
  try {
    const result = await pool.query(`DELETE FROM goal WHERE id = $1`,[goalId])
    res.status(204).send('Successfully Deleted Goal')
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

// Goal Details Routes

app.get('/api/goal/details/:id', async (req,res) => {
  console.log('Fetching Goal Details')
  const goalId = req.params.id
  try {
    const result = await pool.query(`SELECT * FROM goal_details WHERE goal_id = $1`, [goalId])
    res.status(200).send(result.rows)
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

app.put('/api/goal/details/:id', async (req,res) => {
  const goalId = req.params.id
  const userData = req.body
  try {
    const result = await pool.query(`INSERT INTO goal_details (goal_id, update_text) VALUES ($1,$2)`, [goalId,userData.goalDetails])
    res.status(200).send('Goal Update Successfully Created')
  } catch(err) {
    console.error(err)
    res.status(400).send('Bad Request')
  }
})

// Route catching/middleware

app.use((req,res,next) => {
  next({message: 'The path you are looking for does not exist',
status: 400})
})

app.use((err,req,res,next) => {
  console.log('Unknown Route Hit')
  res.status(err.status).json({error:err})
})

app.listen(APIPORT || 3000, (req,res) => {
  console.log('Server is listening on port 3000')
})