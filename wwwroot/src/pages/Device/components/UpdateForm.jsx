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
    site: props.values.site,
    region: props.values.region,
    deviceNo: props.values.deviceNo,
    deviceName: props.values.deviceName,
    inspectNo: props.values.inspectNo,
    deviceType: props.values.deviceType,
    longitude: props.values.longitude,
    latitude: props.values.latitude,
    baiduLongitude: props.values.baiduLongitude,
    baiduLatitude: props.values.baiduLatitude,
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
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchInspectData',
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

     let selectNodes =  inspectData.map(item => (
      <Select.Option key={item.inspectNo} value={item.inspectNo}>{item.inspectName}</Select.Option>
    ))

    return (
      <>
        <FormItem
          name="site"
          label="站点"
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            <Select.Option key='1' value="江苏油田采油二厂">江苏油田采油二厂</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          name="region"
          label="区域"
        >
          <Select
            style={{
              width: '100%',
            }}
          >
            <Select.Option key='1' value="卞东">卞东</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          name="deviceNo"
          label="设备编号"
          rules={[
            {
              required: true,
              message: '请输入设备编号！',
            },
          ]}
        >
          <Input placeholder="请输入" readOnly={formVals.gId != 0}/>
        </FormItem>

        <FormItem
          name="deviceName"
          label="设备名称"
          rules={[
            {
              required: true,
              message: '请输入设备名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
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
            {selectNodes}
           
          </Select>

        </FormItem>

        <FormItem
          name="deviceType"
          label="设备类型"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="longitude"
          label="经度"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="latitude"
          label="纬度"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="baiduLongitude"
          label="百度经度"
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          name="baiduLatitude"
          label="百度纬度"
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
          site: formVals.site,
          region: formVals.region,
          deviceNo: formVals.deviceNo,
          deviceName: formVals.deviceName,
          inspectNo: formVals.inspectNo,
          deviceType: formVals.deviceType,
          longitude: formVals.longitude,
          latitude: formVals.latitude,
          baiduLongitude: formVals.baiduLongitude,
          baiduLatitude: formVals.baiduLatitude,
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
}))(UpdateForm);

