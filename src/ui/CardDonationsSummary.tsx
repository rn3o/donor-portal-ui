import { useGlobalState } from './../GlobalProvider';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import { Card, Flex, theme, Empty, Divider } from 'antd';

import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import DonationListItem from './DonationListItem';

const CardDonationsSummary: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const goToPage = () => {
    navigate('/donation');
  };

  return (
    <Card bordered={false} title="Your Latest Donations" style={{ padding: 0 }}>
      <Flex vertical>
        {isEmpty ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No gifts yet"
          />
        ) : (
          <Flex
            gap={token.sizeXXS}
            wrap="wrap"
            vertical
            style={{ margin: `-${token.sizeLG}px 0` }}
          >
            {mockData.map((data, index) => (
              <DonationListItem
                key={index}
                allocationName={data.allocationName}
                allocationLocation={data.allocationLocation}
                donationDate={data.donationDate}
                donationValue={data.donationValue}
                paymentMethod={'visa'}
                paymentMethodDetail={''}
                showPaymentDetail={false}
              />
            ))}
          </Flex>
        )}

        <Divider />

        <Card
          bordered={false}
          hoverable
          style={{ margin: `-${token.sizeLG}px`, fontWeight: 600 }}
          onClick={goToPage}
        >
          View All Donations <ArrowRightOutlined />
        </Card>
      </Flex>
    </Card>
  );
};

export default CardDonationsSummary;

// Mockup data
const mockData = [
  {
    allocationName: 'General Fund',
    donationDate: '04/15/2024',
    donationValue: '£75.50',
    paymentMethod: 'visa',
    paymentMethodDetail: '1234',
  },
  {
    allocationName: 'Emergency Fund',
    allocationLocation: 'Syria',
    donationDate: '04/18/2024',
    donationValue: '£100.75',
    paymentMethod: 'applepay',
    paymentMethodDetail: '',
  },
  {
    allocationName: 'Food Parcel',
    allocationLocation: 'Gaza',
    donationDate: '04/20/2024',
    donationValue: '£50.25',
    paymentMethod: 'googlepay',
    paymentMethodDetail: '',
  },
];
