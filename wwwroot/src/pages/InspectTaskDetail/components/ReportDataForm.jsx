import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Modal, DatePicker,InputNumber  } from 'antd';

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
const ReportDataForm = props => {
  const [formVals, setFormVals] = useState({
    gId: props.values.gId,
    taskId: props.values.taskId,
    taskNo: props.values.taskNo,
    taskName: props.values.taskName,
    inspectNo: props.values.inspectNo,
    deviceNo: props.values.deviceNo,
    inspectItemNo: props.values.inspectItemNo,
    inspectName: props.values.inspectName,
    deviceName: props.values.deviceName,
    inspectItemName: props.values.inspectItemName,

    resultValue: props.values.resultValue,
    inspectTime: props.values.inspectReportTime,
    inspectUser: props.values.inspectReportUser,
    isJumpInspect: props.values.isJumpInspect,
    jumpInspectReason: props.values.jumpInspectReason,
    remark: props.values.remark,
  });

  // 表单
  const [form] = Form.useForm();

  // 属性
  const {
    onSubmit: handleReportData,
    onCancel: handleReportDataModalVisible,
    reportDataModalVisible,
    modelTitle,
    dispatch,
    userData,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchUserData',
      });
    }
  }, []);

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    handleReportData({ ...formVals, ...fieldsValue });
  };

  // 表单内容绘制
  const renderContent = () => {

    let selectNodesUser = userData.map(item => (
      <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
    ))

    return (
      <>

        {/* <FormItem
          name="taskId"
          label="任务Id"
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="taskNo"
          label="任务编号"
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="taskName"
          label="任务名称"
        >
          <Input readOnly={true} />
        </FormItem> */}

        <FormItem
          name="inspectName"
          label="巡检点"
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="deviceName"
          label="巡检设备"
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="inspectItemName"
          label="巡检项目"
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="resultValue"
          label="巡检结果值"
          rules={[
            {
              required: false,
              message: '请输入巡检结果值！',
            },
          ]}
        >

          <InputNumber
            min={0}
            precision={2}
            style={{ width: '100%' }}
            placeholder="请输入巡检结果值"
          />
        </FormItem>

        <FormItem
          name="isJumpInspect"
          label="是否跳检"
          rules={[
            {
              required: false,
              message: '请选择是否跳检！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
            initialValues = {"0"}
          >
            <Select.Option key='0' value="0">否</Select.Option>
            <Select.Option key='1' value="1">是</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          name="jumpInspectReason"
          label="跳检原因"
          rules={[
            {
              message: '请输入至少五个字符的描述！',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
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
      visible={reportDataModalVisible}
      onCancel={() => handleReportDataModalVisible()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          taskId: formVals.taskId,
          taskNo: formVals.taskNo,
          taskName: formVals.taskName,
          inspectNo: formVals.inspectNo,
          deviceNo: formVals.deviceNo,
          inspectItemNo: formVals.inspectItemNo,
          inspectName: formVals.inspectName,
          deviceName: formVals.deviceName,
          inspectItemName: formVals.inspectItemName,

          resultValue: formVals.resultValue,
          inspectTime: formVals.inspectTime,
          inspectUser: formVals.inspectUser,
          isJumpInspect: formVals.isJumpInspect,
          jumpInspectReason: formVals.jumpInspectReason,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default connect(({ device }) => ({
  userData: device.userData,
}))(ReportDataForm);

