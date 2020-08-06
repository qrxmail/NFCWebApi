import { DownOutlined, PlusOutlined, SearchOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Modal,Progress } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddBatchTaskForm from './components/AddBatchTaskForm';
import AddLineTaskForm from './components/AddLineTaskForm';
import AddTempTaskForm from './components/AddTempTaskForm';
import { queryInspectTask, removeInspectTaskByNo, addBatchTask, addLineTask,addTempTask } from './service';
import { connect } from 'umi';
import { routerRedux } from 'dva';

// 确认对话框
const { confirm } = Modal;

// 删除节点
const handleRemove = async selectedRows => {

  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeInspectTaskByNo({
      taskNo: selectedRows.map(row => row.taskNo),
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

// 批量新增巡检任务
const handleAddBatchTask = async fields => {
  const hide = message.loading('正在批量新增巡检任务');

  try {
    let result = await addBatchTask({
      inspectUser: fields.inspectUser,
      inspectTime: fields.inspectTime,
      remark: fields.remark,

      // 创建人：当前用户
      createUser: fields.currentUser,
      // 最新修改人：当前用户
      lastUpdateUser: fields.currentUser,
    });
    if (result.isSuccess) {
      hide();
      message.success('添加成功');
    } else {
      message.error(result.errMsg);
    }
    return result.isSuccess;
  } catch (error) {
    hide();
    message.error('批量新增巡检任务失败请重试！');
    return false;
  }

};

// 新增临时任务
const handleAddTempTask = async fields => {
  const hide = message.loading('正在新增临时巡检任务');

  try {
    let result = await addTempTask({
      inspectUser: fields.inspectUser,
      inspectTime: fields.inspectTime,
      lineName: fields.lineName,
      remark: fields.remark,

      // 创建人：当前用户
      createUser: fields.currentUser,
      // 最新修改人：当前用户
      lastUpdateUser: fields.currentUser,
    });
    if (result.isSuccess) {
      hide();
      message.success('添加成功');
    } else {
      message.error(result.errMsg);
    }
    return result.isSuccess;
  } catch (error) {
    hide();
    message.error('新增临时巡检任务失败请重试！');
    return false;
  }
};

// 新增周期任务(根据巡检线路、巡检周期生成巡检任务)
const handleAddLineTask = async fields => {
  const hide = message.loading('正在新增周期巡检任务');
  try {
    let result = await addLineTask({
      inspectUser: fields.inspectUser,
      inspectCycles: fields.inspectCycles,
      cycleStartTime: fields.cycleStartTime,
      cycleEndTime: fields.cycleEndTime,
      lineName: fields.lineName,
      remark: fields.remark,

      // 创建人：当前用户
      createUser: fields.currentUser,
      // 最新修改人：当前用户
      lastUpdateUser: fields.currentUser,
    });
    if (result.isSuccess) {
      hide();
      message.success('添加成功');
    } else {
      message.error(result.errMsg);
    }
    return result.isSuccess;
  } catch (error) {
    hide();
    message.error('新增周期巡检任务失败请重试！');
    return false;
  }

};

// 表格
const TableList = (props) => {
  // 将当前用户加入到props中
  const {
    currentUser,
    dispatch,
  } = props;

  const [formValues, setFormValues] = useState({});
  const [modelTitle, setModelTitle] = useState("新增");

  // 批量新建巡检任务对话框
  const [addBatchTaskModalVisible, handleAddBatchTaskModalVisible] = useState(false);

  // 新建周期巡检任务对话框（选择巡检线路、巡检周期）
  const [addLineTaskModalVisible, handleAddLineTaskModalVisible] = useState(false);

  // 新建临时巡检任务对话框（选择巡检线路）
  const [addTempTaskModalVisible, handleAddTempTaskModalVisible] = useState(false);

  const actionRef = useRef();
  const columns = [
    {
      title: '任务编号',
      dataIndex: 'taskNo',
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
    },
    {
      title: '巡检路线',
      dataIndex: 'lineName',
      hideInSearch: true,
    },
    {
      title: '巡检周期',
      dataIndex: 'inspectCycles',
      hideInSearch: true,
    },
    {
      title: '周期开始日期',
      dataIndex: 'cycleStartTime',
      valueType: 'date',
      hideInSearch: true,
      hideInTable:true,
    },
    {
      title: '周期结束日期',
      dataIndex: 'cycleEndTime',
      valueType: 'date',
      hideInSearch: true,
      hideInTable:true,
    },
    {
      title: '巡检时间',
      dataIndex: 'inspectTime',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '巡检人',
      dataIndex: 'inspectUser',
    },
    {
      title: '完成度',
      dataIndex: 'sumCount',
      render: (_, record) => (
        <>
          <div>
            <Progress percent={parseInt(record.isCompleteCount)/parseInt(record.sumCount)*100} />
          </div>
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              dispatch(routerRedux.push({
                pathname: '/task/inspectTaskDetail',
                query: {
                  taskNo:record.taskNo
                }
              }));
            }}
          >
            巡检项目详情
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
        headerTitle="查询巡检任务"
        actionRef={actionRef}
        rowKey="gId"
        toolBarRender={(action, { selectedRows }) => [

          // <Button type="primary" onClick={() => {
          //   handleAddBatchTaskModalVisible(true);
          //   setFormValues({ "gId": 0 });
          //   setModelTitle("批量新增巡检任务");
          // }}>
          //   <PlusOutlined /> 新增全巡检点任务
          // </Button>,

          <Button type="primary" onClick={() => {
            handleAddLineTaskModalVisible(true);
            setFormValues({ "gId": 0 });
            setModelTitle("新增周期巡检任务");
          }}>
            <PlusOutlined /> 新增周期任务
          </Button>,

          <Button type="primary" onClick={() => {
            handleAddTempTaskModalVisible(true);
            setFormValues({ "gId": 0 });
            setModelTitle("新增临时巡检任务");
          }}>
            <PlusOutlined /> 新增临时任务
          </Button>,

          selectedRows && selectedRows.length > 0 && (
            <Button type="primary" onClick={() => {

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
        request={(params, sorter, filter) => queryInspectTask({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />

      {formValues && Object.keys(formValues).length && addBatchTaskModalVisible ? (
        <AddBatchTaskForm
          onSubmit={async value => {
            value.currentUser = currentUser.name;
            const success = await handleAddBatchTask(value);

            if (success) {
              handleAddBatchTaskModalVisible(false);
              setFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}

          onCancel={() => {
            handleAddBatchTaskModalVisible(false);
            setFormValues({});
          }}

          addBatchTaskModalVisible={addBatchTaskModalVisible}
          values={formValues}
        />
      ) : null}

      {formValues && Object.keys(formValues).length && addLineTaskModalVisible ? (
        <AddLineTaskForm
          onSubmit={async value => {
            value.currentUser = currentUser.name;
            const success = await handleAddLineTask(value);

            if (success) {
              handleAddLineTaskModalVisible(false);
              setFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}

          onCancel={() => {
            handleAddLineTaskModalVisible(false);
            setFormValues({});
          }}

          addLineTaskModalVisible={addLineTaskModalVisible}
          values={formValues}
        />
      ) : null}

      {formValues && Object.keys(formValues).length && addTempTaskModalVisible ? (
        <AddTempTaskForm
          onSubmit={async value => {
            value.currentUser = currentUser.name;
            const success = await handleAddTempTask(value);

            if (success) {
              handleAddTempTaskModalVisible(false);
              setFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}

          onCancel={() => {
            handleAddTempTaskModalVisible(false);
            setFormValues({});
          }}

          addTempTaskModalVisible={addTempTaskModalVisible}
          values={formValues}
        />
      ) : null}
     
    </PageHeaderWrapper>
  );
};

// 利用connect拿到当前用户
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TableList);

