const referenceCheckoutProducts = require("../models/referenceCheckoutProducts");

const productsServices = require("../services/product");

const badDevNoCoffe = require("../errors/badDevNoCoffe");

const getAllReferencesFromCheckouts = async (checkouts) => {
  if (!Array.isArray(checkouts)) {
    throw new badDevNoCoffe();
  }

  let checkoutList = checkouts;

  for (let count = 0; count < checkoutList.length; count++) {
    let references = [];
    let products = [];
    try {
      references = await referenceCheckoutProducts.findAll({
        where: { checkoutId: checkoutList[count].id },
      });
    } catch (error) {
      console.error(error);
      throw new badDevNoCoffe();
    }

    for (let i = 0; i < references.length; i++) {
      try {
        const product = await productsServices.onGetProductById(
          references[i].productId
        );

        products.push({
          id: product.id,
          img: product.img,
          title: product.title,
          price: product.price,
          amount: +references[i].amount,
        });
      } catch (error) {
        console.error(error);
        throw new badDevNoCoffe();
      }
    }
    checkoutList[count] = { ...checkoutList[count].dataValues, products };
  }

  return checkoutList;
};

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

module.exports = { getAllReferencesFromCheckouts, createReference, deleteReference };
