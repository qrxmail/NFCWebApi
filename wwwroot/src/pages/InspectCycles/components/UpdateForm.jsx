import React, { useState } from 'react';
import { Form, Input, Modal,Select } from 'antd';

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
    cycleName: props.values.cycleName,
    cycleType: props.values.cycleType,
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
  } = props;

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  // 表单内容绘制
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="cycleName"
          label="周期名称"
          rules={[
            {
              required: true,
              message: '请输入周期名称！',
            },
          ]}
        >
          <Input placeholder="请输入"/>
        </FormItem>

        <FormItem
          name="cycleType"
          label="周期类型"
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            <Select.Option key='1' value='每两小时巡检一次'>每两小时巡检一次</Select.Option>
            <Select.Option key='2' value='每天巡检一次'>每天巡检一次</Select.Option>
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
          cycleName: formVals.cycleName,
          cycleType: formVals.cycleType,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;

