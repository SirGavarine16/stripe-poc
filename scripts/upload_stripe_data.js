/* eslint-disable @typescript-eslint/no-require-imports */
const secretKey = process.argv[2] ?? null;

initialize()

async function initialize() {
  if (!secretKey) {
    console.log("❌ No API Secret Key was provided...");
    process.exit(1);
  }

  try {
    const stripe = require("stripe")(secretKey);
    const data = require("./../src/constants/data.json");

    let productsCount = 0;
    let errorsCount = 0;

    await Promise.all(
      data.products.map((rawProduct) => {
        return new Promise(async (resolve, reject) => {
          try {
            const product = await stripe.products.create({
              name: rawProduct.name,
              description: rawProduct.description,
              metadata: {
                brand: rawProduct.brand,
                category: rawProduct.category,
                localImage: rawProduct.image,
              }
            });
            const price = await stripe.prices.create({
              unit_amount: rawProduct.price,
              currency: rawProduct.currency,
              product: product.id,
            });
            productsCount += 1;
            console.log(`✅ Product ${rawProduct.name} was uploaded successfully to Stripe with Product ID ${product.id} and Price ID ${price.id}`);
            resolve();
          } catch (error) {
            errorsCount += 1;
            console.log(`❌ Product ${rawProduct.name} couldn't be added`);
            reject(error);
          }
        })
      })
    );

    console.log(`\n✨ Finished uploading data to Stripe - Total Products: ${productsCount} | Errors: ${errorsCount}`);
  } catch (error) {
    console.log("❌ Something went wrong... ", error)
  }
}