import React from 'react';
import { Flex, Button, Result } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

const NoDonation: React.FC = () => {
  return (
    <PageContainer
      // header={{
      //   title: '',
      // }}
      // token={{
      //   paddingInlinePageContainerContent: num,
      // }}
      extra={[
        <Button key="2">Secondary</Button>,
        <Button key="2" type="primary">
          Donate
        </Button>,
      ]}
      // subTitle="Simple Description"
      // footer={[
      //   <Button>Secondary</Button>,
      //   <Button type="primary">
      //     Primary
      //   </Button>,
      // ]}
      style={{width: '100%', margin:'auto', maxWidth: '800px'}}
    >
      <ProCard
        style={{
          // height: '80vh',
          // minHeight: 600,
          paddingBottom: 60,
        }}
      >
        <Flex align="center" vertical>
          <Result
            status="404"
            title="It's empty"
            // title="Under Development"
            subTitle="You haven't made a {donation type} yet"
            // extra={<Button type="primary">Back Home</Button>}
          />
          <Button key="2" size="large" type="primary">
            Make a [Donation Type]
          </Button>
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default NoDonation;
