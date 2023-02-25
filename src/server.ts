import dotenv from 'dotenv'
import express, {Express, Request, Response} from 'express'
import bodyParser from 'body-parser'
import insert from './handler.js'
import pg from 'pg'

dotenv.config()

const port: number = Number(process.env.PORT)
const server: Express = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const pool = new pg.Pool(JSON.parse(process.env.POSTGRES!))


server.post("/api", async (req: Request, res: Response) => {
    // Super janky JSON validation that only works due to the simplicity of incoming messages
    // It was either this or import yet another library I don't understand
    let reqKeys: any = Object.keys(req.body)
    let reqVals: any = Object.values(req.body)
    let desiredKeys: any = ['post', 'time', 'coin']
    let desiredTypes: any = ['number', 'number', 'string']
    for (let i: number = 0; i < desiredKeys.length; i++) {
        if (reqKeys[i] !== desiredKeys[i]) {
            res.sendStatus(400)
            break
        } else if (typeof reqVals[i] !== desiredTypes[i]) {
            res.sendStatus(400)
            break
        } else if (i === 2) {
            let sqlRes: any = await insert(reqVals, pool)
            console.log(sqlRes)
            res.sendStatus(200)
        }
    }
})

server.listen(process.env.PORT, process.env.HOST)
console.log("Server listening on port", port)