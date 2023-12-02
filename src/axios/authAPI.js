import axios from "axios"

const BASE_URL = 'https://moneyfulpublicpolicy.co.kr'

// sign up
const authSignUp = axios.create({
  baseURL: BASE_URL + '/register'
})

// login
const authLogin = axios.create({
  baseURL: BASE_URL + '/login?expiresIn=1m',
})

// userData
const authInfo = axios.create({
  baseURL: BASE_URL + '/user',
})

// editData
const authEdit = axios.create({
  baseURL: BASE_URL + '/profile',
})


// SignUp Interceptor
authSignUp.interceptors.request.use(
  (req) => {
    return req
  },
  (err) => {
    return Promise.reject(err);
  }
)

authSignUp.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err);
  }
)



// Login Interceptor
authLogin.interceptors.request.use(
  (req) => {
    return req
  }
)

authLogin.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)


// UserInfo Interceptor
authInfo.interceptors.request.use(
  (req) => {
    const token = JSON.parse(localStorage.getItem('user'))
    if (!token) {
      return
    }
    else {
      req.headers.Authorization = `Bearer ${token.accessToken}`;
      return req
    }
  },
  (err) => { return Promise.reject(err) }
)

authInfo.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => { return Promise.reject(err) }
)


// Edit Interceptor
authEdit.interceptors.request.use(
  (req) => {
    const token = JSON.parse(localStorage.getItem('user'))
    if (!token) {
      return
    }
    else {
      req.headers.Authorization = `Bearer ${token.accessToken}`;
      req.headers["Content-Type"] = "multipart/form-data";
      return req
    }
  },
  (err) => { return Promise.reject(err) }
)

authEdit.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => { return Promise.reject(err) }
)


export { authSignUp, authLogin, authInfo, authEdit };