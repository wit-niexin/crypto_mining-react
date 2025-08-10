import React, { useState } from 'react';
import { Layout, Card, Table, Tag, Typography } from 'antd';
//import TopNav from '../components/TopNav';
//import SideMenu from '../components/SideMenu';

const { Content } = Layout;
const { Title } = Typography;

// mock数据
const minerData = [
  {
    key: '1',
    name: 'A15 Pro-1',
    onlineAt: '2024-07-01 10:00:00',
    status: '在线',
    days: 22,
    avgDaily: 40,
    total: 880,
    apy: '73%',
    roi: '120%'
  },
  {
    key: '2',
    name: 'A15 Pro-2',
    onlineAt: '2024-06-15 09:30:00',
    status: '离线',
    days: 38,
    avgDaily: 40,
    total: 1520,
    apy: '73%',
    roi: '110%'
  },
  {
    key: '3',
    name: 'A15 Pro-3',
    onlineAt: '2024-05-10 14:20:00',
    status: '失效',
    days: 70,
    avgDaily: 40,
    total: 2800,
    apy: '73%',
    roi: '95%'
  },
];

const statusColor = {
  '在线': 'green',
  '离线': 'orange',
  '失效': 'red',
};

const columns = [
  { title: '矿机名称', dataIndex: 'name', key: 'name' },
  { title: '上线日期时间', dataIndex: 'onlineAt', key: 'onlineAt' },
  { title: '状态', dataIndex: 'status', key: 'status', render: s => <Tag color={statusColor[s]}>{s}</Tag> },
  { title: '运行天数', dataIndex: 'days', key: 'days' },
  { title: '每日平均收益', dataIndex: 'avgDaily', key: 'avgDaily', render: v => `${v} USDT` },
  { title: '累计收益', dataIndex: 'total', key: 'total', render: v => `${v} USDT` },
  { title: '年化收益率', dataIndex: 'apy', key: 'apy' },
];

const MyMiner = () => {
  return (
    // <Layout style={{ minHeight: '100vh' }}>
    //   <Layout>
    //     <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Card>
              <Title level={4}>我的矿机</Title>
              <Table columns={columns} dataSource={minerData} pagination={false} bordered style={{ marginTop: 24 }} />
            </Card>
          </div>
        // </Content>
      // </Layout>
    // </Layout>
  );
};
export default MyMiner; 