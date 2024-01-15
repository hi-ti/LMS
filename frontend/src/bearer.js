import axios from "axios";

const bearerUrl = `http://localhost:5001`;

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
