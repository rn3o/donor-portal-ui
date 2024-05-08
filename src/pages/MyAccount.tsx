import { useGlobalState } from './../GlobalProvider';

import React, {lazy, Suspense} from 'react';
import {
  Flex,
  Card,
  Badge,
  Typography,
  Divider,
  Space,
} from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

// import CardAccountSummary from '../ui/CardAccountSummary';
import CardZakatCalculator from '../ui/CardZakatCalculator';
import CardFundraisingSummary from '../ui/CardFundraisingSummary';

const CardAccountSummary = lazy(() => import('../ui/CardAccountSummary'));

import CardDonationsSummary from '../ui/CardDonationsSummary';

const { Title, Text } = Typography;

const MyAccount: React.FC = () => {
  const { showMany } = useGlobalState();

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <PageContainer
      header={{
        title: '',
      }}
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      {/* <Flex vertical gap="24px" style={{ maxWidth: 800, margin: 'auto' }}> */}
      {showMany ? (
        <Flex vertical gap="24px">
          <Title level={4}>{`${greeting}, Ryan`}</Title>

          <Suspense fallback={<>loading</>}>
            <CardAccountSummary />
          </Suspense>

          <Space size="large"> </Space>

          <Divider><Badge status="processing" text="Your contributions activity" /></Divider>

          <CardDonationsSummary />

          <CardFundraisingSummary />

          <Card hoverable bordered={false}>
            Giving Plan (TODO)
          </Card>

          <Card hoverable bordered={false}>
            Sponsorships (TODO)
          </Card>

          <Divider>You might want to check</Divider>

          <CardZakatCalculator />

          <Card bordered={false} style={{height: 300}}>
            Carousel of featured Appeals/Campaigns from the website
            <br />
            (TODO)
          </Card>
          {/* <Card
          bordered={false}
          style={{
            minHeight: 1200,
          }}
        ></Card> */}
        </Flex>
      ) : (
        <Flex vertical gap="24px">
          <Title level={4}>{`${greeting}, Ryan`}</Title>

          <CardAccountSummary />

          <Space size="large"> </Space>

          <Divider>Your contributions activity</Divider>

          <CardDonationsSummary />

          <Divider>You might want to check</Divider>

          <CardZakatCalculator />

          <Card bordered={false}>
            Carousel of new Campaigns from the website
          </Card>
          {/* <Card
          bordered={false}
          style={{
            minHeight: 1200,
          }}
        ></Card> */}
        </Flex>
      )}

      {/* </Flex> */}
    </PageContainer>
  );
};

export default MyAccount;
