import axiosClient, { AxiosInstance, AxiosInterceptorOptions, AxiosRequestConfig } from "axios"

const instance = axiosClient.create({
  baseURL: "http://localhost:4000",
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* Another way to do it
const request = ({...options}) => {
  instance.defaults.headers.common.Authorization = `Bearer token`
  const onSuccess = (response: AxiosResponse) => response 
  const onError = (error: AxiosError) => error

  return instance(options)
  .then(onSuccess)
  .catch(onError)
}

request({url: "superheroes", method: "post", data: hero})
*/


instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = "token"
  config.headers = config.headers ?? {}
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default instance