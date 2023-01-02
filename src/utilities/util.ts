export const threeDot = (text: string, length: number = 10) => {

    return text.length > length ? text.substring(0, length) + '...' : text
}