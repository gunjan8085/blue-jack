import axios from "./axios";

const createOwner = async (data) => {
  return axios.post("/employee/signup", data);
};

  const registerBusiness = async (data) => {
    return axios.post("/business/signup", data);
  };

  const loginBusiness = async (data) => {
    return axios.post("/employee/login", data);
  };

const loginUser = async (data) => {
  return axios.post("/users/login", data);
};

const createUser = async (data) => {
  return axios.post("/users/", data);
};

const authService = {
  createOwner,
  registerBusiness,
  loginBusiness,
  createUser,
  loginUser,
};

export default authService;
