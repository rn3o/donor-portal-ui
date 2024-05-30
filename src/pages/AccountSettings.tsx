import React from 'react';
import { Flex, Button, Result, Tabs } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

const AccountSettings: React.FC = () => {
  const { TabPane } = Tabs;

  const isMobile = window.innerWidth < 768;

  return (
    <PageContainer
      header={{
        title: 'My Account Settings',
      }}
      // extra={[
      //   <Button key="2">Secondary</Button>,
      //   <Button key="1" type="primary">
      //     Primary
      //   </Button>,
      // ]}
      style={{ width: '100%', margin: 'auto', maxWidth: '980px' }}
    >
      <ProCard
        style={{
          // height: '80vh',
          minHeight: 600,
        }}
      >
        <Tabs
          tabPosition={isMobile ? 'top' : 'left'}
          style={{ marginLeft: isMobile ? '' : '-24px' }}
        >
          <TabPane tab="Profile" key="1">
            <SettingsProfile />
          </TabPane>
          <TabPane tab="Payment Methods" key="2">
            <PaymentMethods />
          </TabPane>
          <TabPane tab="Contact Preferences" key="3">
            <ContactPrefs />
          </TabPane>
          {/* Move these */}
          {/* <TabPane tab="Invoices" key="4">
            <Invoices />
          </TabPane>
          <TabPane tab="Tax Statements" key="5">
            <TaxStatements />
          </TabPane> */}
          <TabPane tab="GDPR" key="6">
            <GDPR />
          </TabPane>
          {/* <TabPane tab="Close Account" key="7">
            <CloseAccount />
          </TabPane> */}
        </Tabs>
      </ProCard>
    </PageContainer>
  );
};

const SettingsProfile: React.FC = () => {
  return <>TODO for Profile</>;
};

const PaymentMethods: React.FC = () => {
  return <>TODO for Saved Payment Methods</>;
};

const ContactPrefs: React.FC = () => {
  return <>TODO for Contact Prefs.</>;
};

const Invoices: React.FC = () => {
  return <>TODO for Invoices</>;
};

const TaxStatements: React.FC = () => {
  return <>TODO for Tax Statements</>;
};

const GDPR: React.FC = () => {
  return <>TODO for GDPR</>;
};

const CloseAccount: React.FC = () => {
  return <>TODO for Close Account</>;
};

export default AccountSettings;
