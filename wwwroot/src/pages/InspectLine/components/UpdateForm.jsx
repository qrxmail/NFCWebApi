import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, TreeSelect } from 'antd';
import { connect } from 'umi';

// 树选择方式：只显示子节点
const { SHOW_CHILD } = TreeSelect;

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
  // 表单属性
  const [formVals, setFormVals] = useState({
    gId: props.values.gId,
    lineName: props.values.lineName,
    deviceInspectItems: props.values.deviceInspectItemsArr,
    deviceInspectItemsName: props.values.deviceInspectItemsNameArr,
    remark: props.values.remark,
  });

  // 选中的树节点
  const [treeValue, setTreeValue] = useState([]);
  // 将修改的值设置为初始值
  const [treeValueName, setTreeValueName] = useState(props.values.deviceInspectItemsNameArr);

  // 树节点选择事件
  const onChange = (value, label, extra) => {
    setTreeValue(value);
    setTreeValueName(label);
  };

  // 表单
  const [form] = Form.useForm();

  // 属性
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    modelTitle,
    dispatch,
    treeData,
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'device/fetchInspectItemTreeData',
      });
    }
  }, []);

  // 提交事件
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.deviceInspectItemsName = treeValueName;
    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  // 表单内容绘制
  const renderContent = () => {

    // 选择树属性
    const tProps = {
      treeData,
      value: treeValue,
      onChange: onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_CHILD,
      treeDefaultExpandAll: true,
      placeholder: '请选择',
      style: {
        width: '100%',
      },
    };

    return (
      <>
        <FormItem
          name="lineName"
          label="线路名称"
          rules={[
            {
              required: true,
              message: '请输入线路名称！',
            },
          ]}
        >
          <Input placeholder="请输入"/>
        </FormItem>

        <FormItem
          name="deviceInspectItems"
          label="设备及巡检项目"
          rules={[
            {
              required: true,
              message: '请选择设备及巡检项目！',
            },
          ]}
        >
          <TreeSelect {...tProps} />
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
          lineName: formVals.lineName,
          deviceInspectItems: formVals.deviceInspectItems,
          deviceInspectItemsName: formVals.deviceInspectItemsName,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default connect(({ device }) => ({
  treeData: device.inspectItemTreeData,
}))(UpdateForm);



