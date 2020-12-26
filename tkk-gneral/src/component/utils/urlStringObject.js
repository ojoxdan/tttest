import jwt from "jsonwebtoken";

export const encodeData = async (payload = {}) => {
    try {
        let data = {payload}
        data = jwt.sign(data, "tinkokoclientside");
        return data
    } catch (error) {
        console.log(error, "error from jwt utils folder ")
        return ""
    }
};
export const decodeData = async (stringData = null) => {
    try {
        let data = jwt.verify(stringData, "tinkokoclientside");
        return data
    } catch (error) {        
        return null;
    }
};
