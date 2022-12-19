import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

// const fetchApi = (base, params = {}) => {
//    const request = url + base;

//    return axios.get(request, { params }).then((res) => res.data);
// };

const postApi = (base, params = {}) => {
  const request = url + base;

  return axios.post(request, { params }).then((res) => {
    if (res.status !== 200) {
      return null;
    }
    return res.data;
  });
};

const postSimulate = (params) =>
  postApi("/", params).then((data) => data);

// const getSimulate = () =>
// 	fetchApi("").then((data) => data);

export {
    postSimulate
};
