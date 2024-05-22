import React, { useState } from 'react';
import { Flex, Typography, Modal, Button, theme } from 'antd';
import {
  FolderOutlined,
  ShareAltOutlined,
  UserOutlined,
  PlusOutlined,
  FileOutlined,
  CloseOutlined,
  HeartFilled,
} from '@ant-design/icons';
import CreateDonationForm from '../ui/CreateDonationForm';

const { Text, Link } = Typography;

const EmbedExample: React.FC = () => {

  const { token } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        height: '80vh',
        minHeight: 1200,
        alignItems: 'center'
      }}
    >
      <Button icon={<HeartFilled />} type="primary" onClick={showModal}>
        Donate
      </Button>
      <Flex vertical>

        <Modal
          destroyOnClose
          closable={false}
          width={400}
          // title="Basic Modal" 
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <div style={{ margin: `-${token.sizeXL}px` }}>
            <CreateDonationForm />
          </div>

          <Button shape="circle" icon={<CloseOutlined />} onClick={handleCancel} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.5 }} />
          
        </Modal>

      </Flex>

      <div />
    </div>
  );
};

export default EmbedExample;

