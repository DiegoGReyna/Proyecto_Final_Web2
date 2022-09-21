const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('../utils');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        isActive: faker.datatype.boolean(),
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  //FAKER
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var products = this.products.slice(0, limit);
        if (products.length > 0) {
          resolve(products);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }

  findActiveProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeProducts = this.products.filter((x) => x.isActive === true);
        resolve(activeProducts);
      }, 2000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const product = this.products.find((item) => item.id === id);
    //NOT FOUND
    validateData(product, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(
      product,
      CONFLICT,
      'CONFLICTO, el producto esta bloqueado.',
      (data) => data.isActive == false
    );
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentProduct = this.products[index];
    this.products[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.products[index];
  }
  async updateComplete(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentProduct = this.products[index];
    this.products[index] = {
      id: currentProduct.id,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.products.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = ProductService;
