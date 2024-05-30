import React, { useState } from 'react';
import { Flex, message, Modal, Tabs, Typography, Button, ConfigProvider, theme, Affix, Space, Card, Form, Input, InputNumber, Checkbox, Select, Segmented, ColorPicker, Slider, Radio, Divider } from 'antd';
import CreateDonationForm from '../ui/CreateDonationForm';
import { CloseCircleOutlined, CodepenCircleOutlined, ColumnWidthOutlined, CopyOutlined, FontColorsOutlined, FontSizeOutlined, FormatPainterOutlined, MailOutlined, QuestionCircleOutlined, RadiusUprightOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ProConfigProvider } from '@ant-design/pro-components';
import { CheckCard } from '@ant-design/pro-components';

const { Text, Link } = Typography;
const { Option } = Select;

const DonationFormBuilder: React.FC = () => {
  const { token } = theme.useToken();
  const { TabPane } = Tabs;
  const isMobile = window.innerWidth < 768;

  const [defaultCurrency, setDefaultCurrency] = useState('gbp');
  const handleCurrencyChange = (value: string) => {
    setDefaultCurrency(value);
  };

  const [form] = Form.useForm();
  const [formProps, setFormProps] = useState({});
  const [allowRegular, setAllowRegular] = useState(true);
  const [allowAmountInput, setAllowAmountInput] = useState(true);
  const [defaultFrequency, setDefaultFrequency] = useState('once' || 'regular');
  const [useDescriptiveAmount, setUseDescriptiveAmount] = useState(true);

  const [overrideFormStep, setOverrideFormStep] = useState<number>(1);

  const onTabChange = (key: string) => {
    console.log(key);
    if (key === 'paymentTab') {
      setOverrideFormStep(4)
    }
    if (key === 'donationOptionsTab') {
      setOverrideFormStep(1)
    }
    if (key === 'donorFormTab') {
      setOverrideFormStep(3)
    }
  };


  const handleFormChange = (_, allValues) => {
    setFormProps(allValues);
  };

  const handleAllowRegularChange = (e) => {
    setAllowRegular(e.target.checked);
    form.setFieldsValue({ allowRegular: e.target.checked });
    if (!setAllowRegular) {
      setDefaultFrequency('once');
    }
  };

  const handleAllowAmountInputChange = (e) => {
    setAllowAmountInput(e.target.checked);
    form.setFieldsValue({ allowAmountInput: e.target.checked });
  };

  const handleUseDescriptiveAmountChange = (e) => {
    setUseDescriptiveAmount(e.target.checked);
    form.setFieldsValue({ useDescriptiveAmount: e.target.checked });
    if (!useDescriptiveAmount) {
      setUseDescriptiveAmount(true);
    }
  };


  const DuplicateValidator = (getFieldValue) => ({
    validator(_, value) {
      const values = getFieldValue('onceAmountsOptions');
      const duplicateCount = values.filter(v => v === value).length;
      if (duplicateCount > 1) {
        return Promise.reject(new Error('duplicated'));
      }
      return Promise.resolve();
    },
  });


  const [selectedSegment, setSelectedSegment] = useState<string>('amountOnly');
  const handleSegmentChange = (value: string) => {
    setSelectedSegment(value);
  };
  

  // Form Themer
  const [primaryColorTheme, setPrimaryColorTheme] = React.useState(token.colorPrimary);

  const [themeRadius, setThemeRadius] = React.useState(6);

  const [themeFontSize, setThemeFontSize] = React.useState(13);

  const [themeSpacingSize, setThemeSpacingSize] = React.useState(4);

  const fontFamilies = [
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Signika', label: 'Signika' },
    { value: 'Epilogue', label: 'Epilogue' },
    { value: 'Switzer', label: 'Switzer' },
    // { value: 'Satoshi', label: 'Satoshi' },
    // Add more font families as needed
  ];

  const [selectedFont, setSelectedFont] = useState(fontFamilies[1].value);

  const handleFontChange = (value) => {
    setSelectedFont(value);
    // document.documentElement.style.setProperty('--font-family', value);
  };
  
  // Form Themer End



  return (
    <Flex gap={40}
      justify='space-between'
      style={{
        // maxWidth: 1000,
        // padding: '0 40px', 
        // margin: 'auto' 
      }}
    >
      <Flex style={{
            background: token.colorBgElevated,
            zIndex: 1,
      }}>
        <Form
          form={form}
          layout="vertical"
          style={{
            width: 400,
            maxWidth: 400,
          }}
          initialValues={{
            defaultCurrency: 'gbp',
            defaultDonationAmountValue: 50,
            defaultFrequency: defaultFrequency,
            autoFocus: false,
            allowAmountInput: true,
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
            isMultiCheckout: true,
            onceAmountsOptions: [100, 50, 25],
            regularAmountsOptions: [30, 25, 10],
            // onceAmountsOptions: [700, 500, 285, 100, 50, 25],
            // regularAmountsOptions: [250, 100, 50, 30, 25, 10],
            // useDescriptiveAmount: false,
            // descriptiveAmountOptions: [],
            descriptiveAmountOptions: [
              { amount: 100, description: 'option 1 description' },
              { amount: 200, description: 'option 2 description' },
              { amount: 300, description: 'option 3 description' },
            ],

            customFields: [],
            // customFields: [
            //   { customFieldType: 'shortText', placeholderTextField: "Child's Name" },
            //   { customFieldType: 'date', placeholderDatePicker: 'Date of Birth' },
            //   { customFieldType: 'longText', placeholderTextArea: 'Special Notes', maxChar: 200 },
            // ],
          }}
          onValuesChange={handleFormChange}
        >

          <Tabs
            tabPosition='top'
            onChange={onTabChange}
          >
            <TabPane tab="Donation Options" key="donationOptionsTab">
              <Form.Item name="defaultCurrency" label="Default Currency">
                <Select
                  value={defaultCurrency}
                  onChange={handleCurrencyChange}
                  style={{ width: 96 }}
                  options={[
                    { value: 'gbp', label: '🇬🇧 GBP' },
                    { value: 'usd', label: '🇺🇸 USD' },
                    { value: 'eur', label: '🇪🇺 EUR' },
                    { value: 'cad', label: '🇨🇦 CAD' },
                    { value: 'sgd', label: '🇸🇬 SGD' },
                  ]}
                />
              </Form.Item>

              <Segmented
                style={{ fontWeight: 600 }}
                size='large'
                options={[
                  { label: 'Amount Only', value: 'amountOnly' },
                  { label: 'Amount + Description', value: 'descriptive' },
                ]}
                value={selectedSegment}
                onChange={handleSegmentChange}
              />

              {selectedSegment === 'amountOnly' ? (
                <>
                  {/* <Form.List name="onceAmountsOptions">
                    {(fields, { add, remove }) => (
                      <>
                        <Typography.Title level={5}>Suggested One-off Amount</Typography.Title>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex' }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name]}
                              rules={[{ required: true, message: 'Missing amount' }]}
                              style={{ marginBottom: token.sizeXS }}
                            >
                              <InputNumber min={1} style={{ width: 64 }} 
                              />
                            </Form.Item>
                            {fields.length > 0 && (
                              <Button icon={<CloseCircleOutlined style={{color: token.colorTextSecondary}}/>} type="link" onClick={() => remove(name)}>

                              </Button>
                            )}
                          </Space>
                        ))}
                        {fields.length < 6 && (
                          <Form.Item>
                            <Button type="dashed" onClick={() => {

                              add(10)
                            }} block
                              style={{ maxWidth: 240 }}>
                              Add Option
                            </Button>
                          </Form.Item>
                        )}
                      </>
                    )}
                  </Form.List> */}
                  <Form.List name="onceAmountsOptions">
                    {(fields, { add, remove }) => (
                      <>
                        <Typography.Title level={5}>Suggested One-off Amount</Typography.Title>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex' }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name]}
                              rules={[
                                { required: true, message: 'Missing amount' },
                                ({ getFieldValue }) => DuplicateValidator(getFieldValue),
                              ]}
                              style={{ marginBottom: 8 }}
                            >
                              <InputNumber min={1} style={{ maxWidth: 68 }} />
                            </Form.Item>
                            {fields.length > 0 && (
                              <Button icon={<CloseCircleOutlined style={{color: token.colorTextSecondary}}/>} type="link" onClick={() => remove(name)} />
                            )}
                          </Space>
                        ))}
                        {fields.length < 6 && (
                          <Form.Item>
                            <Button type="dashed" onClick={() => add(10)} block style={{ maxWidth: 240 }}>
                              Add Option
                            </Button>
                          </Form.Item>
                        )}
                      </>
                    )}
                  </Form.List>

                  <Form.Item name="allowRegular" valuePropName="checked">
                    <Checkbox onChange={handleAllowRegularChange}>Allow Regular Donations</Checkbox>
                  </Form.Item>

                  {allowRegular && (
                    <>
                      <Form.List name="regularAmountsOptions">
                        {(fields, { add, remove }) => (
                          <>
                            <Typography.Title level={5}>Suggested Regular Amount</Typography.Title>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space key={key} style={{ display: 'flex' }} align="baseline">
                                <Form.Item
                                  {...restField}
                                  name={[name]}
                                  rules={[{ required: true, message: 'Missing amount' }]}
                                  style={{ marginBottom: token.sizeXS }}
                                >
                                  <InputNumber min={1} style={{ width: 64 }} />
                                </Form.Item>
                                {fields.length > 0 && (
                                  <Button icon={<CloseCircleOutlined style={{color: token.colorTextSecondary}}/>} type="link" onClick={() => remove(name)}>

                                  </Button>
                                )}
                              </Space>
                            ))}
                            {fields.length < 6 && (
                              <Form.Item>
                                <Button type="dashed" onClick={() => add(5)} block
                                  style={{ maxWidth: 240 }}>
                                  Add Option
                                </Button>
                              </Form.Item>
                            )}
                          </>
                        )}
                      </Form.List>
                    </>
                  )}

                  {allowRegular &&
                    <>
                      <Form.Item name="defaultFrequency" label="Default Frequency">
                        <Select>
                          <Option value="once">Once</Option>
                          <Option value="regular">Regular</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="labelOnce" label="Label for One-Off Donations">
                        <Input />
                      </Form.Item>
                      <Form.Item name="labelRegular" label="Label for Regular Donations">
                        <Input />
                      </Form.Item>
                    </>
                  }
                </>



              ) : (
                <>
                  <Form.List name="descriptiveAmountOptions">
                    {(fields, { add, remove }) => (
                      <>
                        <Typography.Title level={5}>Custom Amounts</Typography.Title>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex' }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'amount']}
                              rules={[{ required: true, message: 'Missing amount' }]}
                              style={{ marginBottom: token.sizeXS }}
                            >
                              <InputNumber min={1} placeholder="Amount" style={{ width: 64 }} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              rules={[{ required: true, message: 'Missing description' }]}
                              style={{ marginBottom: token.sizeXS, width: 280 }}
                            >
                              <Input placeholder="Description" />
                            </Form.Item>
                            {fields.length > 0 && (
                              <Button icon={<CloseCircleOutlined style={{color: token.colorTextSecondary}}/>} type="link" onClick={() => remove(name)}>

                              </Button>
                            )}
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add({ amount: 100, description: 'Default Description' })} block
                            style={{ maxWidth: 240 }}>
                            Add Option
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Form.Item name="allowRegular" valuePropName="checked">
                    <Checkbox onChange={handleAllowRegularChange}>Allow Regular Donations</Checkbox>
                  </Form.Item>

                  {allowRegular &&
                    <>
                      <Form.Item name="defaultFrequency" label="Default Frequency">
                        <Select>
                          <Option value="once">Once</Option>
                          <Option value="regular">Regular</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="labelOnce" label="Label for One-Off Donations">
                        <Input />
                      </Form.Item>
                      <Form.Item name="labelRegular" label="Label for Regular Donations">
                        <Input />
                      </Form.Item>
                    </>
                  }
                </>

              )}

              <Divider />

              <Form.Item name="allowAmountInput" valuePropName="checked">
                <Checkbox onChange={handleAllowAmountInputChange}>Allow Amount input</Checkbox>
              </Form.Item>

              {allowAmountInput &&
                <>
                  <Form.Item name="defaultDonationAmountValue" label="Default Donation Amount">
                    <InputNumber min={1} style={{ width: 64 }} />
                  </Form.Item>

                  <Flex align='center' gap={token.sizeSM}>
                    <Form.Item name="autoFocus" valuePropName="checked">
                      <Checkbox>Auto Focus on Amount Input <QuestionCircleOutlined /></Checkbox>
                    </Form.Item>
                  </Flex>
                </>
              }

              <Divider />

              <Form.Item name="isMultiCheckout" valuePropName="checked">
                <Checkbox>Allow Basket Checkout</Checkbox>
              </Form.Item>


              <Divider />

              <Form.List name="customFields">
                {(fields, { add, remove }) => (
                  <>
                    <Typography.Title level={5}>Custom Fields</Typography.Title>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex' }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'customFieldType']}
                          rules={[{ required: true, message: 'Missing field type' }]}
                        >
                          <Select placeholder="Field Type">
                            <Option value="shortText">Short Text</Option>
                            <Option value="date">Date</Option>
                            <Option value="longText">Long Text</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'placeholder']}
                          rules={[{ required: true, message: 'Missing placeholder' }]}
                        >
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                        {fields.length > 0 && (
                          <Button icon={<CloseCircleOutlined style={{color: token.colorTextSecondary}}/>} type="link" onClick={() => remove(name)}>

                          </Button>
                        )}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block
                        style={{ maxWidth: 240 }}>
                        Add Custom Field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>



              <Form.Item name="allowAllocate" valuePropName="checked">
                <Checkbox>Allow Allocation</Checkbox>
              </Form.Item>


              {/* <Form.Item name="isLoggedIn" valuePropName="checked">
            <Checkbox>Is Logged In</Checkbox>
          </Form.Item> */}
              {/* <Form.Item name="adminFeeCheckedDefault" valuePropName="checked">
            <Checkbox>Admin Fee Checked by Default</Checkbox>
          </Form.Item> */}

              <Form.Item>
                <Button type="text" onClick={() => {
                  setAllowRegular(true)
                  form.resetFields()
                }}>Reset to Default</Button>
              </Form.Item>

            </TabPane>



            {/* Donor Form Tab */}
            <TabPane tab="Donor Details" key="donorFormTab">
              <Form.List name="customFields">
                {(fields, { add, remove }) => (
                  <>
                    <Typography.Title level={5}>Donor Details Form</Typography.Title>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex' }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'customFieldType']}
                          rules={[{ required: true, message: 'Missing field type' }]}
                        >
                          <Select placeholder="Field Type">
                            <Option value="shortText">Short Text</Option>
                            <Option value="date">Date</Option>
                            <Option value="longText">Long Text</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'placeholder']}
                          rules={[{ required: true, message: 'Missing placeholder' }]}
                        >
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                        {fields.length > 0 && (
                          <Button icon={<CloseCircleOutlined style={{color: token.colorTextSecondary}}/>} type="link" onClick={() => remove(name)}>

                          </Button>
                        )}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block
                        style={{ maxWidth: 240 }}>
                        Add Field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              TODO: contact preference options, etc

            </TabPane>

            {/* Payments Tab */}
            <TabPane tab="Payment" key="paymentTab">
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
              <Form.Item name="upsellItemImageUrl" label="Upsell Item Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="upsellItemValue" label="Upsell Item Value">
                <InputNumber min={1} style={{ width: 64 }} />
              </Form.Item>

              <Divider />

              TODO:<br />
              payment method, etc
            </TabPane>

            {/* Design Tab */}
            <TabPane tab="Design" key="designTab">
              <Flex
                gap={token.sizeMD}
                style={{
                  // scale: '0.8',
                  // background: token.colorBgBase,
                  borderRadius: token.borderRadiusOuter,
                }}
                vertical
              >

                <Flex align='center' gap={token.sizeSM}>
                  <Form.Item name="height" label="Initial Form Height">
                    <InputNumber min={100} />
                  </Form.Item>
                  {/* <QuestionCircleOutlined /> */}
                </Flex>



                <Flex align="center" gap={token.sizeSM}>
                  <FormatPainterOutlined /> Color
                  <ColorPicker
                    showText
                    // value={token.colorPrimary}
                    value={primaryColorTheme}
                    // presets={presets}
                    onChangeComplete={(color) =>
                      setPrimaryColorTheme(color.toHexString())
                    }
                    style={{
                      marginLeft: 'auto',
                      display: 'flex',
                      justifyContent: "start",
                      width: 112
                    }}
                  />
                </Flex>

                <Flex align="center" gap={token.sizeSM}>
                  <FontColorsOutlined /> Font
                  <Select
                    // value={"Helvetica"}
                    options={fontFamilies}
                    value={selectedFont}
                    onChange={handleFontChange}
                    style={{
                      width: 200, marginLeft: 'auto'
                    }}
                  />
                </Flex>

                <Flex align="center" gap={token.sizeSM}>
                  <FontSizeOutlined />
                  Font Size
                  <InputNumber
                    min={11}
                    max={16}
                    defaultValue={themeFontSize}
                    // @ts-ignore
                    onChange={setThemeFontSize}
                    changeOnWheel
                    style={{ width: 60, marginLeft: 'auto' }}
                  />
                </Flex>

                <Flex align="center" gap={token.sizeSM}>
                  <RadiusUprightOutlined /> Corners
                  <Slider
                    defaultValue={themeRadius}
                    onChangeComplete={setThemeRadius}
                    min={0}
                    max={24}
                    style={{ width: 192, marginLeft: 'auto' }}
                  />
                </Flex>

                <Flex align="center" gap={token.sizeSM}>
                  <ColumnWidthOutlined /> Spacing
                  <Slider
                    defaultValue={themeSpacingSize}
                    onChangeComplete={setThemeSpacingSize}
                    min={1}
                    max={5}
                    style={{ width: 192, marginLeft: 'auto' }}
                  />
                </Flex>

                <Flex gap={token.sizeSM} vertical>
                  <Flex gap={token.sizeSM}>
                    <CodepenCircleOutlined /> Custom CSS <QuestionCircleOutlined />
                  </Flex>

                  <TextArea
                    autoSize={{ minRows: 5 }}
                    size='large'></TextArea>
                </Flex>

              </Flex>
            </TabPane>

          </Tabs>
        </Form>
      </Flex>

      {/* Live Preview Area */}

      <Flex
        align='center'
        style={{
          // flex: '1',
          // height: '100vh',
          minHeight: '70vh',
          width: '100%',
          background: token.colorBgLayout,
          gap: token.sizeXL,
          paddingTop: token.sizeXS,
          padding: token.sizeXXL,
          borderRadius: token.sizeSM
        }}
        vertical>
        <ConfigProvider
          theme={{
            // components: {
            //   Divider: {
            //     colorSplit: 'rgba(5, 5, 5, 0.12)',
            //   },
            //   Button: {
            //     algorithm: true,
            //   },
            //   Menu: {
            //     algorithm: true,
            //   },
            // },
            token: {
              colorPrimary: primaryColorTheme,
              fontSize: themeFontSize,
              // sizeStep: themeSpacingSize,
              sizeUnit: themeSpacingSize,
              borderRadius: themeRadius,
              colorLink: primaryColorTheme,
              colorInfo: primaryColorTheme,
            },
          }}
        >
          <Typography.Text type='secondary'>Live Preview</Typography.Text>
          <Affix offsetTop={120} >
            <Flex style={{ minWidth: 380, maxWidth: 380 }} vertical align='center'>
              {selectedSegment === 'amountOnly' ? (
                <CreateDonationForm {...formProps} useDescriptiveAmount={false} overrideStep={overrideFormStep} />
              ) : (
                <CreateDonationForm {...formProps} useDescriptiveAmount overrideStep={overrideFormStep} />
              )}
            </Flex>
            {/* <CheckCard.Group
              >
              <Flex vertical>
                      <CheckCard
                          title='test'
                          value={10}
                          style={{background: token.colorPrimary}}
                      />
                      <CheckCard
                        title='test'
                        value={10}
                        style={{ backgroundColor: primaryColorTheme, borderColor: primaryColorTheme }}
                      />
              </Flex>
            </CheckCard.Group> */}

          </Affix>

          {/* if useDescriptiveAmount than use this on preview */}
          {/* <CreateDonationForm {...formProps} useDescriptiveAmount/> */}

        </ConfigProvider>
      </Flex>
    </Flex>
  );
};

export default DonationFormBuilder;


