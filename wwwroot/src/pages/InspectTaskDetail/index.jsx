import { DownOutlined, PlusOutlined, SearchOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import ReportDataForm from './components/ReportDataForm';
import { queryInspectTask, updateInspectTask, addInspectTask, removeInspectTask, addInspectData } from './service';
import { connect } from 'umi';
import moment from 'moment'

// 确认对话框
const { confirm } = Modal;

// 新增/更新节点
const handleUpdate = async fields => {

  // 根据gid是否是0判断是新增还是修改
  let isAdd = fields.gId == 0 ? true : false;

  // 新增
  if (isAdd) {

    const hide = message.loading('正在添加');

    try {
      // 需要删除gId，否则后台会转换失败
      delete fields.gId;
      // 最新修改人：当前用户
      fields.lastUpdateUser = fields.currentUser,
        // 创建人：当前用户
        fields.createUser = fields.currentUser;
      fields.inspectTime = fields.inspectTime;
      let result = await addInspectTask({ ...fields });
      if (result.isSuccess) {
        hide();
        message.success('添加成功');
      } else {
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
      let result = await updateInspectTask({
        taskNo: fields.taskNo,
        taskName: fields.taskName,
        taskOrderNo: fields.taskOrderNo,
        inspectNo: fields.inspectNo,
        deviceNo: fields.deviceNo,
        inspectItemNo: fields.inspectItemNo,
        inspectUser: fields.inspectUser,
        inspectTime: fields.inspectTime,
        remark: fields.remark,

        // 最新修改人：当前用户
        lastUpdateUser: fields.currentUser,
        gId: fields.gId,
      });
      if (result.isSuccess) {
        hide();
        message.success('修改成功');
      } else {
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
    await removeInspectTask({
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

// 巡检数据上报
const handleReportData = async fields => {

  const hide = message.loading('正在添加');

  try {
    // 需要删除gId，否则后台会转换失败
    delete fields.gId;
    // 最新修改人：当前用户
    fields.lastUpdateUser = fields.currentUser,
      // 创建人：当前用户
      fields.createUser = fields.currentUser;
    fields.inspectTime = fields.inspectTime;
    let result = await addInspectData({ ...fields });
    console.log(result);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }

};


// 表格
const TableList = (props) => {

  // 将当前用户加入到props中
  const {
    currentUser,
    location: { query }
  } = props;

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [modelTitle, setModelTitle] = useState("新增");

  // 巡检数据上报对话框
  const [reportDataModalVisible, handleReportDataModalVisible] = useState(false);

  const actionRef = useRef();
  const columns = [
    {
      title: '任务Id',
      dataIndex: 'taskId',
      hideInTable:true,
      hideInSearch:true,
    },
    {
      title: '任务编号',
      dataIndex: 'taskNo',
      hideInTable: false,
      hideInSearch: false,
    },
    {
      title: '巡检点编号',
      dataIndex: 'inspectNo',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '巡检点',
      dataIndex: 'inspectName',
    },
    {
      title: '设备编号',
      dataIndex: 'deviceNo',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '设备',
      dataIndex: 'deviceName',
    },
    {
      title: '巡检项目编号',
      dataIndex: 'inspectItemNo',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '巡检项目',
      dataIndex: 'inspectItemName',
    },
    {
      title: '状态',
      dataIndex: 'isComplete',
      valueEnum: {
        "0": {
          text: '待下发',
          status: 'Error',
        },
        "1": {
          text: '待完成',
          status: 'Error',
        },
        "2": {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '巡检完成时间',
      dataIndex: 'inspectCompleteTime',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '巡检完成人',
      dataIndex: 'inspectCompleteUser',
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
              record.inspectTime = moment(record.inspectTime, 'YYYY-MM-DD HH:mm:ss');
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

          <Divider type="vertical" />

          {/* 任务已完成，则不显示巡检数据上报 */}
          {record.isComplete == "1" ?
            <a
              onClick={() => {
                handleReportDataModalVisible(true);
                // 巡检数据上报对应的任务id
                record.taskId = record.gId;
                // 巡检时间默认为当前时间
                record.inspectReportTime = moment(new Date());
                // 巡检人默认为当前用户
                record.inspectReportUser = currentUser.name;
                // 是否跳检为否
                record.isJumpInspect = "0";
                setFormValues(record);
                setModelTitle("巡检数据上报");
              }}
            >
              巡检数据上报
          </a>
            : null}

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
        request={(params, sorter, filter) =>
        {
          params.taskNo = query.taskNo;
          return queryInspectTask({ ...params, sorter, filter })
        }
      }
        columns={columns}
        rowSelection={{}}
      />

      {formValues && Object.keys(formValues).length && updateModalVisible ? (
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
          modelTitle={modelTitle}
        />
      ) : null}
      
      {formValues && Object.keys(formValues).length && reportDataModalVisible ? (
        <ReportDataForm
          onSubmit={async value => {
            value.currentUser = currentUser.name;
            const success = await handleReportData(value);

            if (success) {
              handleReportDataModalVisible(false);
              setFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}

          onCancel={() => {
            handleReportDataModalVisible(false);
            setFormValues({});
          }}

          reportDataModalVisible={reportDataModalVisible}
          values={formValues}
          modelTitle={modelTitle}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

// 利用connect拿到当前用户
export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(TableList);

