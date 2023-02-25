let cartProducts = getProductListCart();
let cart = [];

getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      renderProducts(response.data);
      cart = response.data;
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
            <button class="btn btn__add" onclick="createProductListCart('${item.id}')">Add to cart</button>
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

// Hàm thêm sản phẩm vào giỏ hàng
function createProductListCart(id) {
  let item = cart.find((item) => item.id === id);

  const cardItem = new ProductCart(
    item.id,
    item.name,
    item.price,
    item.img,
    1,
  );

  cartProducts.push(cardItem);

  storeProductList();
}

function storeProductList() {
  // chuyển Array cartProducts thành JSON
  const json = JSON.stringify(cartProducts);
  // Lưu xuống localStorage với key là cartProducts
  localStorage.setItem("cartProducts", json);
}

function getProductListCart() {
  // Lấy danh sách data từ LocalStorage với key là cartProducts
  const json = localStorage.getItem("cartProducts");

  if (!json) {
    return [];
  }

  // Chuyển JSON thành Array
  const cartProducts = JSON.parse(json);
  for (let index = 0; index < cartProducts.length; index++) {
    const productCart = cartProducts[index];
    cartProducts[index] = new ProductCart(
      productCart.id,
      productCart.name,
      productCart.price,
      productCart.img,
      productCart.quantity
    );
  }
  return cartProducts;
}

//=== DOM ===
function getElement(selector) {
  return document.querySelector(selector);
}
