import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

// const fetchApi = (base, params = {}) => {
//   const request = url + base;

//   return axios.get(request, { params }).then((res) => res.data);
// };

const postApi = (base, params = {}) => {
  const request = url + base;

  return axios.post(request, { params }).then((res) => {
    if (res.status !== 200) {
      return null;
    }
    return res.data.result;
  });
};

// const getDashboard = () => fetchApi("/dashboard/").then((data) => data);

// const postSimulate = (params) =>
//   postApi("/simulate", params).then((data) => data);

const postSimulate = () => { return ({"batata": 1})};

export {
    postSimulate,
};
