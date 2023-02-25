import dotenv from 'dotenv';
dotenv.config();
async function insert(queryValues, pool) {
    let query = {
        text: `INSERT INTO ${process.env.TABLE} VALUES($1, $2, $3)`,
        values: [...queryValues]
    };
    const client = await pool.connect();
    await client.query(query);
    await client.release();
}
export default insert;
//# sourceMappingURL=handler.js.map