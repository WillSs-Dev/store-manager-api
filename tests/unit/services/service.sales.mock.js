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

const productsIds = [{ id: 1 }, { id: 2 }, { id: 3 }];

const salesIds = [{ id: 1 }, { id: 2 }];

module.exports = {
  allSales,
  newSale,
  saleRequestBody,
  sale1,
  productsIds,
  salesIds,
};