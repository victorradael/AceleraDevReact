const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];
const { products } = require("./data/products.json");
const idsTest = [120, 230, 310, 490];

function selectPromotion(categoriesList) {
  const categoriesSet = new Set(categoriesList);
  return categoriesSet.size <= 3
    ? promotions[categoriesSet.size - 1]
    : promotions[3];
}

function calculateTotalPrice(promotion, productsList) {
  function reducer(acumulator, product) {
    const productPromotion = product.promotions.find((p) =>
      p.looks.includes(promotion)
    );
    if (productPromotion) return acumulator + productPromotion.price;
    return acumulator + product.regularPrice;
  }

  return productsList.reduce(reducer, 0);
}

function calculateRegularPrice(productsList) {
  const regularPrice = productsList.reduce(
    (acumulator, product) => acumulator + product.regularPrice,
    0
  );
  return regularPrice;
}

function getShoppingCart(ids, productsList) {
  const filteredList = productsList.filter((product) =>
    ids.includes(product.id)
  );

  const products = filteredList.map((product) => {
    return { name: product.name, category: product.category };
  });

  const productsCategories = filteredList.map((product) => product.category);

  const promotion = selectPromotion(productsCategories);

  const totalPrice = calculateTotalPrice(promotion, filteredList);

  const discountValue = calculateRegularPrice(filteredList) - totalPrice;

  const discount =
    ((1 - totalPrice / (totalPrice + discountValue)) * 100).toFixed(2) + "%";

  return {
    products,
    promotion,
    totalPrice: totalPrice.toFixed(2),
    discountValue: discountValue.toFixed(2),
    discount,
  };
}

console.log(getShoppingCart(idsTest, products));

module.exports = { getShoppingCart };
