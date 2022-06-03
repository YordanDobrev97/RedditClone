const db = require('mongoose')
const url = 'mongodb+srv://baseuser:Jgui3gU9qRZ8CvSi@cluster0.uwfj1du.mongodb.net/redditdb?retryWrites=true&w=majority'

db.connect(url)
db.connection.once("open", () => console.log("Connected to database!"))
db.connection.on('error', console.error)

module.exports = db
