import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Divider, Layout } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

// 模拟用户信息
const mockUser = {
  id: 'U20240722001',
  email: 'user@example.com',
  phone: '',
};

const AccountSettings = () => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState(mockUser.phone);
  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const handlePhoneUpdate = () => {
    form.validateFields(['phone']).then(values => {
      setLoading(true);
      setTimeout(() => {
        setPhone(values.phone);
        setLoading(false);
        message.success('手机号已更新');
      }, 500);
    });
  };

  const handlePwdUpdate = (values) => {
    setPwdLoading(true);
    setTimeout(() => {
      setPwdLoading(false);
      message.success('密码已更新');
      form.resetFields(['currentPwd', 'newPwd', 'confirmPwd']);
    }, 800);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ maxWidth: 500, margin: '40px auto' }}>
            <Card>
              <Title level={4}>账户信息</Title>
              <Form form={form} layout="vertical" initialValues={{ phone }}>
                <Form.Item label="账户ID">
                  <Input value={mockUser.id} disabled />
                </Form.Item>
                <Form.Item label="电子邮箱地址">
                  <Input value={mockUser.email} disabled />
                </Form.Item>
                <Form.Item name="phone" label="电话号码" rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }]}> <Input placeholder="请输入手机号" maxLength={11} /> </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handlePhoneUpdate} loading={loading}>更新手机号</Button>
                </Form.Item>
              </Form>
              <Divider />
              <Title level={5}>更新密码</Title>
              <Form layout="vertical" onFinish={handlePwdUpdate} style={{ marginTop: 16 }}>
                <Form.Item name="currentPwd" label="当前密码" rules={[{ required: true, message: '请输入当前密码' }]}> <Input.Password /> </Form.Item>
                <Form.Item name="newPwd" label="新密码" rules={[{ required: true, message: '请输入新密码' }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: '8位，含大写、小写字母和数字' }]}> <Input.Password /> </Form.Item>
                <Form.Item name="confirmPwd" label="确认新密码" dependencies={["newPwd"]} rules={[
                  { required: true, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPwd') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码不一致'));
                    },
                  }),
                ]}> <Input.Password /> </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={pwdLoading}>更新密码</Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AccountSettings; 