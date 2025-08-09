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
import userApi from "../../api/UserApi";

const Withdrawal = () => {
    const {Column} = Table;
    const [params, setParams] = useState({
        current: 1,
        size: 10,
        name: "",
        code: "",
    });
    const [userList, setUserList] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getBlogList();
    }, [params]); //监听搜索参数的变化，如果变化了，就重新获取数据
    const handleOpenUpdateModal = (row) => {
        // //将当前行的数据赋值给表单
        // form.setFieldsValue(row);
        // setIsUpdate(true);
        // setIsModalOpen(true);
    };
    // 删除博客
    const handleDeleteBlog = async (id) => {
        // await blogApi.delBlog(id);
        // message.success("删除成功");
        // getBlogList();
    };
    const getBlogList = async () => {
        const {data} = await userApi.getUserList(params);
        setTotal(data.data.total);
        setUserList(data.data);
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
                    placeholder="请输入用户姓名"
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
                    dataSource={userList}
                    scroll={{y: 340}}
                >
                    <Column title="姓名" dataIndex="legalName" key="legalName"/>
                    <Column title="性别" dataIndex="gender" key="gender"/>
                    <Column title="邮箱" dataIndex="email" key="email"/>
                    <Column title="注册时间" dataIndex="regTime" key="regTime"/>
                    <Column title="状态" dataIndex="status" key="status"/>
                    <Column
                        title="操作"
                    key="action"
                    render={(_, record) => (
                    <span>
          <Button
              style={{
                  backgroundColor: "orange",
                  color: "white",
                  marginRight: "5px",
              }}
              onClick={() => handleOpenUpdateModal(record)}
          >
            编辑
          </Button>
          <Popover
              title="您确定要删除该用户吗？"
              content={
                  <Button
                      onClick={() => handleDeleteBlog(record)}
                      type="primary"
                      danger
                  >
                      确定
                  </Button>
              }
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popover>
        </span>
                    )}
                    />
                </Table>
            </ConfigProvider>
        </div>
    );
};

export default Withdrawal;
