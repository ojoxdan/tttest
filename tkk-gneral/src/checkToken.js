import axios from 'axios'
export const checkToken = async (token) => {
    try {
        let res = await axios.get('/api/auth')
        if (res.data) {
            console.log(res,' ok the app component can authenticate ')
            return true
        }
        return false
    } catch (error) {
        return false
        console.log(' Not possible to authenticate via the app component')

    }
}

