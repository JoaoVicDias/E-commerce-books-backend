const referenceCheckoutProducts = require("../models/referenceCheckoutProducts");

const badDevNoCoffe = require("../errors/badDevNoCoffe");

const createReference = async (products, checkoutId) => {
  if (!Array.isArray(products)) {
    return referenceCheckoutProducts.create({
      productId: products.id,
      amount: products.amount,
      checkoutId: checkoutId,
    });
  }

  let productsList = products;

  for (let count = 0; count < productsList.length; count++) {
    try {
      await referenceCheckoutProducts.create({
        productId: productsList[count].id,
        checkoutId,
        amount: productsList[count].amount,
      });
    } catch (error) {
      console.error(error);
      throw new badDevNoCoffe();
    }
  }
};

const deleteReference = (checkoutId) => {
  return referenceCheckoutProducts.destroy({ where: { checkoutId } });
};

module.exports = {
  createReference,
  deleteReference,
};
