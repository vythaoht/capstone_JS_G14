const URL = "https://63f11fda5703e063fa532dfb.mockapi.io/api/products";

function apiGetProducts() {
  return axios({
    method: "GET",
    url: URL,
  });
}