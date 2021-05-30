const checkEmpty = (...strs) => {
    const check = strs.map(str => (str.trim() !== "") && (str.trim() !== undefined))
    return check.reduce((strAcm, str) => strAcm && str)
}

export default checkEmpty