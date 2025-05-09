/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */

// import required libs
const path = require('path');
const { existsSync, writeFileSync } = require('fs');

// define global variables of this script
const scriptFlags = {
  customInputFilePath: null,
  customOutputFilePath: null,
  loadCustomers: undefined,
  loadProducts: undefined,
  loadPrices: undefined,
}

// extract the script args provided
const scriptArgs = process.argv.slice(2);
if (scriptArgs.length === 0) {
  console.log('❗️ Script was called without arguments.');
  process.exit(1);
}

// extract all possible flag values provided
const scriptArgFlags = scriptArgs.filter((arg) => arg.startsWith('--'));
scriptArgFlags.forEach((argFlag) => {
  if (argFlag.startsWith('--input-path')) {
    const inputPath = argFlag.split('=')?.[1] ?? '';
    if (isPathValid(inputPath)) {
      scriptFlags.customInputFilePath = inputPath;
    }
    return;
  }
  if (argFlag.startsWith('--output-path')) {
    const outputPath = argFlag.split('=')?.[1] ?? '';
    if (isPathValid(outputPath)) {
      scriptFlags.customInputFilePath = outputPath;
    }
    return;
  }

  switch (argFlag) {
    case '--customers':
      scriptFlags.loadCustomers = true;
      break;
    case '--products':
      scriptFlags.loadProducts = true;
      break;
    case '--prices':
      scriptFlags.loadPrices = true;
      break;
    default:
      console.log(`❗️ Unknown flag detected: ${argFlag}`);
      break;
  }
});

// verify that one of the args is Stripe's secret key
const secretKey = scriptArgs.find((arg) => arg.startsWith('sk_')) ?? null;
if (!secretKey) {
  console.log('❌ No API Secret Key was provided.');
  process.exit(1);
}

// verify that you have a data.json file in the current dir or specified custom dir
if (
  !existsSync(
    scriptFlags.customInputFilePath
      ? path.join(scriptFlags.customInputFilePath)
      : path.join('scripts', 'data.json')
  )
) {
  console.log(`❗️ JSON data file is not present in the provided directory: ${scriptFlags.customInputFilePath ?? './data.json'}`);
}

// finally run the actual script
executeScript();

// this function loads data to Stripe using the provided secret key
async function executeScript() {
  try {
    const { customInputFilePath, customOutputFilePath, loadCustomers, loadProducts, loadPrices } = scriptFlags;
    const shouldLoadAll = loadCustomers === undefined && loadProducts === undefined && loadPrices === undefined;

    const stripe = require('stripe')(secretKey);
    const data = require(path.resolve(customInputFilePath ?? 'scripts/data.json'));

    let totalErrors = 0;
    const stripeData = {
      customers: [],
      products: [],
      prices: [],
    };

    const startTime = Date.now();

    if ((shouldLoadAll || !!loadCustomers) && (data?.customers?.length ?? 0) > 0) {
      console.log('👤 Adding customers to Stripe...\n');

      const customerResults = await loadDataSequentially({
        responses: [],
        errorsCount: 0,
      }, data.customers.map((rawCustomer) => loadStripeCustomer(stripe, rawCustomer)));

      totalErrors += customerResults.errorsCount;
      stripeData.customers = customerResults.responses;

      console.log('');
    }

    if ((shouldLoadAll || !!loadProducts) && (data?.products?.length ?? 0) > 0) {
      console.log('📦 Adding products to Stripe...\n');

      const productResults = await loadDataSequentially({
        responses: [],
        errorsCount: 0,
      }, data.products.map((rawProduct) => loadStripeProduct(stripe, rawProduct)));

      totalErrors += productResults.errorsCount;
      stripeData.products = productResults.responses;

      console.log('');

      if ((shouldLoadAll || !!loadPrices)) {
        console.log('💵 Adding prices to Stripe...\n');

        const pricesResults = await loadDataSequentially({
          responses: [],
          errorsCount: 0,
        }, productResults.responses.map((product) => loadStripePrice(stripe, {
          ...(data.products.find((rawProduct) => rawProduct.name === product.name) ?? {}),
          productId: product.id,
        })));

        totalErrors += pricesResults.errorsCount;
        stripeData.prices = pricesResults.responses;

        console.log('');
      }
    }

    try {
      writeFileSync(path.resolve(customOutputFilePath ?? 'scripts/stripe-data.json'), JSON.stringify(stripeData));
    } catch (writeError) {
      console.log('❌ Script failed to write the Stripe data file.', writeError);
    }

    const endTime = Date.now();

    const totalTimeInSeconds = Math.abs(endTime - startTime) / 1000;
    console.log(`✨ Finished loading all data in ${totalTimeInSeconds} seconds.\n Customers loaded: ${stripeData.customers.length} | Products loaded: ${stripeData.products.length} | Prices loaded: ${stripeData.prices.length} | Errors: ${totalErrors}`);
  } catch (error) {
    console.log('❌ Script failed!', error);
  } finally {
    process.exit(1);
  }
}

function isPathValid(path) {
  return existsSync(path);
}

function loadStripeCustomer(stripeSDK, rawCustomer) {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await stripeSDK.customers.create({
          name: rawCustomer.name,
          email: rawCustomer.email,
        });
        console.log(`✅ Customer ${rawCustomer.email} was added to Stripe successfully! ID: ${customer.id}`);
        resolve(customer);
      } catch (error) {
        console.log(`❌ Customer ${rawCustomer.email} couldn't be added to Stripe.`, error);
        reject(error);
      }
    });
  }
}

function loadStripeProduct(stripeSDK, rawProduct) {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await stripeSDK.products.create({
          name: rawProduct.name,
          description: rawProduct.description,
          metadata: {
            brand: rawProduct.brand,
            category: rawProduct.category,
            localImage: rawProduct.image,
          }
        });
        console.log(`✅ Product ${rawProduct.name} was added to Stripe successfully! ID: ${product.id}`);
        resolve(product);
      } catch (error) {
        console.log(`❌ Product ${rawProduct.name} couldn't be added to Stripe.`, error);
        reject(error);
      }
    });
  }
}

function loadStripePrice(stripeSDK, rawPrice) {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        const price = await stripeSDK.prices.create({
          unit_amount: rawPrice.price,
          currency: rawPrice.currency,
          product: rawPrice.productId,
        });
        console.log(`✅ Price for ${rawPrice.name} was added to Stripe successfully! ID: ${price.id}`);
        resolve(price);
      } catch (error) {
        reject(error);
      }
    });
  }
}

async function loadDataSequentially(state = { responses: [], errorsCount: 0 }, promises) {
  if (promises.length === 0) {
    return state;
  }

  const currentState = { ...state };

  try {
    const response = await promises?.[0]?.();
    currentState.responses.push(response);
  } catch (error) {
    currentState.errorsCount += 1;
  }

  return await loadDataSequentially(currentState, promises?.slice(1) ?? []);
}
