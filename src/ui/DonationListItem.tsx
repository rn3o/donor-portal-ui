import React from 'react';
import { Card, Flex, theme, Button } from 'antd';

import { CalendarOutlined } from '@ant-design/icons';
import PaymentIcon from './icons/PaymentIcon';

import { css } from '@emotion/css';

interface DonationListItemProps {
  allocationName: string;
  allocationLocation: string;
  donationDate: string;
  donationValue: string;
  paymentMethod:
    | 'visa'
    | 'mastercard'
    | 'amex'
    | 'discover'
    | 'applepay'
    | 'googlepay'
    | 'klarna';
  paymentMethodDetail: string;
  showPaymentDetail: boolean;
}

const DonationListItem: React.FC<DonationListItemProps> = ({
  allocationName,
  allocationLocation,
  donationDate,
  donationValue,
  paymentMethod,
  paymentMethodDetail,
  showPaymentDetail,
}) => {
  const { token } = theme.useToken();

  return (
    <Card
      hoverable
      bordered={false}
      style={{ margin: `0 -${token.sizeLG}px` }}
      className={css`&{
                      border-right: 0px solid ${token.colorPrimary};
                      transition: all 0.25s ease-out;
                    }
                    &:hover {
                      background-color: ${token.colorPrimaryBgHover}15;
                      border-right: 2px solid ${token.colorPrimary};
                    }
                  `}
    >
      <Flex
        gap={token.sizeSM}
        wrap="wrap"
        justify="space-between"
        align="center"
        style={{ flex: 1 }}
      >
        <Flex vertical style={{ flex: 2, minWidth: 140 }}>
          <div style={{ fontSize: token.fontSizeLG }}>
            {allocationName}
            {allocationLocation && `, ${allocationLocation}`}
          </div>
          <div style={{ fontSize: token.fontSizeSM, opacity: 0.6 }}>
            <CalendarOutlined />
            &nbsp;{donationDate}
          </div>
        </Flex>

        <Flex
          align="center"
          justify="space-between"
          gap={token.sizeMD}
          style={{ flex: 1 }}
        >
          {/* Conditionally render this part based on the showPaymentDetail prop */}
          {showPaymentDetail ? (
            <Flex
              align="center"
              justify="start"
              style={{ fontSize: 'smaller', minWidth: 90 }}
              gap={token.sizeXS}
            >
              <PaymentIcon type={paymentMethod} width={50} height={30} />
              {paymentMethodDetail}
            </Flex>
          ) : (
            <>&nbsp;</>
          )}
          {/* End of the conditional rendering */}

          <div
            style={{
              fontSize: token.fontSizeLG,
              fontWeight: 600,
              minWidth: 70,
              textAlign: 'right',
            }}
          >
            {donationValue}
          </div>
        </Flex>
      </Flex>
    </Card>
  );
};

export default DonationListItem;
