export const generateOrderCode = (number: number) : string => {
    const code = `OD${number.toString().padStart(8, '0')}`
    return code;
}

export const generateTourCode = (number: number) : string => {
    const code = `TOUR${number.toString().padStart(6, '0')}`
    return code;
}