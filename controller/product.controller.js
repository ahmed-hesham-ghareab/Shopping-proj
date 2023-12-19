const admin = require('firebase-admin');
const db = admin.firestore();
const productsCollection = db.collection('products');

// Create a new product
module.exports.createProduct=(async(req, res) => {
    const newProduct = req.body;
  
    await productsCollection.add(newProduct)
      .then((docRef) => {
        res.status(201).json({ id: docRef.id });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error creating product' });
      });
  });
  
  // Get all products
 module.exports.getAllProducts = (async(req, res) => {
   await productsCollection.get()
      .then((snapshot) => {
        const products = [];
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        res.json(products);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error getting products' });
      });
  });
  
  // Get a specific product by ID
  module.exports.getSpacProduct = (async(req, res) => {
    const productId = req.params.id;
  
    await productsCollection.doc(productId).get()
      .then((doc) => {
        if (doc.exists) {
          res.json({ id: doc.id, ...doc.data() });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error getting product' });
      });
  });
  
  // Update a product by ID
  module.exports.updateProduct = (async(req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
  
    await productsCollection.doc(productId).update(updatedProduct)
      .then(() => {
        res.json({ id: productId, ...updatedProduct });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error updating product' });
      });
  });
  
  // Delete a product by ID
  module.exports.deleteProduct = (async(req, res) => {
    const productId = req.params.id;
  
    await productsCollection.doc(productId).delete()
      .then(() => {
        res.json({ id: productId });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error deleting product' });
      });
  });