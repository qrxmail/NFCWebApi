import { DownOutlined, PlusOutlined, SearchOutlined, MinusOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Modal} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import { queryNFCCard, updateNFCCard, addNFCCard, removeNFCCard } from './service';
import { connect } from 'umi';

// 确认对话框
const { confirm } = Modal;

// 新增/更新节点
const handleUpdate = async fields => {

  // 根据gid是否是0判断是新增还是修改
  let isAdd = fields.gId == 0 ? true: false;

  // 新增
  if (isAdd){
    const hide = message.loading('正在添加');

    try {
      // 需要删除gId，否则后台会转换失败
      delete fields.gId;
      // 最新修改人：当前用户
      fields.lastUpdateUser = fields.currentUser,
      // 创建人：当前用户
      fields.createUser = fields.currentUser;
      let result = await addNFCCard({ ...fields });
      if (result.isSuccess){
        hide();
        message.success('添加成功');
      } else{
        message.error(result.errMsg);
      }
      return result.isSuccess;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }

  } else {
    
    // 修改
    const hide = message.loading('正在修改');

    try {
      let result = await updateNFCCard({
        nfcCardNo: fields.nfcCardNo,
        printNo: fields.printNo,
        deviceNo: fields.deviceNo,
        remark: fields.remark,
        // 最新修改人：当前用户
        lastUpdateUser: fields.currentUser,
        gId: fields.gId,
      });
      if (result.isSuccess){
        hide();
        message.success('修改成功');
      } else{
        message.error(result.errMsg);
      }
      return result.isSuccess;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  }
 
};

// 删除节点
const handleRemove = async selectedRows => {
  
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeNFCCard({
      gId: selectedRows.map(row => row.gId),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }

};

 
// 表格
const TableList = (props) => {
  // 将当前用户加入到props中
  const {
    currentUser
  } = props;

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [modelTitle,setModelTitle] = useState("新增");
 
  const actionRef = useRef();
  const columns = [
    {
      title: 'NFC卡编号',
      dataIndex: 'nfcCardNo',
      hideInSearch: false,
      sorter: true,
    },
    {
      title: '印刷编号',
      dataIndex: 'printNo',
      hideInSearch: false,
    },
    {
      title: '设备编号',
      dataIndex: 'deviceNo',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastUpdateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '最后修改人',
      dataIndex: 'lastUpdateUser',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '最后巡检时间',
      dataIndex: 'lastInspectTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '最后巡检人',
      dataIndex: 'lastInspectUser',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
              setModelTitle("修改");
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {

              // 删除确认
              confirm({
                title: '您确定要删除这条记录吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                onOk() {
                  var delRows = [];
                  delRows.push(record);
                  handleRemove(delRows);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
                onCancel() {
                },
              });
            
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="查询NFC卡"
        actionRef={actionRef}
        rowKey="gId"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => {
            handleUpdateModalVisible(true);
            setFormValues({"gId":0});
            setModelTitle("新增");
          }}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button type="primary"  onClick={() => {
              
              // 删除确认
              confirm({
                title: '您确定要删除这些记录吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                onOk() {
                  handleRemove(selectedRows);
                  action.reload();
                },
                onCancel() {
                },
              });
              
            }}
            
            >
              <MinusOutlined /> 批量删除
            </Button>

          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div>
        )}
        request={(params, sorter, filter) => queryNFCCard({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />

      {formValues && Object.keys(formValues).length && updateModalVisible? (
        <UpdateForm
          onSubmit={async value => {
            value.currentUser = currentUser.name;
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}

          onCancel={() => {
            handleUpdateModalVisible(false);
            setFormValues({});
          }}

          updateModalVisible={updateModalVisible}
          values={formValues}
          modelTitle = {modelTitle}
        />
      ) : null}


    </PageHeaderWrapper>
  );
};

// 利用connect拿到当前用户
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TableList);

