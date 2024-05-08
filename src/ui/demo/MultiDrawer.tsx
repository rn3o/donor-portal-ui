import React, { useState } from 'react';
import { Drawer, Button, Select, Space, Flex } from 'antd';

const { Option } = Select;

interface MultiDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const MultiDrawer: React.FC<MultiDrawerProps> = ({ visible, onClose }) => {
  const [isChildDrawerOpen, setChildDrawerOpen] = useState(false); // State to manage the visibility of the child drawer

  const showChildrenDrawer = () => {
    setChildDrawerOpen(true);
  };

  const closeChildrenDrawer = () => {
    setChildDrawerOpen(false);
  };

  return (
    <Drawer
      title="Drawer Title"
      width={600}
      closable={false}
      onClose={onClose}
      open={visible}
      // maskClosable={false}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      <Flex vertical gap="24px">
        Some Content ... <br />
        Some Content ... <br />
        Some Content ... <br />
        {/* Drawer content */}
        <Button type="primary" onClick={showChildrenDrawer}>
          Open Sub
        </Button>
      </Flex>

      <Drawer
        title="Sub-level"
        width={500}
        closable={false}
        onClose={closeChildrenDrawer}
        open={isChildDrawerOpen} // Use state to control child drawer visibility
        extra={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button> */}
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {/* <CreateAccountForm /> */}
      </Drawer>
    </Drawer>
  );
};

export default MultiDrawer;
