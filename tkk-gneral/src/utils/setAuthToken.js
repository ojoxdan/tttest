import axios from 'axios'

const setAuthToken  =  (token) =>{

    if (token) {
        axios.defaults.headers.common['x-auth-user'] = token
    }else{
        delete axios.defaults.headers.common['x-auth-user']
    }

}

export default setAuthToken