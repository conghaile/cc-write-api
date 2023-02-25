import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const poolargs = process.env.POSTGRES;
const pool = new Pool(JSON.parse(poolargs));
export default pool;
//# sourceMappingURL=pool.js.map