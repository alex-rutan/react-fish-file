import axios from "axios";
import jwt from "jsonwebtoken";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the Back-end API.
 *
 */

class FishFileApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FishFileApi.token}` };
    const params = method === "get" ? data : {};

    try {
      console.log("HERE", url, method, data, headers, params);
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get location data by unique id. */
  static async getLocation(id) {
    let res = await this.request(`locations/${id}`);
    return res.location;
  }

  /** Add location to user's locations */
  static async addLocation(id) {
    let res = await this.request('locations', id, "post");
    return res.location;
  }

  /** Get record data by id. */
  static async getRecord(id) {
    let res = await this.request(`records/${id}`);
    return res.record;
  }

  /** Add record to user's records */
  static async addRecord(id) {
    let res = await this.request('records', id, "post");
    return res.record;
  }

  /** Logs in a user, returns token. */
  static async login(loginUserData) {
    const res = await this.request("auth/token", loginUserData, "post");
    console.log("INSIDE API LOGIN: ", res, "--------", res.token)
    return res.token;
  }

  /** Register a user, returns token. */
  static async register(userData) {
    const res = await this.request("auth/register", userData, "post");
    console.log("INSIDE API REGISTER: ", res, "--------", res.token)
    return res.token;
  }

  /** Get user data by username. */
  static async getUserInfo(username) {
    const res = await this.request(`users/${username}`, username);
    return res.user;
  }

  /** Updates user data. */
  static async updateProfile(profileInfo) {
    const { username } = jwt.decode(this.token)
    const res = await this.request(`users/${username}`, profileInfo, "patch")
    return res.user
  }
}

// for now, put token ("testuser" / "password" on class)
FishFileApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default FishFileApi;
