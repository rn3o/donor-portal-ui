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

const DonatonWidgetsDemo: React.FC = () => {

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
        // height: '80vh',
        // minHeight: 1200,
        padding: 60,
        alignItems: 'center'
      }}
    >
      <Button icon={<HeartFilled />} type="primary" onClick={showModal}>
        Donate
      </Button>

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
          <CreateDonationForm allowAllocate
          // customFields={[
          //   { customFieldType: 'shortText', placeholderTextField: 'Name on Plaque' },
          // ]}
          />
        </div>

        <Button shape="circle" icon={<CloseOutlined />} onClick={handleCancel} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.5 }} />
      </Modal>

      <br />
      <br />

      <Flex gap={token.sizeLG} wrap='wrap'>
        <div style={{ width: 360 }}>
        <h3>With custom fields</h3>
        <CreateDonationForm
            // allowAllocate
            customFields={[
              // { customFieldType: 'shortText', placeholderTextField: 'Baby\'s Name' },
              { customFieldType: 'date', placeholderDatePicker: 'Birth date' },
              { customFieldType: 'longText', placeholderTextArea: 'Special Notes', maxChar: 200 },
            ]}
            />
        </div>

        <div style={{ width: 360 }}>
        <h3>Only Once</h3>
        <CreateDonationForm
            allowAllocate
            allowRegular={false}
            />
        </div>

        <div style={{ width: 360 }}>
        <h3>With upsell & gift aid</h3>
        <CreateDonationForm
            allowAllocate
            allowGiftAid
            allowUpsell
            allowRegular={false}
            />
        </div>
      </Flex>

      <div />
    </div>
  );
};

export default DonatonWidgetsDemo;

