import axios from "axios";
import { baseURL } from "./requests";

const instance=axios.create({
    baseURL:baseURL
})

export default instance;