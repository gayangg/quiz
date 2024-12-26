import { sql } from "../database/database.js";

const getTopics = async () => {
    const rows = await sql`
        SELECT id, name 
        FROM topics
        ORDER BY name ASC
    `;
    return rows;
};

const addTopic = async (name) => {
    await sql`
        INSERT INTO topics (name)
        VALUES (${name})
    `;
};

const deleteTopic = async (id) => {
    await sql`(
        DELETE FROM question_answers 
        WHERE question_id IN (
            SELECT id
            FROM questions
            WHERE topic_id = ${id}
        );

        DELETE FROM questions
        WHERE topic_id = ${id};

        DELETE FROM topics
        WHERE id = ${id};
    )`;
};

export { getTopics, addTopic, deleteTopic}