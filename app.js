const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./cruds.json');
const { validateProduct } = require('./validation/validation');
app.use(bodyParser.json());


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firebase.google.com/docs/web/setup#available-libraries'
  });
  
  app.use("/", require("./routes/product.routes"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
