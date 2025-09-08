import {create} from 'zustand';
import CryptoJS from 'crypto-js'
import UserApi from '../api/UserApi.js'
import {setToken, clearToken} from "../utils/token.js"

const encryptPwd = (pwd) => {
    return CryptoJS.AES.encrypt(
        pwd,
        CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef'),
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
    ).toString()
}

const useLoginStore = create((set) => ({
    token: "",
    userLogin: async (userForm) => {
        userForm.password = encryptPwd(userForm.password);
        const {data} = await UserApi.login(userForm);
        if (data.msg === 'success') {
            // 设置数据
            localStorage.setItem("mining-user", JSON.stringify(data.data.user))
            // 设置token
            setToken(data.data.token)
        } else {
            throw new Error(data.data)
        }
    },
    userLogout: () => {
        clearToken();
        localStorage.removeItem("mining-user")
    }
}));
export default useLoginStore