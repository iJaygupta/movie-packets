import axios from 'axios';
import { Cookies } from 'react-cookie';

const self = {
	method: "GET",
	headers: {
		'Content-Type': 'application/json',
	},
	fingerPrint: '',
	setMethod: function (method) {
		self.method = method;
		return self;
	},
	setHeader: function (key, value) {
		self.headers[key] = value;
		return self;
	},
	reset: function () {
		self.method = "GET";
		self.headers = { "Content-Type": "application/json" };
		return self;
	},
	handleApiError: function () {
	},
	setFingerPrint: function (fingerPrint) {
		self.fingerPrint = fingerPrint;
		return self;
	},
	sendRequest: function (url, data, authenticate, callback, dispatch) {

		if (self.fingerPrint) {
			self.setHeader('fingerPrint', self.fingerPrint)
		} else {
			let fingerPrintFromCookies = ""
			self.setHeader('fingerPrint', '');
			self.setFingerPrint(fingerPrintFromCookies);
		}
		(authenticate) ? self.setHeader('token', (typeof Cookies.load('token') != 'undefined') ? Cookies.load('token') : '') : '';
		(!url.includes("http")) ? url = process.env.REACT_APP_API_URL + url : ""
		return axios({
			method: self.method,
			url: url,
			responseType: 'json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: data,
			timeout: 120000,
			params: (self.method == "GET") ? data : {}
		})
			.then(function (response) {
				self.reset();

				//this if condition has been added to logout on behalf account if the connection does not exit at the time of api hit
				if (authenticate) {
					if (response.data.code === "CEC4007") {

						dispatch({
							type: 'connectionRemoved',
							data: true
						});
					}
				}

				callback(response);
			})
			.catch(function (error) {
				console.error("API LIB ERROR : ", error);
			});
	},
	sendExtRequest: function (url, data, callback) {

		return axios({
			method: self.method,
			url: url,
			responseType: 'json',
			headers: self.headers,
			data: data,
			timeout: 120000,
			params: (self.method == "GET") ? data : {}
		})
			.then(function (response) {
				self.reset();

				callback(null, response);
			})
			.catch(function (error) {
				callback(error, null);
			});
	}
}

export default self;