import express from "express";
const app = express();

// cors
const cors = require('cors')
app.use(cors())

const author = {
  name: "Sergio",
  lastname: "Rojas"
};

// get products by params
app.get("/items", (req, res) => {
  let promise;
  if (req.query.q && req.query.q.trim()) {
    promise = fetch(`${process.env.URL_PRODUCTS_SEARCH}?q=${req.query.q}`).then(
      (response) => response.json()
    );
  } else {
    promise = Promise.resolve();
  }
  return promise.then((data) => {
    let categories = [];
    let items = [];
    if (data) {
      categories = (data.filters || [])
        .filter((category) => category.id === "category")
        .map((category) =>
          category.values
            .map((value) => value.path_from_root.map((path) => path.name))
            .find(() => true)
        )
        .find(() => true);

      let results = data.results || [];
      for (let i = 0; i < 4 && i < results.length; i++) {
        let article = results[i];
        items.push({
          id: article.id,
          title: article.title,
          price: {
            currency: article.currency_id,
            amount: article.available_quantity,
            decimals: article.price,
          },
          picture: article.thumbnail,
          condition: article.condition,
          free_shipping:
            article.shipping && article.shipping.free_shipping === true,
          location: {
            state: article.address.state_name,
            city: article.address.city_name,
          },
        });
      }
    }
    res.send({
      author,
      categories,
      items,
    });
  });
});

// get product by id
app.get("/items/:id", (req, res) => {
  return fetch(
    `${process.env.URL_PRODUCT_DESCRIPTION}/items/${req.params.id}`
  ).then(async (response) => {
    if (response.status !== 200) {
      return response.text().then((body) => {
        res.status(response.status).send(body);
      });
    } else {
      return response
        .json()
        .then((article) => {
          return Promise.all([
            fetch(
              `${process.env.URL_PRODUCT_DESCRIPTION}/categories/${article.category_id}`
            ).then((response) => response.json()),
            fetch(
              `${process.env.URL_PRODUCT_DESCRIPTION}/items/${article.id}/description`
            ).then((response) => response.json()),
          ]).then(([category, description]) => [
            article,
            category,
            description,
          ]);
        })
        .then(([article, category, description]) => {
          let categories = (category.path_from_root || []).map(
            (path) => path.name
          );
          let item = {
            id: article.id,
            title: article.title,
            price: {
              currency: article.currency_id,
              amount: article.available_quantity,
              decimals: article.price,
            },
            picture:
              article.pictures && article.pictures.length > 0
                ? article.pictures[0].url
                : article.thumbnail,
            condition: article.condition,
            free_shipping:
              article.shipping && article.shipping.free_shipping === true,
            sold_quantity: article.sold_quantity,
            description: description.plain_text,
          };
          res.send({
            author,
            categories,
            item,
          });
        });
    }
  });
});

export default app;
