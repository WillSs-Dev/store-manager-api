const allSales = [
  {
    saleId: 1,
    date: "2022-11-16T23:48:04.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-11-16T23:48:04.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-11-16T23:48:04.000Z",
    productId: 3,
    quantity: 15,
  },
];

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
  ],
};

const saleRequestBody = [
  {
    productId: 1,
    quantity: 2,
  },
];

const saleWithInexistentProduct = [
  {
    productId: 80,
    quantity: 2,
  },
];

const sale1 = [
  {
    date: "2022-11-17T01:59:40.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-11-17T01:59:40.000Z",
    productId: 2,
    quantity: 10,
  },
];

const saleNotFoundMsg = { message: "Sale not found" };

const productNotFoundMsg = { message: "Product not found" };

module.exports = {
  allSales,
  saleNotFoundMsg,
  productNotFoundMsg,
  newSale,
  saleRequestBody,
  sale1,
  saleWithInexistentProduct,
};
