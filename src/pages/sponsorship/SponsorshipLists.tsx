import React from 'react';
import { Flex, Button, Result } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';

const SponsorshipLists: React.FC = () => {
  const navigate = useNavigate();

  const createSponsorship = () => {
    navigate('/sponsorship/create');
  };

  return (
    <PageContainer
      header={{
        title: 'Sponsorships',
      }}
      extra={[
        <Button key="1" onClick={createSponsorship} icon={<PlusOutlined />}>
          Create a Sponsorship
        </Button>,
      ]}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      <ProCard
        style={
          {
            // height: '80vh',
            // minHeight: 600,
            // paddingBottom: 40,
          }
        }
      >
        <Flex align="center" vertical>
          <Result
            // status="404"
            // icon={
            //   <img src="https://res.cloudinary.com/rn3o/image/upload/v1714641887/empty-no-fundraising-page_uv6kkn.svg" />
            // }
            icon={<>[ no graphic yet, this is WIP ]</>}
            title="Still Empty"
            subTitle={<>You don’t have any sponsorships yet.</>}
            extra={
              <Button
                key="1"
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={createSponsorship}
              >
                Create a Sponsorship
              </Button>
            }
          />
        </Flex>
      </ProCard>
    </PageContainer>
  );
};

export default SponsorshipLists;
