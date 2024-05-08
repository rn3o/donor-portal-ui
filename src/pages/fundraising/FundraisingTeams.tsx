import { useGlobalState } from './../../GlobalProvider';

import React from 'react';
import { Flex, Button, Result } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';

const FundraisingTeams: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const navigate = useNavigate();

  const seeInvitations = () => {
    navigate('/fundraising/teams/invitations');
  };

  const createTeams = () => {
    navigate('/fundraising/teams/create');
  };

  return (
    <PageContainer
      header={{
        title: 'Teams',
      }}
      extra={[
        <Button key="2" onClick={seeInvitations}>
          See Invitations
        </Button>,
        <Button key="1" onClick={createTeams} icon={<PlusOutlined />}>
          Create a Team
        </Button>,
      ]}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      {isEmpty ? (
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
              icon={
                <img src="https://res.cloudinary.com/rn3o/image/upload/v1714642400/empty-no-team_gmualx.svg" />
              }
              title="Let's team up!"
              subTitle={
                <>
                  You are not part of any team at the moment.
                  <br />
                  Team up with others or create a team to get started.
                </>
              }
              extra={
                <Button
                  key="1"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={createTeams}
                >
                  Create a Team
                </Button>
              }
            />
          </Flex>
        </ProCard>
      ) : (
        <>
          <ProCard
            style={
              {
                // height: '80vh',
                // minHeight: 600,
                // paddingBottom: 40,
              }
            }
          >
            TODO: List of Teams
          </ProCard>
        </>
      )}
    </PageContainer>
  );
};

export default FundraisingTeams;
