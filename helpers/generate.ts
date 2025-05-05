export const generateOrderCode = (number: number) : string => {
    const code = `OD${number.toString().padStart(8, '0')}`
    return code;
}

export const generateTourCode = (number: number) : string => {
    const code = `TOUR${number.toString().padStart(6, '0')}`
    return code;
}

export const generateRandomTokenAccount = (length: number) : string => {
    const characters = "ABCDEFGHIKLMNOPQRSTUVXYZabcdefghiklmopqrstuvxyz0123456789";

    let result = "";
    for (let i =0; i< length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
} 