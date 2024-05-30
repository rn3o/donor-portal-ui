import React, {useState} from 'react';
import { Flex, Button, message, Modal, Tabs, theme, Divider, Typography, Select, Input } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import {  CopyOutlined, MailOutlined,  } from '@ant-design/icons';
import DonationFormBuilder from './DonationFormBuilder';

const FormBuilderPageTemp: React.FC = () => {
  const { TabPane } = Tabs;
  const { token } = theme.useToken();

  const isMobile = window.innerWidth < 768;

  return (
    <PageContainer
      header={{
        title: 'Form Builder',
        subTitle:'this page is just temporary, this should be in the FORM app'
      }}
      extra={[
        <Button key="3">Secondary</Button>,
        <EmbedModal />,
        <Button key="1" type="primary">
          Share
        </Button>,
      ]}
      footer={[
        <Button key="3">Open Form Page</Button>,
        <EmbedModal />,
        <Button key="1" type="primary">
          Share
        </Button>,
      ]}
      style={{ width: '100%', margin: 'auto', maxWidth: '1280px' }}
    >
      <ProCard
        style={{
          // minHeight: '80vh',
          // minHeight: 600,
        }}
      >
        <div
          style={{marginLeft: `-${token.sizeXL}px`}}>
          <DonationFormBuilder />
        </div>
      </ProCard>
    </PageContainer>
  );
};


export default FormBuilderPageTemp;



const EmbedModal: React.FC = () => {
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

  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
      setInputValue(value);
  };

  const handleSelect = (value) => {
      setEmails(value);
  };

  const handleEmbed = () => {
      // Here you can implement the logic for inviting emails
      console.log('Inviting emails:', emails);
      // Reset the input value and selected emails after inviting
      setInputValue('');
      setEmails([]);
      setIsModalOpen(false);
      message.success('Invitation Sent');
  };


  return (
      <>
          <Button key="1" onClick={showModal}>
              {'< > '}Embed
          </Button>
          <Modal title="Embed Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[]}
          >

              <Typography.Title level={5}>JS Code</Typography.Title>

              <CopyInput />

          </Modal>
      </>
  );
};

const CopyInput: React.FC = () => {
  const inputValue = 'some-generated-code-to-copy'; // Default value

  const handleCopy = () => {
      const inputElement = document.getElementById('copy-input') as HTMLInputElement;
      inputElement.select();
      document.execCommand('copy');
      message.success('Copied to clipboard');
  };

  return (
      <Input
          id="copy-input"
          defaultValue={inputValue}
          suffix={
              <Button
                  // type="text"
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
              >Copy</Button>
          }
          readOnly
      />
  );
};