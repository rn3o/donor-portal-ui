import React, { useState } from 'react';
import { Flex, Typography, Modal, Button, Popconfirm, theme, ConfigProvider } from 'antd';
import { Space, Card, Form, Input, InputNumber, Checkbox, Select } from 'antd';
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
          // onOk={handleOk}
          // onCancel={handleCancel}
          footer={[]}
        >
          <div style={{ margin: `-${token.sizeXL}px` }}>
            <CreateDonationForm
              allowAllocate
            // customFields={[
            //   { customFieldType: 'longText', placeholder: 'Add some notes' },
            // ]}
            />
          </div>

          <Popconfirm
            title="Are you sure"
            // description="Details you entered wont be saved"
            onConfirm={handleCancel}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <Button shape="circle" icon={<CloseOutlined />} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.5 }} />
          </Popconfirm>
        </Modal>

        {/* specific amount modal, directly to payment options */}
        <Modal
          destroyOnClose
          closable={false}
          width={400}
          // title="Basic Modal" 
          open={isSpecificAmountDonationModalOpen}
          // onOk={handleOk}
          // onCancel={handleCancel}
          footer={[]}
        >
          <div style={{ margin: `-${token.sizeXL}px` }}>
            <CreateDonationForm
              defaultDonationAmountValue={120}
              // adminFeeCheckedDefault
              overrideStep={4}
            />
          </div>

          <Popconfirm
            title="Are you sure"
            // description="Details you entered wont be saved"
            onConfirm={handleCancel}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <Button shape="circle" icon={<CloseOutlined />} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.5 }} />
          </Popconfirm>
        </Modal>

        <br />
        <br />
        <br />
        <br />


        <Divider orientation="left" orientationMargin="0" style={{ width: '100%' }}>
          <h2>Donation Widget On Page</h2></Divider>

        <Flex gap={token.sizeXL} wrap='wrap' vertical>

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
            <h3 style={{ width: '100%' }}>Multi Checkout (add to basket instead of quick checkout flow)</h3>

            <div style={{ width: 380 }}>
              <CreateDonationForm
                allowAllocate
                isMultiCheckout
              />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    autoFocus
                    allowAllocate
                    isMultiCheckout
                  />
                  `}
              </pre>
            </div>
          </Flex>



          <Flex wrap='wrap' style={exampleSection}>
            <h3 style={{ width: '100%' }}>Display Custom Amount</h3>

            <div style={{ width: 380 }}>
              <CreateDonationForm
                defaultDonationAmountValue={3}
                onceAmountsOptions={[4,3,2,1]}
                regularAmountsOptions={[3,2,1]}
              />
            </div>
            <div style={codeWrapper}>
              <pre style={codeStyle}>
                {`
                  <CreateDonationForm
                    defaultDonationAmountValue={3}
                    onceAmountsOptions={[4,3,2,1]}
                    regularAmountsOptions={[3,2,1]}
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

                useDescriptiveAmount

                descriptiveAmountOptions={[
                  { amount: 90, description: 'Aqiqa for a Boy'},
                  { amount: 80, description: 'Aqiqa for a Girl'},
              ]}

                // customAmounts={[90, 80]}
                // customAmountDescriptions={['Aqiqa for a Boy', 'Aqiqa for a Girl']}

                customFields={[
                  { customFieldType: 'shortText', placeholder: 'Child\'s Name' },
                  { customFieldType: 'date', placeholder: 'Date of Birth' },
                  { customFieldType: 'longText', placeholder: 'Special Notes', maxChar: 200 },
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
                      { customFieldType: 'shortText', placeholder: 'Child\'s Name' },
                      { customFieldType: 'date', placeholder: 'Date of Birth' },
                      { customFieldType: 'longText', placeholder: 'Special Notes', maxChar: 200 },
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


                useDescriptiveAmount
                descriptiveAmountOptions={[
                    { amount: 1000, description: 'Large Tube Well'},
                    { amount: 700, description: 'Medium Tube Well'},
                    { amount: 500, description: 'Small Tube Well'},
                ]}
                // customAmounts={[1000, 700, 500]}
                // customAmountDescriptions={['Large Tube Well', 'Medium Tube Well', 'Small Tube Well']}

                customFields={[
                  { customFieldType: 'shortText', placeholder: 'Name on plaque (Optional)', maxChar: 30 },
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
                      { customFieldType: 'shortText', placeholder: 'Name on plaque (Optional)', maxChar: 30 },
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
              adminFeeCheckedDefault

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

        <DonationFormConfigurator />

        <div />
      </div>
    </ConfigProvider>
  );
};

export default DonatonWidgetsDemo;


const { Option } = Select;

const DonationFormConfigurator: React.FC = () => {

  const [defaultCurrency, setDefaultCurrency] = useState('gbp');
  const handleCurrencyChange = (value: string) => {
    setDefaultCurrency(value);
};

  const [form] = Form.useForm();

  const [formProps, setFormProps] = useState({});

  const handleFormChange = (_, allValues) => {
    setFormProps(allValues);
  };

  return (
    <Card title="Donation Form Configurator">
      <Flex>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            defaultCurrency: 'gbp',
            defaultDonationAmountValue: 50,
            defaultFrequency: 'once',
            autoFocus: false,
            allowRegular: true,
            allowAllocate: false,
            allowGiftAid: false,
            allowUpsell: false,
            labelOnce: 'Give Once',
            labelRegular: 'Give Regularly',
            upsellItemTitle: 'Help Gaza Emergency',
            upsellItemDescription: 'Save lives in Gaza',
            upsellItemValue: 20,
            height: 460,
            isLoggedIn: false,
            adminFeeCheckedDefault: false,
            // onceAmountsOptions: [],
            // regularAmountsOptions: [],
            onceAmountsOptions: [700, 500, 285, 100, 50, 25],
            regularAmountsOptions: [250, 100, 50, 30, 25, 10],
          }}
          onValuesChange={handleFormChange}
        >
          <Form.Item name="defaultCurrency" label="Default Currency">
          <Select
                value={defaultCurrency}
                onChange={handleCurrencyChange}
                style={{ width: 100 }}
                options={[
                    { value: 'gbp', label: '🇬🇧 GBP' },
                    { value: 'usd', label: '🇺🇸 USD' },
                    { value: 'eur', label: '🇪🇺 EUR' },
                    { value: 'cad', label: '🇨🇦 CAD' },
                    { value: 'sgd', label: '🇸🇬 SGD' },
                ]}
            />
            {/* <Select>
              <Option value="gbp">GBP</Option>
              <Option value="usd">USD</Option>
              <Option value="eur">EUR</Option>
              <Option value="cad">CAD</Option>
              <Option value="sgd">SGD</Option>
            </Select> */}
          </Form.Item>
          <Form.Item name="defaultDonationAmountValue" label="Default Donation Amount">
            <InputNumber min={1} />
          </Form.Item>
          

          {/* Dynamic Fields for onceAmountsOptions */}
          <Form.List name="onceAmountsOptions">
            {(fields, { add, remove }) => (
              <>
                <Typography.Title level={5}>Once Amounts Options</Typography.Title>
                {fields.map(({ key, name,  ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[{ required: true, message: 'Missing amount' }]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    {fields.length > 2 && (
                      <Button type="link" onClick={() => remove(name)}>
                        Remove
                      </Button>
                    )}
                  </Space>
                ))}
                {fields.length < 6 && (
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Amount
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

          <Form.Item name="allowRegular" valuePropName="checked">
            <Checkbox>Allow Regular Donations</Checkbox>
          </Form.Item>

          <Form.Item name="defaultFrequency" label="Default Frequency">
            <Select>
              <Option value="once">Once</Option>
              <Option value="regular">Regular</Option>
            </Select>
          </Form.Item>

          {/* Dynamic Fields for regularAmountsOptions */}
          <Form.List name="regularAmountsOptions">
            {(fields, { add, remove }) => (
              <>
                <Typography.Title level={5}>Regular Amounts Options</Typography.Title>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      fieldKey={[fieldKey]}
                      rules={[{ required: true, message: 'Missing amount' }]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    {fields.length > 2 && (
                      <Button type="link" onClick={() => remove(name)}>
                        Remove
                      </Button>
                    )}
                  </Space>
                ))}
                {fields.length < 6 && (
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Amount
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

          <Form.Item name="labelOnce" label="Label Once">
            <Input />
          </Form.Item>
          <Form.Item name="labelRegular" label="Label Regular">
            <Input />
          </Form.Item>

          <Form.Item name="autoFocus" valuePropName="checked">
            <Checkbox>Auto Focus</Checkbox>
          </Form.Item>
         
          <Form.Item name="allowAllocate" valuePropName="checked">
            <Checkbox>Allow Allocation</Checkbox>
          </Form.Item>
          <Form.Item name="allowGiftAid" valuePropName="checked">
            <Checkbox>Allow Gift Aid</Checkbox>
          </Form.Item>
          <Form.Item name="allowUpsell" valuePropName="checked">
            <Checkbox>Allow Upsell</Checkbox>
          </Form.Item>
          <Form.Item name="upsellItemTitle" label="Upsell Item Title">
            <Input />
          </Form.Item>
          <Form.Item name="upsellItemDescription" label="Upsell Item Description">
            <Input />
          </Form.Item>
          <Form.Item name="upsellItemValue" label="Upsell Item Value">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="height" label="Height">
            <InputNumber min={100} />
          </Form.Item>
          <Form.Item name="isLoggedIn" valuePropName="checked">
            <Checkbox>Is Logged In</Checkbox>
          </Form.Item>
          <Form.Item name="adminFeeCheckedDefault" valuePropName="checked">
            <Checkbox>Admin Fee Checked by Default</Checkbox>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" onClick={() => form.resetFields()}>Reset to Default</Button>
          </Form.Item>
        </Form>
        <Flex vertical>
          <Typography.Title level={4}>Live Preview</Typography.Title>
          <CreateDonationForm {...formProps} />
        </Flex>
      </Flex>
    </Card>
  );
};