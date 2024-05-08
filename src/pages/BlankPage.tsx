import React from 'react';
import { Flex, Button, Result } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

const Blank: React.FC = () => {
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
          Primary
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
        style={
          {
            // height: '80vh',
            // minHeight: 600,
          }
        }
      >
        <Result
          status="404"
          title="Not Quite There Yet"
          // title="Under Development"
          subTitle="Sorry, the page you visited does not exist yet"
          // extra={<Button type="primary">Back Home</Button>}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Blank;
