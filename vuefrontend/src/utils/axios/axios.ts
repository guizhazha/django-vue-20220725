// npm install axios --save
import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'
axios.defaults.baseURL = 'http://192.168.1.138:3000/api/v1/'


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// 请求拦截
axios.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截
axios.interceptors.response.use(
	response => {
		return response
	},
    error => {
		if (error && error.response) {
			error.message =  error.response.data
		} else {
			error.message = 'other error!!!'
		}
		return Promise.reject(error)
    }
)

export default axios