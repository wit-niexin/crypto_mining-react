import http from "../utils/http";

const getWithdrawalList = (data) => {
    return http.get("/withdrawal/getAll", data);
};

const updateWithdrawal = (data) => {
    return http.post("/withdrawal/updateWithdrawal", data);
};

export default {
    getWithdrawalList, updateWithdrawal
}