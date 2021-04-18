import axios from "axios";

export async function getList(type, params, context = undefined) {
  if (params.searchName) {
    params["keyword"] = params.searchName;
    params.searchName = "";
  }

  // paramsのプロパティのうちundefeindなものを取り除く
  // なくても動く気がする
  let queryParam = {};
  Object.keys(params)
    .filter((key) => {
      return params[key] !== "";
    })
    .forEach((key) => {
      queryParam[key] = params[key];
    });

  const get = async () => {
    if (context) {
      return await context.$axios
        .get(`/api/${type}`, { params: queryParam })
        .then((res) => {
          return res;
        })
        .catch((e) => console.log(e));
    } else {
      return await axios
        .get(`/api/${type}`, { params: queryParam })
        .then((res) => {
          return res;
        })
        .catch((e) => console.log(e));
    }
  };

  const response = await get();

  const list = response.data[type];
  const currentPage = response.data.currentPage;
  const count = response.data.pageCount;

  return { list, currentPage, count };
}
