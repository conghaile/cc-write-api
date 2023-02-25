import dotenv from 'dotenv'

dotenv.config()

async function insert(queryValues: any[], pool: any): Promise<any> {
    let query: any = {
        text: `INSERT INTO ${process.env.TABLE} VALUES($1, $2, $3)`,
        values: [...queryValues]
    }
    const client: any = await pool.connect()
    await client.query(query)
    await client.release()
        

}

export default insert