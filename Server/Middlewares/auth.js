import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET_KEY;
export const auth = async(req, _, next)=> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        let decodedData;
        
        decodedData = jwt.verify(token,secret_key);
        if (decodedData) {
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}