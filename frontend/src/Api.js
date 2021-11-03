import axios from "axios";

const BASE_API_URL = "http://localhost:4000";

class SharedApi {

    static token;
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_API_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${SharedApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
    static async getAllHobby() {

        const res = await this.request(`hobbies/`)

        return res.hobbies;
    }
    // createHobby
    static async createHobby(data) {

        const res = await this.request(`hobbies/`, data, "post")

        return res.hobby;
    }

    static async getCurrentUser(username) {

        let res = await this.request(`users/${username}`);

        return res.user;
    }

    static async login(data) {
        let res = await this.request(`login/`, data, "post")
        return res.token
    }

    static async signup(data) {
        let res = await this.request(`signup/`, data, "post")
        return res.token
    }

    static async deleteHobby(id) {
        let res = await this.request(`hobbies/${id}`, {}, "delete")
        return res
    }

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

}

export default SharedApi;