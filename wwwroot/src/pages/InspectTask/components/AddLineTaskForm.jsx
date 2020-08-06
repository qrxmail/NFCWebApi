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
const AddLineTaskForm = props => {
  const [formVals, setFormVals] = useState({
    gId: props.values.gId,
    inspectCycles: props.values.inspectCycles,
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
    onSubmit: handleAddLineTask,
    onCancel: handleAddLineTaskModalVisible,
    addLineTaskModalVisible,
    modelTitle,
    dispatch,
    userData,
    inspectLineData,
    inspectCyclesData,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchUserData',
      });
      dispatch({
        type: 'device/fetchInspectLineData',
      });
      dispatch({
        type: 'device/fetchInspectCyclesData',
      });
    }
  }, []);

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    
    setLoading(true);

    setFormVals({ ...formVals, ...fieldsValue });
    await handleAddLineTask({ ...formVals, ...fieldsValue });
  
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

    let selectNodes_inspectCycles =  inspectCyclesData.map(item => (
      <Select.Option key={item.cycleName} value={item.cycleName}>{item.cycleName}</Select.Option>
    ))

    return (
      <>
        {/* <FormItem
          name="inspectCycles"
          label="巡检周期"
          rules={[
            {
              required: true,
              message: '请选择巡检周期！',
            },
          ]}
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            {selectNodes_inspectCycles}
          </Select>
        </FormItem> */}

        <FormItem
          name="inspectCycles"
          label="周期类型"
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            <Select.Option key='1' value='每两小时巡检一次'>每两小时巡检一次</Select.Option>
          </Select>
        </FormItem>

        <FormItem
            name="cycleStartTime"
            label="周期开始日期"
            rules={[
              {
                required: true,
                message: '请选择周期开始日期！',
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              format="YYYY-MM-DD"
              placeholder="选择周期开始日期"
            />
        </FormItem>

        <FormItem
            name="cycleEndTime"
            label="周期结束日期"
            rules={[
              {
                required: true,
                message: '请选择周期结束日期！',
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              format="YYYY-MM-DD"
              placeholder="选择周期结束日期"
            />
        </FormItem>

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
      visible={addLineTaskModalVisible}
      onCancel={() => handleAddLineTaskModalVisible()}
      footer={[
        <Button key="back" type="ghost" size="middle" onClick={() => handleAddLineTaskModalVisible()}>取消</Button>,
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
          inspectCycles: formVals.inspectCycles,
          cycleStartTime: formVals.cycleStartTime,
          cycleEndTime: formVals.cycleEndTime,
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
  inspectCyclesData: device.inspectCyclesData,
}))(AddLineTaskForm);

