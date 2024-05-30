import React from 'react';
import { Flex, Button, Result, Tabs, theme } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';
import DonationFormBuilder from './DonationFormBuilder';

const FormBuilderPageTemp: React.FC = () => {
  const { TabPane } = Tabs;
  const { token } = theme.useToken();

  const isMobile = window.innerWidth < 768;

  return (
    <PageContainer
      header={{
        title: 'Form Builder',
        subTitle:'this page is just temporary, this should be in the n3o FORM app'
      }}
      extra={[
        <Button key="3">Secondary</Button>,
        <Button key="2"> {'< >'} Embed</Button>,
        <Button key="1" type="primary">
          Share
        </Button>,
      ]}
      footer={[
        <Button key="3">Open Form Page</Button>,
        <Button key="2"> {'< >'} Embed</Button>,
        <Button key="1" type="primary">
          Share
        </Button>,
      ]}
      style={{ width: '100%', margin: 'auto', maxWidth: '1200px' }}
    >
      <ProCard
        style={{
          // minHeight: '80vh',
          // minHeight: 600,
        }}
      >
        <DonationFormBuilder />
      </ProCard>
    </PageContainer>
  );
};


export default FormBuilderPageTemp;
