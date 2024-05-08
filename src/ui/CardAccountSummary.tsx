import { useGlobalState } from './../GlobalProvider';

import React from 'react';
import {
  Card,
  Alert,
  Space,
  Button,
  theme,
  Divider,
  Flex,
  Statistic,
} from 'antd';

import {
  CalendarOutlined,
  TeamOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const CardAccountSummary: React.FC = () => {
  const { showAlerts } = useGlobalState();
  const { showMany } = useGlobalState();

  const { token } = theme.useToken();

  return (
    <Card bordered={false} title="Here's your summary">
      {showMany ? (
        <Flex gap={token.sizeXXL} wrap="wrap" justify="space-between">
          <Statistic title="Donated this year" value={'4096'} prefix={'£'} />

          <Statistic
            title="Giving Plan"
            value={'280'}
            prefix={<SyncOutlined />}
            suffix={<div style={{ fontSize: token.sizeSM }}>/month</div>}
          />

          <Statistic
            title="Sponsoring"
            value={'2'}
            prefix={<TeamOutlined />}
            suffix={<div style={{ fontSize: token.sizeSM }}>Beneficiaries</div>}
          />

          <Statistic
            title="Supporter since"
            prefix={<CalendarOutlined />}
            value={'2024 '}
          />
        </Flex>
      ) : (
        <Flex gap={token.sizeXXL} wrap="wrap" justify="space-between">
          <Statistic
            title="Contributions this year"
            value={'25'}
            prefix={'£'}
          />

          <Statistic
            title="Supporter since"
            prefix={<CalendarOutlined />}
            value={'2024 '}
          />
        </Flex>
      )}

      {/* if global const showAlerts is true, show this: */}
      {showAlerts && (
        <Flex vertical gap={token.sizeSM}>
          <Divider style={{ margin: '16px 0 0 0' }} />
          <ErrorExample />
          <WarningExample />
        </Flex>
      )}
    </Card>
  );
};

export default CardAccountSummary;

const WarningExample: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Alert
      message="Sponsorship plan for beneficiary Caleb is expiring soon."
      type="warning"
      // banner
      showIcon
      closable
      style={{
        borderLeft: `5px solid ${token.colorWarning}`,
        borderStyle: '0p 0p 0p 5px',
      }}
      // closable={{
      //   'aria-label': 'close',
      //   closeIcon: (
      //     <Button type="text" size="small" >
      //       Dismiss
      //     </Button>
      //   ),
      // }}
      action={
        <Space>
          <Button type="text" size="small" style={{ fontWeight: 600 }}>
            Extend Now
          </Button>
        </Space>
      }
    />
  );
};

const ErrorExample: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Alert
      message="Payment failed for giving plan REF100123"
      type="error"
      // banner
      showIcon
      // closable
      style={{
        borderLeft: `5px solid ${token.colorError}`,
        borderStyle: '0p 0p 0p 5px',
      }}
      action={
        <Space>
          <Button type="text" size="small" style={{ fontWeight: 600 }}>
            Update Payment
          </Button>
        </Space>
      }
    />
  );
};
