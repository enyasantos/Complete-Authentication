import express from 'express'
import { urlencoded, json } from 'body-parser'
import routes from './routes'
import cors from 'cors'
import './database/connection.ts'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(json())
app.use(urlencoded({ extended: true }))
const PORT = 3033


app.listen(PORT, () => {
    console.log(`🚀 - The application is listening on port ${PORT}!`);
})