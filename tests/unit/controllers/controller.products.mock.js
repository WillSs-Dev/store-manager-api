const allProducts = [
  {id:1,name:'Martelo de Thor'},
  {id:2,name:'Traje de encolhimento'},
  {id:3,name:'Escudo do Capitão América'},
];

const searchedProducts = [
  {id:1,name:'Martelo de Thor'},
  {id:2,name:'Traje de encolhimento'},
];

const notFoundMsg = { message: 'Product not found' };

const newProduct = {id:4,name:'Garras do Wolverine'}

const updatedProduct = {id:2,name:'Garras do Wolverine'};

module.exports = { allProducts, notFoundMsg, newProduct, searchedProducts, updatedProduct };