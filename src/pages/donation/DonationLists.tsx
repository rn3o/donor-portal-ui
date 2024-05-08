import { useGlobalState } from './../../GlobalProvider';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import { Flex, Button, Result, theme, Divider } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import PaymentIconProps from '../../ui/icons/PaymentIcon';

import { PlusOutlined } from '@ant-design/icons';
import DonationListItem from '../../ui/DonationListItem';

const DonationLists: React.FC = () => {
  const { isEmpty } = useGlobalState();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const createDonation = () => {
    navigate('/donation/create');
  };

  return (
    <PageContainer
      header={{
        title: 'Donations',
      }}
      extra={[
        <Button key="1" onClick={createDonation} icon={<PlusOutlined />}>
          Make Donation
        </Button>,
      ]}
      // subTitle="Simple Description"
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
    >
      {isEmpty ? (
        <ProCard>
          <Flex align="center" vertical>
            <Result
              // status="404"
              // icon={
              //   <img src="https://res.cloudinary.com/rn3o/image/upload/v1714641887/empty-no-fundraising-page_uv6kkn.svg" />
              // }
              icon={<>[ no graphic yet, this is WIP ]</>}
              title="Still Empty"
              subTitle={
                <>
                  You don’t have any donations yet.
                  <br />
                  Don't you want to contribute?
                </>
              }
              extra={
                <Button
                  key="1"
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={createDonation}
                >
                  Create a Donation
                </Button>
              }
            />
          </Flex>
        </ProCard>
      ) : (
        <ProCard
          style={{
            // height: '80vh',
            // minHeight: 600,
            padding: 0,
          }}
        >
          <Flex
            gap={token.sizeXXS}
            justify="space-between"
            style={{ fontSize: 'smaller', paddingBottom: token.sizeXS }}
            // style={{ margin: `-${token.sizeLG}px 0` }}
          >
            <div>Allocations</div>

            <div>Payment</div>
          </Flex>
          <Divider style={{ margin: 0 }} />

          <Flex
            gap={token.sizeXXS}
            wrap="wrap"
            vertical
            style={{ margin: `0 0 -${token.sizeLG}px 0` }}
            // style={{ margin: `-${token.sizeLG}px 0` }}
          >
            {mockData.map((data, index) => (
              <DonationListItem
                key={index}
                allocationName={data.allocationName}
                allocationLocation={data.allocationLocation}
                donationDate={data.donationDate}
                donationValue={data.donationValue}
                paymentMethod={validatePaymentMethod(data.paymentMethod)}
                paymentMethodDetail={data.paymentMethodDetail}
                showPaymentDetail
              />
            ))}
          </Flex>
        </ProCard>
      )}
    </PageContainer>
  );
};

export default DonationLists;

function validatePaymentMethod(
  paymentMethod: string
): PaymentIconProps['type'] {
  // Map the received payment method to the accepted types or return a default value
  switch (paymentMethod) {
    case 'visa':
    case 'mastercard':
    case 'amex':
    case 'discover':
    case 'applepay':
    case 'googlepay':
    case 'klarna':
      return paymentMethod as PaymentIconProps['type'];
    default:
      return 'visa'; // Default to Visa icon or any other default you prefer
  }
}

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
  {
    allocationName: 'Medical Aid',
    allocationLocation: 'Haiti',
    donationDate: '04/22/2024',
    donationValue: '£200.00',
    paymentMethod: 'mastercard',
    paymentMethodDetail: '3456',
  },
  {
    allocationName: 'General Fund',
    donationDate: '06/15/2024',
    donationValue: '£115.60',
    paymentMethod: 'visa',
    paymentMethodDetail: '7890',
  },
  {
    allocationName: 'Emergency Fund',
    allocationLocation: 'Yemen',
    donationDate: '06/18/2024',
    donationValue: '£95.25',
    paymentMethod: 'applepay',
    paymentMethodDetail: '',
  },
  {
    allocationName: 'Food Parcel',
    allocationLocation: 'Gaza',
    donationDate: '06/20/2024',
    donationValue: '£80.30',
    paymentMethod: 'googlepay',
    paymentMethodDetail: '',
  },
  {
    allocationName: 'Medical Aid',
    allocationLocation: 'Somalia',
    donationDate: '06/22/2024',
    donationValue: '£175.40',
    paymentMethod: 'mastercard',
    paymentMethodDetail: '1234',
  },
  {
    allocationName: 'Education Support',
    allocationLocation: 'Somalia',
    donationDate: '06/25/2024',
    donationValue: '£210.75',
    paymentMethod: 'paypal',
    paymentMethodDetail: '6789',
  },
  {
    allocationName: 'Disaster Relief',
    allocationLocation: 'Turkey',
    donationDate: '06/28/2024',
    donationValue: '£125.25',
    paymentMethod: 'applepay',
    paymentMethodDetail: '',
  },
  // Add more mockup objects as needed...
];
