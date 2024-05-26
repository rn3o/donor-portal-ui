import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Popconfirm } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import {
  PlusOutlined,
  LeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import CreateDonationForm from '../../ui/CreateDonationForm';

const DonationCreate: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/donation');
  };

  return (
    <PageContainer
      extra={
        <Popconfirm
            title="Are you sure"
            // description="Details you entered wont be saved"
            onConfirm={goBack}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <Button key="2" type="text">
            Maybe Later
          </Button>
        </Popconfirm>
        // <Button key="2" type="text" onClick={goBack}>
        //   Maybe Later
        // </Button>
      }
      header={{
        title: 'Make a donation',
        breadcrumb: {
          items: [
            {
              title: 'Donations',
            },
            {
              title: 'Create',
            },
          ],
        },
      }}
      // subTitle="Make a difference!"
      style={{ width: '100%', margin: 'auto', maxWidth: '480px' }}
    >

      <Flex align="center" vertical>
          <CreateDonationForm isLoggedIn />
        </Flex>
    </PageContainer>
  );
};

export default DonationCreate;
