const checkEmpty = (...strs) => {
    const check = strs.map(str => (str.trim() !== "") && (str.trim() !== undefined))
    return check.reduce((str, str2) => str && str2)
}

export default checkEmpty