getProducts();
let cartProducts = [
  {
    name: "Iphone 13",
    img: "https://media.wired.com/photos/6148ef98a680b1f2086efee0/1:1/w_1037,h_1037,c_limit/Gear-Review-Apple_iphone13_hero_us_09142021.jpg",
    quantity: 1,
    price: 45_000_000,
  },
  {
    name: "Iphone 14",
    img: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/11/2/1112224/Iphone-14.jpg",
    quantity: 2,
    price: 90_000_000,
  },
];

function getProducts() {
  apiGetProducts()
    .then((response) => {
      renderProducts(response.data);
    })
    .catch((error) => {
      alert(error);
    });
}

function renderProducts(ds) {
  let html = ds.reduce((result, value) => {
    let item = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `
    <div class="card">
            <img
              class="card-img-top py-3"
              src="${item.img}"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">
              ${item.desc}
              </p>
              <p class="card-text">
                <small class="text-muted">Price: ${item.price}</small>
              </p>
              <button class="btn btn__add">Add to cart</button>
            </div>
          </div>
    `
    );
  }, "");
  getElement("#productCards").innerHTML = html;
}

function renderCart(ds) {
  let html = ds.reduce((result, value, index) => {
    return (
      result +
      `
        <tr>
                  <td scope="row">${index + 1}</td>
                  <td>${value.name}</td>
                  <td>
                    <img src="${value.img}" alt="" />
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <button class="quantity__button">-</button>
                      ${value.quantity}
                      <button class="quantity__button">+</button>
                    </div>
                  </td>
                  <td>${value.price.toLocaleString()}</td>
                </tr>
        `
    );
  }, "");

  getElement("#tbodyCart").innerHTML = html;
}
getElement("#showCart").onclick = function () {
  renderCart(cartProducts);
};
//=== DOM ===
function getElement(selector) {
  return document.querySelector(selector);
}
