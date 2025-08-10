import {create} from 'zustand';
import UserApi from '../api/UserApi.js'
import {setToken, clearToken} from "../utils/token.js"

const useLoginStore = create((set) => ({
    token: "",
    userLogin: async (userForm) => {
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