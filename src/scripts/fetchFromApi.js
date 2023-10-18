import axios from "axios";


async function fetchFromApi(url, params) {
        return new Promise(function(resolve, reject) {
        axios.get(url, 
            {params: params})
            .then(response => {resolve(response)})
            .catch(err => {reject(err);});
    })
}


export default fetchFromApi