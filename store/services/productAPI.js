const URL = "https://63f11fda5703e063fa532dfb.mockapi.io/api/products";
const URLCart = "https://63f11fda5703e063fa532dfb.mockapi.io/api/Cart";

function apiGetProducts() {
  return axios({
    method: "GET",
    url: URL,
  });
}

function apiCreateCartItem(cartItem) {
  return axios({
      method: "POST",
      url: URLCart,
      data: cartItem,
    });
}
