import http from "../utils/http";
// 博客分页信息
const getUserBenefitsList = (data) => {
    return http.get("/user_benefit/getAllPage", data);
};
// 保存博客
const saveUserBenefits = (data) => {
    return http.post("/blog/save", data);
};
// 删除博客
const delUserBenefits = (data) => {
    return http.del("/blog/delete/" + data);
};
// 获取博客
const getUserBenefitsInfo = (data) => {
    return http.get("/blog/info/" + data);
};
export default {
    getUserBenefitsList,
    saveUserBenefits,
    delUserBenefits,
    getUserBenefitsInfo
}