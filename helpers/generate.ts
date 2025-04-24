export const generateOrderCode = (number: number) : string => {
    const code = `OD${number.toString().padStart(8, '0')}`
    return code;
}