const express = require('express');
const prodctsRoutes = require('./routes/productRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/product', prodctsRoutes);
  
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
})