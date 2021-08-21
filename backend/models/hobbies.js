const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Hobby {

    static async findAll() {
        const result = await db.query(
            `SELECT id, activity, user_username
        FROM hobbies`
        )
        return result.rows
    }

    static async findOne(id) {
        const hobbyRes = await db.query(
            `SELECT id, activity, user_username
            FROM hobbies
            WHERE id = $1`,
            [id]
        );

        const hobby = hobbyRes.rows[0];

        if (!hobby) {
            throw new ExpressError(`There exits no hobby '${id}'`, 404);
        }

        const usersRes = await db.query(
            `SELECT username, email 
        FROM users
        WHERE username = $1`,
            [hobby.user_username]
        );

        hobby.userList = usersRes.rows[0];

        return hobby;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO hobbies (activity, user_username) 
        VALUES ($1, $2) 
        RETURNING id, activity, user_username`,
            [data.activity, data.user_username]
        );

        return result.rows[0];
    }

    // static async update(id, data) {
    //     let { query, values } = sqlForPartialUpdate("jobs", data, "id", id);

    //     const result = await db.query(query, values);
    //     const job = result.rows[0];

    //     if (!job) {
    //         throw new ExpressError(`There exists no job '${id}`, 404);
    //     }

    //     return job;
    // }

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM hobbies 
        WHERE id = $1 
        RETURNING id`,
            [id]
        );

        if (result.rows.length === 0) {
            throw new ExpressError(`There exists no hobby '${id}`, 404);
        }
    }

    // static async apply(id, username, state) {
    //     const result = await db.query(
    //         `SELECT id 
    //     FROM jobs 
    //     WHERE id = $1`,
    //         [id]
    //     );

    //     if (result.rows.length === 0) {
    //         throw ExpressError(`There exists no job '${id}`, 404);
    //     }

    //     await db.query(
    //         `INSERT INTO applications (job_id, username, state)
    //     VALUES ($1, $2, $3)`,
    //         [id, username, state]
    //     );
    // }
}

module.exports = Hobby;
