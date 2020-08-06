import React, { useState } from 'react';
import { Form, Input, Select, Modal } from 'antd';

// 表单项
const FormItem = Form.Item;

// 表单布局
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

// 表单属性设置
const SetInspectItemsForm = props => {
  // 表单
  const [form] = Form.useForm();

  // 属性
  const {
    onSubmit: handleSetInspectItems,
    onCancel: handleSetInspectItemsModalVisible,
    setInspectItemsModalVisible,
  } = props;

  // 给表单设置值
  const [formVals, setFormVals] = useState({
    deviceNo: props.values.deviceNo,
    deviceName: props.values.deviceName,
    inspectItemNos: props.values.inspectItemNos,
  });

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleSetInspectItems({ ...formVals, ...fieldsValue });
  };

  // 表单内容绘制
  const renderContent = () => {

    let selectNodes = props.values.inspectItemsData.map(item => (
      <Select.Option key={item.inspectItemNo} value={item.inspectItemNo}>{item.inspectItemName}</Select.Option>
    ));

    return (
      <>
        <FormItem
          name="deviceNo"
          label="设备编号"
          key='1'
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="deviceName"
          label="设备名称"
          key='2'
        >
          <Input readOnly={true} />
        </FormItem>

        <FormItem
          name="inspectItemNos"
          label="巡检项目"
          key='3'
          rules={[
            {
              required: true,
              message: '请选择巡检项目！',
            },
          ]}
        >

          <Select
            mode="multiple"
            style={{
              width: '100%',
            }}
          >
            {selectNodes}
          </Select>

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
      title='设置巡检项目'
      visible={setInspectItemsModalVisible}
      onCancel={() => handleSetInspectItemsModalVisible()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          deviceNo: formVals.deviceNo,
          deviceName: formVals.deviceName,
          inspectItemNos: formVals.inspectItemNos,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default SetInspectItemsForm

