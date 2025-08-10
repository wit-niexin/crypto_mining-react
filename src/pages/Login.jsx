import {Card, Button, Form, Input, message} from "antd";
import {useNavigate} from "react-router-dom";
import useLoginStore from "../store/useLoginStore.js";
import zhifou from "../assets/images/zhifou.gif";

const Login = () => {
    const {userLogin} = useLoginStore();
    const navigate = useNavigate();
    const onFinish = async (loginForm) => {
        try {
            await userLogin(loginForm);
            navigate("/");
        } catch (error) {
            message.error(error.message);
        }
    };
    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo.message);
    };
    return (
        <div
            style={{
                height: 800,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                style={{
                    width: 400,
                }}
                cover={<img alt="example" src={zhifou}/>}
            >
                <Form
                    style={{
                        maxWidth: 400,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "用户账号不能为空!",
                            },
                        ]}
                    >
                        <Input placeholder="请输入账号"/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
export default Login;
