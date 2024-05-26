import jwt from "jsonwebtoken";

const generateJWT = (uid: "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY as any, {
            expiresIn: "1h"
        }, (err: any, token: any) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el JWT")
            } else {
                resolve(token)
            }
        })
    })
}

export = generateJWT