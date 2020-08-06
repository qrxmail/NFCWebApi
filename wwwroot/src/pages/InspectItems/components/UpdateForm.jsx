import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';

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
    inspectItemNo: props.values.inspectItemNo,
    inspectItemName: props.values.inspectItemName,
    valueType: props.values.valueType,
    unit: props.values.unit,
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
          name="inspectItemNo"
          label="巡检项目编号"
          rules={[
            {
              required: true,
              message: '请输入巡检项目编号！',
            },
          ]}
        >
          <Input placeholder="请输入" readOnly={formVals.gId != 0} />
        </FormItem>

        <FormItem
          name="inspectItemName"
          label="巡检项目名称"
          rules={[
            {
              required: true,
              message: '请输入巡检项目名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="valueType"
          label="值类型"
          rules={[
            {
              required: true,
              message: '请输入值类型！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="unit"
          label="数量单位"
          rules={[
            {
              required: true,
              message: '请输入数量单位！',
            },
          ]}
        >
          <Input placeholder="请输入" />
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
          inspectItemNo: formVals.inspectItemNo,
          inspectItemName: formVals.inspectItemName,
          valueType: formVals.valueType,
          unit: formVals.unit,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;

