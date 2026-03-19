const { json } = require("express");
const pool = require("../db/db");

exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByID = async (req, res) => {
  try {
      const id_product = parseInt(req.params.id);
      if (isNaN(id_product)) {
          return res.status(400).json({ message: "Invalid product ID" });
      }
      const result = await pool.query("SELECT * FROM product WHERE id_product = $1", [id_product]);
      if(result.rows.length === 0){
          return res.status(404).json({message: "Product not found"});
      }
      res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
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

exports.deleteProduct = async (req, res) => {
  try {
    const id_product = parseInt(req.params.id);
    if (isNaN(id_product)) {
          return res.status(400).json({ message: "Invalid product ID" });
    }
    const result = await pool.query(
      "DELETE FROM product WHERE id_product = $1 RETURNING id_product, name, description",
      [id_product]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Product not found"});
    }

    res.status(200).json({ message: "Product deleted successfully", product: result.rows[0]  });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id_product = parseInt(req.params.id);

    if (isNaN(id_product)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!req.body.name && !req.body.description) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const result = await pool.query(
      "UPDATE product SET name = $1, description = $2 WHERE id_product = $3 RETURNING id_product, name, description",
      [req.body.name, req.body.description, id_product]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
