getProducts();

// Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts() {
  axios({
    method: "GET",
    url: "https://63f11fda5703e063fa532dfb.mockapi.io/api/products",
  }).then((response) => {
    // Call API thành công
    renderProducts(response.data);
  });
}

// Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${Intl.NumberFormat("vn-VN").format(product.price)}</td>
                <td>
                    <img src="${product.img}" width="100" height="100" /> 
                </td>
                <td>${product.desc}</td>
                <td> 
                    <button type="button" class="btn btn-secondary">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct(${
                      product.id
                    })">Delete</button>
                </td>
            </tr>
        `
    );
  }, "");
  getElement("#tblListProducts").innerHTML = html;
}

//Ham xoa san pham
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      getProducts();
    })
    .catch(() => {
      alert("Something wrong!");
    });
}

function getElement(selector) {
  return document.querySelector(selector);
}
