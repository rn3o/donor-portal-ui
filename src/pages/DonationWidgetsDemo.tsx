import React, { useState } from 'react';
import { Flex, Typography, Modal, Button, theme, ConfigProvider } from 'antd';
import {
  CloseOutlined,
  HeartFilled,
} from '@ant-design/icons';
import CreateDonationForm from '../ui/CreateDonationForm';
import { Divider } from 'antd/lib';

const { Text, Link } = Typography;

const DonatonWidgetsDemo: React.FC = () => {

  const { token } = theme.useToken();

  const [isGenericDonationModalOpen, setIsGenericDonationModalOpen] = useState(false);
  const [isSpecificAmountDonationModalOpen, setIsSpecificAmountDonationModalOpen] = useState(false);

  const showGenericDonationModal = () => {
    setIsGenericDonationModalOpen(true);
  };
  const showSpecificAmountDonationModal = () => {
    setIsSpecificAmountDonationModalOpen(true);
  };

  const handleOk = () => {
    setIsGenericDonationModalOpen(false);
  };

  const handleCancel = () => {
    setIsGenericDonationModalOpen(false);
    setIsSpecificAmountDonationModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // add some token style to override
        },
      }}
    >
      <div
        style={{
          alignItems: 'center',
          fontFamily: 'inherit',
          background: token.colorBgLayout,
          padding: '40px 200px',
          margin: -8,
        }}
      >
        <br />
        <br />
        <h1>Donation Widgets</h1>
        <br />
        <br />



        <Divider orientation="left" orientationMargin="0" style={{ width: '100%' }}>
          Button Triggers</Divider>

        {/* Button triggers */}
        <Flex gap={token.sizeSM}>
          <Button size='large' icon={<HeartFilled />} type="primary" onClick={showGenericDonationModal}>
            Donate
          </Button>

          <Button size='large' type="primary" onClick={showSpecificAmountDonationModal}>
            Donate £120
          </Button>

          <Button size='large' type="default" onClick={showSpecificAmountDonationModal}>
            £120
          </Button>

          <Button size='large' shape='round' icon={<HeartFilled />} type="primary" onClick={showGenericDonationModal}>
            Donate Now
          </Button>


          <Button icon={<HeartFilled />} type="primary" onClick={showGenericDonationModal}
            size='large'
            style={{
              transform: `rotate(-90deg)`,
              position: 'fixed',
              top: 180,
              left: -38,
            }}
          >
            Donate
          </Button>
        </Flex>

        {/* Generic Modal */}

        <Modal
          destroyOnClose
          closable={false}
          width={400}
          // title="Basic Modal" 
          open={isGenericDonationModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <div style={{ margin: `-${token.sizeXL}px` }}>
            <CreateDonationForm
              allowAllocate
            // customFields={[
            //   { customFieldType: 'longText', placeholderTextField: 'Add some notes' },
            // ]}
            />
          </div>

          <Button shape="circle" icon={<CloseOutlined />} onClick={handleCancel} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.5 }} />
        </Modal>

        {/* specific amount modal, directly to payment options */}
        <Modal
          destroyOnClose
          closable={false}
          width={400}
          // title="Basic Modal" 
          open={isSpecificAmountDonationModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <div style={{ margin: `-${token.sizeXL}px` }}>
            <CreateDonationForm
              defaultDonationAmountValue={120}
              // adminFeeCheckedDefault
              overrideStep={4}
            />
          </div>

          <Button shape="circle" icon={<CloseOutlined />} onClick={handleCancel} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.5 }} />
        </Modal>

        <br />
        <br />


        <Divider orientation="left" orientationMargin="0" style={{ width: '100%' }}>
          Donation Widget On Page</Divider>

        <Flex gap={token.sizeLG} wrap='wrap' vertical>

          <div style={{ width: 380 }}>
            <h3>Custom fields</h3>
            <CreateDonationForm
              defaultDonationAmountValue={100}
              // defaultFrequency='regular'
              // allowAllocate
              customFields={[
                { customFieldType: 'shortText', placeholderTextField: 'Baby\'s Name' },
                { customFieldType: 'date', placeholderDatePicker: 'Birth date' },
                { customFieldType: 'longText', placeholderTextArea: 'Special Notes', maxChar: 200 },
              ]}
            />
          </div>



          <div style={{ width: 380 }}>
            <h3>Skip form (i.e. when already signed in)</h3>
            <CreateDonationForm
              allowAllocate
              allowRegular={false}
              isLoggedIn
            />
          </div>

          <div style={{ width: 380 }}>
            <h3>Only Once</h3>
            <CreateDonationForm
              allowAllocate
              allowRegular={false}
            />
          </div>

          <div style={{ width: 380 }}>
            <h3>With upsell & gift aid</h3>
            <CreateDonationForm
              allowAllocate
              allowGiftAid
              allowUpsell
              allowRegular
              height={600}
              adminFeeCheckedDefault
              overrideStep={4}
            />
          </div>

          <div style={{ width: 380 }}>
            <h3>Changeable upsell item</h3>
            <CreateDonationForm

              allowAllocate
              allowGiftAid={false}
              allowUpsell
              allowRegular={false}

              upsellItemTitle='Turkey Earthquake Relief'
              upsellItemDescription='Help people rebuild their homes'
              upsellItemImgUrl='https://images.pexels.com/photos/15558948/pexels-photo-15558948/free-photo-of-people-in-a-destroyed-city.jpeg?auto=compress&cs=tinysrgb&w=200'
              upsellItemValue={15}
            />
          </div>
        </Flex>

        <div />
      </div>
    </ConfigProvider>
  );
};

export default DonatonWidgetsDemo;

