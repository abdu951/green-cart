import express from 'express';
import authSeller from '../midlewares/authSeller.js';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, ProductById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array([images]), authSeller, addProduct);
productRouter.get('/list', productList)
productRouter.get('/id', ProductById);    // 👈 IMPORTANT    api/product/:id      /:id
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;    