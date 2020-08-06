import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Modal, DatePicker} from 'antd';

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
const AddBatchTaskForm = props => {
  const [formVals, setFormVals] = useState({
    gId: props.values.gId,
    inspectUser: props.values.inspectUser,
    inspectTime: props.values.inspectTime,
    remark: props.values.remark,
  });

  // 表单
  const [form] = Form.useForm();

  // 属性
  const {
    onSubmit: handleAddBatchTask,
    onCancel: handleAddBatchTaskModalVisible,
    addBatchTaskModalVisible,
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

    handleAddBatchTask({ ...formVals, ...fieldsValue });
  };

  // 表单内容绘制
  const renderContent = () => {

     let selectNodes =  userData.map(item => (
      <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
    ))

    return (
      <>
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
            {selectNodes}
           
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
      visible={addBatchTaskModalVisible}
      onCancel={() => handleAddBatchTaskModalVisible()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
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
  userData: device.userData,
}))(AddBatchTaskForm);

