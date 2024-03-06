import axios from "axios";

const instance=axios.create({
    baseURL:'http://shorty.westeurope.cloudapp.azure.com/'
});

export default instance;