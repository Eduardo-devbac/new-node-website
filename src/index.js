import express, { urlencoded } from "express"
import { fileURLToPath } from "url"
import path from "path"
import morgan from "morgan"
import home from "./routes/home.js"
import users from "./routes/users.js"
import ejs from "ejs"
import dotenv from 'dotenv'


//initializacions
const website = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//settings
website.set('port', 3000);
website.set('view engine', 'ejs');
website.set('views', path.join(__dirname, 'src/views'))
website.set('app name', 'CRUD');
dotenv.config();

//middlewares
website.use(express.text());
website.use(express.json())
website.use(morgan('dev'))
website.use(urlencoded({extended: true}))
website.use((res, req, next) => {
    next()
})

//routes
website.use(home)
website.use(users)

//global variables

//public
website.use(express.static("public"));

console.log(process.env.DB_USER);
website.listen(website.get('port'));
console.log(`server ${website.get('app name')} on port ${website.get('port')}`)

