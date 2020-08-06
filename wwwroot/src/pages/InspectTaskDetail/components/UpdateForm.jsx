import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Modal, DatePicker,InputNumber } from 'antd';

// 表单项
const FormItem = Form.Item;
//文本输入框
const { TextArea } = Input;

// 表单布局
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

// 更新表单属性设置
const UpdateForm = props => {
  const [formVals, setFormVals] = useState({
    gId: props.values.gId,
    taskNo: props.values.taskNo,
    taskName: props.values.taskName,
    taskOrderNo: props.values.taskOrderNo,
    inspectNo: props.values.inspectNo,
    deviceNo: props.values.deviceNo,
    inspectItemNo: props.values.inspectItemNo,
    inspectUser: props.values.inspectUser,
    inspectTime: props.values.inspectTime,
    remark: props.values.remark,
  });

  // 表单
  const [form] = Form.useForm();

  // 属性
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    modelTitle,
    dispatch,
    inspectData,
    deviceData,
    userData,
    inspectItemsData,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchInspectData',
      });
      dispatch({
        type: 'device/fetchDeviceData',
      });
      dispatch({
        type: 'device/fetchInspectItemsData',
      });
      dispatch({
        type: 'device/fetchUserData',
      });
    }
  }, []);

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  // 表单内容绘制
  const renderContent = () => {

     let selectNodesInspect =  inspectData.map(item => (
      <Select.Option key={item.inspectNo} value={item.inspectNo}>{item.inspectName}</Select.Option>
    ))
    let selectNodesDevice =  deviceData.map(item => (
      <Select.Option key={item.deviceNo} value={item.deviceNo}>{item.deviceName}</Select.Option>
    ))
    let selectNodesInspectItem =  inspectItemsData.map(item => (
      <Select.Option key={item.inspectItemNo} value={item.inspectItemNo}>{item.inspectItemName}</Select.Option>
    ))
    let selectNodesUser =  userData.map(item => (
      <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
    ))

    return (
      <>
        <FormItem
          name="taskNo"
          label="任务编号"
          rules={[
            {
              required: true,
              message: '请输入任务编号！',
            },
          ]}
        >
          <Input placeholder="请输入" readOnly={formVals.gId != 0} />
        </FormItem>

        <FormItem
          name="taskName"
          label="任务名称"
          rules={[
            {
              required: true,
              message: '请输入任务名称！',
            },
          ]}
        >
          <Input placeholder="请输入" readOnly={formVals.gId != 0}/>
        </FormItem>

        <FormItem
          name="taskOrderNo"
          label="顺序编号"
          rules={[
            {
              required: true,
              message: '请输入顺序编号！',
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="请输入"
          />
        </FormItem>

        <FormItem
          name="inspectNo"
          label="巡检点"
          rules={[
            {
              required: true,
              message: '请选择巡检点！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            {selectNodesInspect}
          </Select>
        </FormItem>

        <FormItem
          name="deviceNo"
          label="巡检设备"
          rules={[
            {
              required: true,
              message: '请选择巡检设备！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
             {selectNodesDevice}
          </Select>
        </FormItem>

        <FormItem
          name="inspectItemNo"
          label="巡检项目"
          rules={[
            {
              required: true,
              message: '请选择巡检项目！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
             {selectNodesInspectItem}
          </Select>
        </FormItem>

        <FormItem
          name="inspectUser"
          label="巡检人"
          rules={[
            {
              required: true,
              message: '请选择巡检人！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            {selectNodesUser}
          </Select>
        </FormItem>

        <FormItem
            name="inspectTime"
            label="巡检时间"
            rules={[
              {
                required: true,
                message: '请选择巡检时间！',
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择巡检时间"
            />
          </FormItem>

        <FormItem
          name="remark"
          label="备注"
          rules={[
            {
              message: '请输入至少五个字符的描述！',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </>
    );
  };

  // 模态窗口输出
  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title={modelTitle}
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          taskNo: formVals.taskNo,
          taskName: formVals.taskName,
          taskOrderNo: formVals.taskOrderNo,
          inspectNo: formVals.inspectNo,
          inspectNo: formVals.inspectNo,
          deviceNo: formVals.deviceNo,
          inspectItemNo: formVals.inspectItemNo,
          inspectUser: formVals.inspectUser,
          inspectTime: formVals.inspectTime,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default connect(({ device }) => ({
  inspectData: device.inspectData,
  deviceData: device.deviceData,
  inspectItemsData:device.inspectItemsData,
  userData: device.userData,
}))(UpdateForm);

