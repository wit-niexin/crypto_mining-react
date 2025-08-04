import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Popover,
    Radio,
    Table,
    Select,
    Space,
    ConfigProvider,
    Watermark,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import {useEffect, useState} from "react";

// 导入APi
import userApi from "../../api/MiningRigApi";

const MiningRig = () => {
    const {Column} = Table;
    const [params, setParams] = useState({
        current: 1,
        size: 10,
        name: "",
        code: "",
    });
    const [blogList, setBlogList] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getBlogList();
    }, [params]); //监听搜索参数的变化，如果变化了，就重新获取数据
    const getBlogList = async () => {
        const {data} = await userApi.getMiningRigList(params);
        setTotal(data.data.total);
        setBlogList(data.data);
    };
    const handlePaginationChange = (newPageNum, newPageSize) => {
        setParams({
            ...params,
            current: newPageNum,
            size: newPageSize,
            name: "",
            code: "",
        });
    };

    // 展示总条数
    const showTotal = (total) => {
        return `共 ${total} 条`;
    };

    return (
        <div>
            {/* 操作栏 */}
            <Space style={{marginBottom: "10px"}}>
                <Input.Search
                    value={params.name}
                    onChange={(e) => setParams({...params, name: e.target.value})}
                    style={{width: "200px"}}
                    allowClear
                    placeholder="请输入矿机名称"
                    enterButton
                />
            </Space>
            <ConfigProvider locale={zhCN}>
                <Table
                    rowKey={(record) => record.id}
                    bordered={true}
                    pagination={{
                        current: params.current,
                        pageSize: params.size,
                        total: total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: showTotal,
                        onChange: handlePaginationChange,
                    }}
                    dataSource={blogList}
                    scroll={{y: 340}}
                >
                    <Column title="名称" dataIndex="name" key="name"/>
                    <Column title="型号" dataIndex="model" key="model"/>
                    <Column title="状态" dataIndex="status" key="status"/>
                    <Column title="制造商" dataIndex="manufacturer" key="manufacturer"/>
                    <Column title="购买价" dataIndex="price" key="price"/>
                    <Column title="启用时间" dataIndex="commissioningDate" key="commissioningDate"/>
                </Table>
            </ConfigProvider>
        </div>
    );
};

export default MiningRig;
