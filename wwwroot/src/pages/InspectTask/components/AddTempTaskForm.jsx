import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Modal, DatePicker,Button} from 'antd';

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
const AddTempTaskForm = props => {
  const [formVals, setFormVals] = useState({
    gId: props.values.gId,
    inspectUser: props.values.inspectUser,
    inspectTime: props.values.inspectTime,
    lineName: props.values.lineName,
    remark: props.values.remark,
  });

  // 设置按钮加载状态（提交未执行完时，不能点击）
  const [loading, setLoading] = useState(false);
  
  // 表单
  const [form] = Form.useForm();

  // 属性
  const {
    onSubmit: handleAddTempTask,
    onCancel: handleAddTempTaskModalVisible,
    addTempTaskModalVisible,
    modelTitle,
    dispatch,
    userData,
    inspectLineData,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchUserData',
      });
      dispatch({
        type: 'device/fetchInspectLineData',
      });
    }
  }, []);

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    
    setLoading(true);

    setFormVals({ ...formVals, ...fieldsValue });
    await handleAddTempTask({ ...formVals, ...fieldsValue });

    setLoading(false);
  };

  // 表单内容绘制
  const renderContent = () => {

     let selectNodes =  userData.map(item => (
      <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
    ))

    let selectNodes_inspectLine =  inspectLineData.map(item => (
      <Select.Option key={item.lineName} value={item.lineName}>{item.lineName}</Select.Option>
    ))

    
    return (
      <>
        <FormItem
          name="lineName"
          label="巡检路线"
          rules={[
            {
              required: true,
              message: '请选择巡检路线！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            {selectNodes_inspectLine}
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
      visible={addTempTaskModalVisible}
      onCancel={() => handleAddTempTaskModalVisible()}
      footer={[
        <Button key="back" type="ghost" size="middle" onClick={() => handleAddTempTaskModalVisible()}>取消</Button>,
        <Button key="submit" type="primary" size="middle" loading={loading} onClick={() => handleSubmit()}>
          确定
        </Button>,
      ]}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          inspectUser: formVals.inspectUser,
          inspectTime: formVals.inspectTime,
          lineName: formVals.lineName,
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
  inspectLineData: device.inspectLineData,
}))(AddTempTaskForm);

