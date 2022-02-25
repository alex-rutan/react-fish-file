import axios from "axios";
const BASE_URL = "https://waterservices.usgs.gov/nwis";

/** USGS API Class.
 *
 * Static class tying together methods used to get water and weather data 
 * from the public USGS API.
 */

class UsgsApi {
  static async request(endpoint) {
    console.debug("USGS API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;

    try {
      console.log("HERE", url, method, data, headers, params);
      return await axios.get(url);
    } catch (err) {
      console.error("USGS API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get current flow data by unique USGS river id. */
  static async getCurrentFlow(id) {
    let res = await this.request(`iv/?format=json&indent=on&sites=${id}&parameterCd=00060&siteStatus=all`);
    return res.value.timeSeries[0].values[0].value[0].value;
  }

  /** Get past flow data by unique USGS river id and date in this format: "2021-07-25" */
  static async getPastFlow(id, date) {
    let res = await this.request(`dv/?format=json&indent=on&sites=${id}&startDT=${date}&endDT=${date}&siteStatus=all`);
    return res.value.timeSeries[0].values[0].value[0].value;
  }
}

export default UsgsApi;