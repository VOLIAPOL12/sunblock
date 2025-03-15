import { pool } from "../config/db.js";

export const getSuburbCoordinates = async (req, res) => {
    try {
        const suburbs = await pool.query(`SELECT DISTINCT ON ("locality") "locality", "Lat_precise", "Long_precise"
            FROM victorian_suburb_coordinates 
            WHERE "locality" IS NOT NULL 
            AND "Lat_precise" IS NOT NULL 
            AND "Long_precise" IS NOT NULL
            ORDER BY "locality", "Lat_precise" DESC;`);
            
        res.status(200).json({ success: true, data: suburbs });
    } catch (error) {
        console.log(error);
    }
}