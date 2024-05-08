import React from 'react';
import {
  Flex,
  Button,
  Result,
  Anchor,
  Col,
  Row,
  Space,
  Popconfirm,
} from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';
import CreateAccountForm from '../ui/CreateAccountForm';

const CreateAccount: React.FC = () => {
  return (
    <PageContainer
      // extra={[
      //   <Button key="2">Action</Button>,
      //   <Button key="2" type="primary">
      //     Create
      //   </Button>,
      // ]}
      footer={[
        <Popconfirm
          title="Are you sure"
          description="Details you entered wont be saved"
          // onConfirm={createAccount}
          okText="Yes"
          cancelText="No"
          placement="bottomRight"
        >
          <Button>Cancel</Button>
        </Popconfirm>,
        <Button type="primary" disabled>
          Create
        </Button>,
      ]}
    >
      {/* <ProCard
        style={
          {
            // height: '80vh',
            // minHeight: 600,
          }
        }
      > */}
      <Row>
        <Col span={16}>
          <CreateAccountForm />
        </Col>

        <Col span={8} style={{ paddingLeft: '40px' }}>
          <Anchor
            affix
            offsetTop={80}
            // make this items dynamic based on added forms
            items={[
              {
                key: 'address',
                href: 'accounts/create#address',
                title: 'Address',
              },
              {
                key: 'social',
                href: 'accounts/create#social',
                title: 'Social Presence',
              },
              {
                key: 'giftAid',
                href: 'accounts/create#giftAid',
                title: 'Gift Aid',
              },
            ]}
          />
        </Col>
      </Row>
      {/* </ProCard> */}
    </PageContainer>
  );
};

export default CreateAccount;
