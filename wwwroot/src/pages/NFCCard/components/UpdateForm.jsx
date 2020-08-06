import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Modal } from 'antd';

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
    nfcCardNo: props.values.nfcCardNo,
    printNo: props.values.printNo,
    deviceNo: props.values.deviceNo,
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
    deviceData,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchDeviceData',
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

    let selectNodes =  deviceData.map(item => (
      <Select.Option key={item.deviceNo} value={item.deviceNo}>{item.deviceName}</Select.Option>
    ))

    return (
      <>
        <FormItem
          name="nfcCardNo"
          label="NFC卡编号"
          rules={[
            {
              required: true,
              message: '请输入NFC卡编号！',
            },
          ]}
        >
          <Input placeholder="请输入" readOnly={formVals.gId != 0}/>
        </FormItem>

        <FormItem
          name="printNo"
          label="印刷编号"
          rules={[
            {
              required: true,
              message: '请输入印刷编号！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="deviceNo"
          label="绑定设备"
          rules={[
            {
              required: true,
              message: '请选择绑定设备！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            {selectNodes}
          </Select>

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
          nfcCardNo: formVals.nfcCardNo,
          printNo: formVals.printNo,
          deviceNo: formVals.deviceNo,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default connect(({ device }) => ({
  deviceData: device.deviceData,
}))(UpdateForm);

