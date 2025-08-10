import React, { useState } from 'react';
import { Layout, Card, Typography, Button, Input, Modal, Form, message, Table, Tag, DatePicker, Select, Space, Tooltip } from 'antd';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useConfig } from '../../contexts/ConfigContext';
const { Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const walletId = 'WALLET20240722001';
const walletAddress = 'TXYZ1234567890abcdef';
const [mockBalance, setMockBalance] = [100, () => {}]; // 100 USDT

// 模拟历史记录
const mockRecords = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  time: dayjs().subtract(i, 'day').format('YYYY-MM-DD HH:mm:ss'),
  amount: i % 2 === 0 ? 40 : 80,
  type: i % 3 === 0 ? '提款' : '收入',
  hash: `0xHASH${i + 1}`,
  block: 1000 + i,
  from: walletAddress,
  to: 'TDEST1234567890abcdef',
}));

const WalletCenter = () => {
  const [balance, setBalance] = useState(100); // 100 USDT
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [detailModal, setDetailModal] = useState({ visible: false, record: null });
  const [filterType, setFilterType] = useState('全部');
  const [filterRange, setFilterRange] = useState([]);
  const [records, setRecords] = useState(mockRecords);
  const [successModal, setSuccessModal] = useState(false); // 新增
  const { withdrawMin = 10, withdrawFee = 1, withdrawTime = '8:00-22:00' } = useConfig();

  // 筛选逻辑
  const filteredRecords = records.filter(r => {
    if (filterType !== '全部' && r.type !== filterType) return false;
    if (filterRange.length === 2) {
      const t = dayjs(r.time);
      if (t.isBefore(filterRange[0]) || t.isAfter(filterRange[1])) return false;
    }
    return true;
  });

  const handleWithdraw = (values) => {
    setWithdrawLoading(true);
    setTimeout(() => {
      setWithdrawLoading(false);
      setWithdrawModal(false);
      setSuccessModal(true); // 打开成功弹窗
      setRecords([
        {
          id: records.length + 1,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          amount: values.amount,
          type: '提款',
          hash: `0xHASH${records.length + 1}`,
          block: 2000 + records.length + 1,
          from: walletAddress,
          to: values.address,
        },
        ...records,
      ]);
      setBalance(b => b - values.amount - 1); // 扣除手续费
    }, 1000);
  };

  // 去掉交易哈希一列
  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '时间', dataIndex: 'time', width: 160 },
    { title: '数额', dataIndex: 'amount', width: 100, render: v => `${v} USDT` },
    { title: '类型', dataIndex: 'type', width: 80, render: t => <Tag color={t === '收入' ? 'green' : 'orange'}>{t}</Tag> },
    { title: '操作', dataIndex: 'op', width: 100, render: (_, r) => <Button icon={<EyeOutlined />} size="small" onClick={() => setDetailModal({ visible: true, record: r })}>显示详情</Button> },
  ];

  return (
    // <Layout style={{ minHeight: '100vh' }}>
    //   <Layout>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Card style={{ marginBottom: 24 }}>
              <Title level={4}>钱包中心</Title>
              <div style={{ marginBottom: 12 }}><Text strong>钱包编号：</Text>{walletId}</div>
              <div style={{ marginBottom: 12 }}><Text strong>钱包余额：</Text><span style={{ color: '#1677ff', fontWeight: 700 }}>{balance} USDT</span></div>
              <div style={{ marginBottom: 12, color: '#faad14' }}>达到打款门槛{withdrawMin}USDT后可申请提款，提款手续费{withdrawFee}USDT。<br/>处理时间：2小时（{withdrawTime} 北京时间）。</div>
              <Button type="primary" disabled={balance < withdrawMin + withdrawFee} onClick={() => setWithdrawModal(true)}>提款</Button>
            </Card>
            <Card style={{ marginBottom: 24 }}>
              <Space style={{ marginBottom: 16, width: '100%', flexWrap: 'wrap' }}>
                <RangePicker showTime onChange={v => setFilterRange(v || [])} style={{ minWidth: 160 }} />
                <Select value={filterType} style={{ width: 120, height: 40 }} onChange={setFilterType} dropdownStyle={{ fontSize: 14 }}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value="全部">全部</Option>
                  <Option value="收入">收入</Option>
                  <Option value="提款">提款</Option>
                </Select>
              </Space>
              <Table columns={columns} dataSource={filteredRecords} rowKey="id" pagination={{ pageSize: 6 }} scroll={{ x: 900 }} />
            </Card>
          </div>
          <Modal open={withdrawModal} title="申请提款" onCancel={() => setWithdrawModal(false)} footer={null}>
            <Form layout="vertical" onFinish={handleWithdraw} initialValues={{ network: 'TRC20' }}>
              <Form.Item
                name="address"
                label="钱包地址"
                rules={[
                  {
                    required: true,
                    message: '请输入钱包地址',
                  },
                  {
                    pattern: /^[A-Za-z0-9]+$/,
                    message: '钱包地址只能包含数字或字母',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="network" label="网络"> <Select><Option value="TRC20">TRC20</Option></Select> </Form.Item>
              <Form.Item name="amount" label="提现数额" rules={[{ required: true, message: '请输入提现数额' }, { validator:(_,v)=>{
                if (!v || !Number.isInteger(Number(v)) || Number(v) < withdrawMin) return Promise.reject(`请输入大于等于${withdrawMin}的正整数`);
                if (Number(v) > balance - withdrawFee) return Promise.reject('余额不足');
                return Promise.resolve();
              }}]}> 
                <Input type="number" min={withdrawMin} step={1} addonAfter="USDT" /> 
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={withdrawLoading}>申请提款</Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal open={detailModal.visible} title="交易详情" onCancel={() => setDetailModal({ visible: false, record: null })} footer={null}>
            {detailModal.record && (
              <div>
                <div><Text strong>金额：</Text>{detailModal.record.amount} USDT</div>
                <div><Text strong>转出地址：</Text>{detailModal.record.from} <Tooltip title="复制"><CopyOutlined onClick={() => {navigator.clipboard.writeText(detailModal.record.from); message.success('已复制');}} style={{ cursor: 'pointer' }} /></Tooltip></div>
                <div><Text strong>交易编号：</Text>{detailModal.record.hash} <Tooltip title="复制"><CopyOutlined onClick={() => {navigator.clipboard.writeText(detailModal.record.hash); message.success('已复制');}} style={{ cursor: 'pointer' }} /></Tooltip></div>
                <div><Text strong>时间：</Text>{detailModal.record.time}</div>
              </div>
            )}
          </Modal>
          {/* 新增成功弹窗 */}
          <Modal
            open={successModal}
            onCancel={() => setSuccessModal(false)}
            footer={null}
            centered
          >
            <div style={{ textAlign: 'center', padding: 24 }}>
              <Typography.Title level={4}>提款已申请</Typography.Title>
              <Typography.Text>需要去邮箱验证。</Typography.Text>
            </div>
          </Modal>
        </Content>
      // </Layout>
    // </Layout>
  );
};
export default WalletCenter; 