export const FormatError = (error) => {
    var index
    for (let i = 0; i < error.length; i++) {
        if (error[i] === '/') {
            index = i + 1;
            break;
        }
    }
    var test = error.slice(index).replaceAll("-", " ").replaceAll(")", "").replaceAll("(", "")
    return test
}