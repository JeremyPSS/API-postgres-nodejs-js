const pool = require("../db/db");

exports.getApp_user = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM app_user");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApp_userByID = async (req, res) => {
  try {
    const {id_user} = req.body;
    const result = await pool.query("SELECT * FROM app_user WHERE id_product = $id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createApp_user = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await pool.query(
      "INSERT INTO product (name, description) VALUES ($1,$2) RETURNING *",
      [name, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
