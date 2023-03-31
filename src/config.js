require('dotenv').config();

const host = 'localhost'
const PORT = process.env.PORT || 5000

const pgConfig = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,	
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE    
}

module.exports = { 
	pgConfig,
	PORT,
	host,
}