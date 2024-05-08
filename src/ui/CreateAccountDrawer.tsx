import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Popconfirm,
} from 'antd';

import CreateAccountForm from '../ui/CreateAccountForm';

const handleConfirm = (formType) => {
  // message.success('Form removed');
};

interface CreateAccountDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CreateAccountDrawer: React.FC<CreateAccountDrawerProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Drawer
      title="Create Account"
      width={500}
      closable={false}
      onClose={onClose}
      open={visible}
      maskClosable={false}
      destroyOnClose
      extra={
        <Space>
          {/* <Button onClick={onClose}>Cancel</Button> */}

          <Popconfirm
            title="Are you sure"
            description="Details you entered wont be saved"
            onConfirm={onClose}
            okText="Yes"
            cancelText="No"
            placement="bottomRight"
          >
            <Button>Cancel</Button>
          </Popconfirm>
          <Button type="primary" disabled>
            Create
          </Button>
        </Space>
      }
    >
      <CreateAccountForm />
    </Drawer>
  );
};

export default CreateAccountDrawer;
