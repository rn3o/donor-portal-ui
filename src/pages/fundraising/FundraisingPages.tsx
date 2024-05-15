import { useGlobalState } from './../../GlobalProvider';

import React from 'react';
import { Flex, Button, Result, theme } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { FundraisingListItem } from '../../ui/FundraisingListItem';

const FundraisingPages: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const { showMany } = useGlobalState();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const createPage = () => {
    navigate('/fundraising/pages/create');
  };

  return (
    <PageContainer
      header={{
        title: 'My Fundraising Pages',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Pages',
            },
          ],
        },
      }}
      extra={[
        <Button key="1" onClick={createPage} icon={<PlusOutlined />}>
          Create a Page
        </Button>,
      ]}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      {/* <ProCard
        style={{
          padding: `${token.sizeSM}px 0`,
        }}
      > */}
      {isEmpty ? (
        <ProCard
          style={{
            padding: `${token.sizeSM}px 0`,
          }}
        >
          <Flex align="center" vertical>
            <Result
              // status="404"
              icon={
                <img src="https://res.cloudinary.com/rn3o/image/upload/v1714641887/empty-no-fundraising-page_uv6kkn.svg" />
              }
              title="Still Empty"
              subTitle={
                <>
                  You don’t have any Fundraising Page yet.
                  <br />
                  Let’s start one whenever you are ready.
                </>
              }
              extra={
                <Button
                  key="1"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={createPage}
                >
                  Create a Fundraising Page
                </Button>
              }
            />
          </Flex>
        </ProCard>
      ) : (
        <Flex
          gap={token.sizeMD}
          wrap="wrap"
          vertical
        // style={{ margin: `-${token.sizeLG}px 0` }}
        >
          {showMany ? (
            mockData.map((data, index) => (
              <FundraisingListItem
                key={index}
                imgUrl={data.imgUrl}
                name={data.title}
                supporterCount={data.supporters}
                completionPercent={data.progress}
                amountRaised={data.fundraised}
                target={data.target}
                dayLeft={data.dayLeft}
                team={data.team}
              />
            ))
          ) : (
            mockData.slice(0, 1).map((data, index) => (
              <FundraisingListItem
                key={index}
                imgUrl={data.imgUrl}
                name={data.title}
                supporterCount={data.supporters}
                completionPercent={data.progress}
                amountRaised={data.fundraised}
                target={data.target}
                dayLeft={data.dayLeft}
                team={data.team}
              />
            ))
          )}

        </Flex>
      )}
      {/* </ProCard> */}
    </PageContainer>
  );
};

export default FundraisingPages;


// Mockup data
const mockData = [
  {
    title: 'Food Bank Initiatives',
    imgUrl:
      'https://placehold.co/300x300?text=No Image',
    supporters: 0,
    progress: 0,
    fundraised:0,
    target: 3000,
    dayLeft: 60,
    team: undefined,
  },
  {
    title: 'Running for Kids',
    imgUrl:
      'https://images.pexels.com/photos/11128819/pexels-photo-11128819.jpeg?auto=compress&cs=tinysrgb&w=600',
    supporters: 112,
    progress: 65,
    fundraised: 1950,
    target: 3000,
    dayLeft: 45,
    team: 'Firdaus Field School',
  },
  {
    title: 'Water Well Project in Sudan',
    imgUrl:
      'https://images.pexels.com/photos/5742575/pexels-photo-5742575.jpeg?auto=compress&cs=tinysrgb&w=600',
    supporters: 128,
    progress: 58,
    fundraised: 1740,
    target: 3000,
    dayLeft: 48,
    team: undefined,
  },
  {
    title: 'Gaza Emergency',
    // imgUrl: 'https://placehold.co/300x200',
    imgUrl:
      'https://images.pexels.com/photos/6929741/pexels-photo-6929741.jpeg?auto=compress&cs=tinysrgb&w=600',
    supporters: 256,
    progress: 75,
    fundraised: 2250,
    target: 3000,
    dayLeft: 30,
    team: undefined,
  },
];
