let productListCart = getProductListCart();
renderProductCart(productListCart);

// Hàm thêm sản phẩm vào giỏ hàng
function createProductListCart() {

}

function renderProductCart(productList) {
  let html = productList.reduce((result, index, productCart) => {
    return result + `
      <tr>
        <td>${index + 1}</td>
        <td>${productCart.name}</td>
        <td>${productCart.img}</td>
        <td>${productCart.quality}</td>
        <td>${productCart.price}</td>
      </tr>
    `
  }, "");
  getElement("#tblProductCart").innerHTML = html;
}

function storeProductList() {
  // chuyển Array productListCart thành JSON
  const json = JSON.stringify(productListCart);
  // Lưu xuống localStorage với key là productListCart
  localStorage.setItem("productListCart", json);
}

function getProductListCart() {
  // Lấy danh sách data từ LocalStorage với key là productListCart
  const json = localStorage.getItem("productListCart");

  if (!json) {
    return [];
  }

  // Chuyển JSON thành Array
  const productListCart = JSON.parse(json);
  for (let index = 0; index < productListCart.length; index++) {
    const productCart = productListCart[index];
    productListCart[index] = new ProductCart(
      productCart.id,
      productCart.name,
      productCart.price,
      productCart.img,
      productCart.quality,
    );
  }
  return productListCart;
}