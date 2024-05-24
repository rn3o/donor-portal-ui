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

  const exampleSection = {
    padding: token.sizeXXL,
    border: `solid 1px ${token.colorInfoBorder}`,
    borderRadius: token.sizeLG
  }
  const codeWrapper = {
    // background: 'grey',
    maxWidth: 400,
    display: 'flex',
  }
  const codeStyle = {
    fontFamily: `'Courier New', monospace`,
    fontSize: token.sizeSM,
  }

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
          <h2>Button Triggers</h2></Divider>

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
        <br />
        <br />


        <Divider orientation="left" orientationMargin="0" style={{ width: '100%' }}>
          <h2>Donation Widget On Page</h2></Divider>

        <Flex gap={token.sizeLG} wrap='wrap' vertical>

          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Default with auto focus on amount input</h3>

            <div style={{ width: 380 }}>
              <CreateDonationForm
                autoFocus
                allowAllocate
              />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    autoFocus
                    allowAllocate
                  />
                  `}
              </pre>
            </div>
          </Flex>

          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Default to Regular option + Custom label</h3>

            <div style={{ width: 380 }}>
                  <CreateDonationForm
                    defaultFrequency='regular'
                    labelRegular='Monthly'
                    labelOnce='One-off'
                    defaultDonationAmountValue={10}
                  />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    defaultFrequency='regular'
                    labelRegular='Monthly'
                    labelOnce='One-off'
                    defaultDonationAmountValue={10}
                  />
                  `}
              </pre>
            </div>
          </Flex>

          
          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Custom Options & Fields (Example 1)</h3>

            <div style={{ width: 380 }}>
              <CreateDonationForm
                // defaultDonationAmountValue={null}
                defaultDonationAmountValue={90} // default to option 1
                allowRegular={false}
                customAmounts={[90, 80]}
                customAmountDescriptions={['Aqiqa for a Boy', 'Aqiqa for a Girl']}

                customFields={[
                  { customFieldType: 'shortText', placeholderTextField: 'Child\'s Name' },
                  { customFieldType: 'date', placeholderDatePicker: 'Date of Birth' },
                  { customFieldType: 'longText', placeholderTextArea: 'Special Notes', maxChar: 200 },
                ]}
              />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    // defaultDonationAmountValue={null}
                    defaultDonationAmountValue={90} // default to option 1
                    allowRegular={false}
                    customAmounts={[90, 80]}
                    customAmountDescriptions={['Aqiqa for a Boy', 'Aqiqa for a Girl']}
    
                    customFields={[
                      { customFieldType: 'shortText', placeholderTextField: 'Child\'s Name' },
                      { customFieldType: 'date', placeholderDatePicker: 'Date of Birth' },
                      { customFieldType: 'longText', placeholderTextArea: 'Special Notes', maxChar: 200 },
                    ]}
                  />
                  `}
              </pre>
            </div>
          </Flex>


          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Custom Options & Fields (Example 2)</h3>

            <div style={{ width: 380 }}>
              <CreateDonationForm
                defaultDonationAmountValue={700} 
                allowRegular={false}
                customAmounts={[1000, 700, 500]}
                customAmountDescriptions={['Large Tube Well', 'Medium Tube Well', 'Small Tube Well']}

                customFields={[
                  { customFieldType: 'shortText', placeholderTextField: 'Name on plaque (Optional)', maxChar: 30 },
                ]}
              />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    defaultDonationAmountValue={700} 
                    allowRegular={false}
                    customAmounts={[1000, 700, 500]}
                    customAmountDescriptions={['Large Tube Well', 'Medium Tube Well', 'Small Tube Well']}
    
                    customFields={[
                      { customFieldType: 'shortText', placeholderTextField: 'Name on plaque (Optional)', maxChar: 30 },
                    ]}
                  />
                  `}
              </pre>
            </div>
          </Flex>




          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Skip form (i.e. when user already signed in)</h3>

            <div style={{ width: 380 }}>
                <CreateDonationForm
                  defaultFrequency='regular'
                  allowAllocate
                  isLoggedIn
                />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    defaultFrequency='regular'
                    allowAllocate
                    isLoggedIn
                  />
                  `}
              </pre>
            </div>
          </Flex>



          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Frequency 'Once' only</h3>

            <div style={{ width: 380 }}>
              <CreateDonationForm
                allowAllocate
                allowRegular={false}
              />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    allowAllocate
                    allowRegular={false}
                  />
                  `}
              </pre>
            </div>
          </Flex>



          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Upsell & gift aid</h3>

            <div style={{ width: 380 }}>
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
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    allowAllocate
                    allowGiftAid
                    allowUpsell
                    allowRegular
                    height={600}
                    adminFeeCheckedDefault
                    overrideStep={4}
                  />
                  `}
              </pre>
            </div>
          </Flex>


          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Changeable upsell item</h3>

            <div style={{ width: 380 }}>
            <CreateDonationForm
              allowAllocate
              allowGiftAid={false}
              allowUpsell
              allowRegular={false}
              overrideStep={4}

              upsellItemTitle='Turkey Earthquake Relief'
              upsellItemDescription='Help people rebuild their homes'
              upsellItemImgUrl='https://images.pexels.com/photos/15558948/pexels-photo-15558948/free-photo-of-people-in-a-destroyed-city.jpeg?auto=compress&cs=tinysrgb&w=200'
              upsellItemValue={15}
            />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    allowAllocate
                    allowGiftAid={false}
                    allowUpsell
                    allowRegular={false}
                    overrideStep={4}
      
                    upsellItemTitle='Turkey Earthquake Relief'
                    upsellItemDescription='Help people rebuild their homes'
                    upsellItemImgUrl='https://images.pexels.com/photos/15558948/pexels-photo-15558948/free-photo-of-people-in-a-destroyed-city.jpeg?auto=compress&cs=tinysrgb&w=200'
                    upsellItemValue={15}
                  />
                  `}
              </pre>
            </div>
          </Flex>
          
        </Flex>

        <div />
      </div>
    </ConfigProvider>
  );
};

export default DonatonWidgetsDemo;

