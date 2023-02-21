const URL = "https://63f11fda5703e063fa532dfb.mockapi.io/api/products";

function apiDeleteProduct(productId) {
  return axios({
    method: "DELETE",
    url: `${URL}/${productId}`,
  });
}
