const express = require('express');
const cors = require("cors");

const app = (database) => {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.post("/comment", async (req, res) => {
        const { name, comment } = req.body;

        if (!name || !comment) {
            return res.status(400).send({
                status: 'error',
                message: 'Required fields are missing'
            });
        }

        try {
            const id = await database.createComment(name, comment);
            res.status(201).send({
                status: 'success',
                data: {
                    msg: `Comment with id ${id} was created`,
                    id: id
                }
            });
        } catch (err) {
            res.status(500).send({
                status: 'error',
                message: 'Database operation failed'
            });
        }
    });

    return app;
}

module.exports = app;