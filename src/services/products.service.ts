import { Product } from "../entities/product";
import { BaseService } from "./base.service";

class ProductService extends BaseService<Product> {}

export const productService = new ProductService("products");
