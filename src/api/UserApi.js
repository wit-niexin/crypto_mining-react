import http from "../utils/http";

// 用户登录
const login = (data) => {
    return http.post("/user/login", data);
};
// 用户分页信息
const getUserList = (data) => {
    return http.get("/user/getAllPage", data);
};

export default {
    login, getUserList
}