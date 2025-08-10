const KEY = 'mining-token'

const setToken = (token) => {
    localStorage.setItem(KEY, token)
}

const getToken = () => {
    return localStorage.getItem(KEY) || ''
}

const clearToken = () => {
    localStorage.removeItem(KEY)
}

export {setToken, getToken, clearToken}