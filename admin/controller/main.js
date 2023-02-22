getProducts();
let danhSachSanPham = [];
let sortFlag = "";

// Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts() {
  axios({
    method: "GET",
    url: "https://63f11fda5703e063fa532dfb.mockapi.io/api/products",
  }).then((response) => {
    // Call API thành công
    danhSachSanPham = response.data;
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

// getElement("#btnAddPhone").onclick = function () {
//   let isCheck = isValidate();
//   if (isCheck === true) {
//     alert("Thoa dieu kien validation, co the add");
//   } else {
//     alert("That bai");
//   }
// };

// VALIDATION
function isValidate() {
  let isValid = true;

  //Phone name:
  let name = getElement("#nameProduct").value;
  if (!name.trim() || name.length < 6) {
    isValid = false;
    getElement("#tbName").innerHTML =
      "Tên sản phẩm không được để trống và phải chứa 6 kí tự trở lên";
    getElement("#tbName").style.display = "block";
    getElement("#tbName").style.color = "red";
  } else {
    getElement("#tbName").innerHTML = "";
    getElement("#tbName").style.display = "none";
  }

  //Price:
  let price = getElement("#Price").value;
  const regexHasAlphabet = /\D/;
  if (!price.trim() || regexHasAlphabet.test(price)) {
    isValid = false;
    getElement("#tbPrice").innerHTML = "Vui lòng điền giá tiền bằng chữ số";
    getElement("#tbPrice").style.display = "block";
    getElement("#tbPrice").style.color = "red";
  } else {
    getElement("#tbPrice").innerHTML = "";
    getElement("#tbPrice").style.display = "none";
  }

  //Phải có http trong link
  let link = getElement("#imgLink").value;

  if (link.toLowerCase().indexOf("http") === -1) {
    isValid = false;
    getElement("#tbImgLink").innerHTML = "Vui lòng nhập link dẫn hợp lệ";
    getElement("#tbImgLink").style.display = "block";
    getElement("#tbImgLink").style.color = "red";
  } else {
    getElement("#tbImgLink").style.display = "none";
  }

  //Screen, back camera, font camera, description, select
  let isEmptyScreen = isCheckEmpty(
    "Screen",
    "tbScreen",
    "Screen không được để trống"
  );
  let isEmptyBackCamera = isCheckEmpty(
    "backCamera",
    "tbBackCamera",
    "Back camera không được để trống"
  );
  let isEmptyFrontCamera = isCheckEmpty(
    "frontCamera",
    "tbFrontCamera",
    "Front camera không được để trống"
  );
  let isEmptyDescription = isCheckEmpty(
    "Description",
    "tbDescription",
    "Vui lòng nhập mô tả sản phẩm"
  );
  let isEmptySelectBrand = isCheckEmpty(
    "chooseBrand",
    "tbBrand",
    "Vui lòng chọn nhãn hàng phù hợp"
  );

  if (
    isEmptyScreen ||
    isEmptyBackCamera ||
    isEmptyFrontCamera ||
    isEmptyDescription ||
    isEmptySelectBrand
  ) {
    isValid = false;
  }

  return isValid;
}

function isCheckEmpty(idInput, idSpan, message) {
  let valueInput = getElement(`#${idInput}`).value;
  if (!valueInput.trim()) {
    getElement(`#${idSpan}`).innerHTML = message;
    getElement(`#${idSpan}`).style.display = "block";
    getElement(`#${idSpan}`).style.color = "red";
    return true;
  }
  getElement(`#${idSpan}`).style.display = "none";
  return false;
}

//SORT BY PRICE
function sortByPrice() {
  if (!sortFlag || sortFlag === "desc") {
    danhSachSanPham.sort((a, b) => a.price - b.price);
    sortFlag = "asc";
  } else if (sortFlag === "asc") {
    danhSachSanPham.sort((a, b) => b.price - a.price);
    sortFlag = "desc";
  }
  // if(sortFlag === "desc") {
  //     danhSachSanPham.sort((a, b) => a.price - b.price);
  //     sortFlag = "asc";
  // }
  renderProducts(danhSachSanPham);
}
getElement("#sort").onclick = sortByPrice;

function getElement(selector) {
  return document.querySelector(selector);
}
