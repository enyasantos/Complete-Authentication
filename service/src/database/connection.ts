import mongoose from 'mongoose'
import endpoint from '../../endpoints.config'

mongoose.connect(endpoint.MONGOURL)

mongoose.connection.on('connected', (err, res) => {
  console.info('🗳️  - Mongoose is connected')
})

mongoose.connection.on('error', err => {
    console.error('🚨 - MongoDB connection error: ' + err)
})

