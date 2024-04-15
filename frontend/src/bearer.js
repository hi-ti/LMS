import axios from "axios";

const bearerUrl = "https://lms-2cmi.onrender.com"; // Update this URL to the correct server URL

const publicApi = {
	get: async (url) => {
		const response = await axios.get(`${bearerUrl}/${url}`);
		return response;
	},

	post: async (url, body) => {
		const response = await axios.post(`${bearerUrl}/${url}`, body);
		return response;
	},
};

export default publicApi;
