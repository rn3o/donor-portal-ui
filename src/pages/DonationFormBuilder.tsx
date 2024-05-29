import React, { useState } from 'react';
import { Flex, Typography, Button, ConfigProvider, theme } from 'antd';
import { Space, Card, Form, Input, InputNumber, Checkbox, Select } from 'antd';
import CreateDonationForm from '../ui/CreateDonationForm';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;
const { Option } = Select;

const DonationFormBuilder: React.FC = () => {
  const { token } = theme.useToken();
  const [defaultCurrency, setDefaultCurrency] = useState('gbp');
  const handleCurrencyChange = (value: string) => {
    setDefaultCurrency(value);
  };

  const [form] = Form.useForm();
  const [formProps, setFormProps] = useState({});
  const [allowRegular, setAllowRegular] = useState(true);
  const [defaultFrequency, setDefaultFrequency] = useState('once' || 'regular');
  const [restrictOptions, setRestrictOptions] = useState(true);

  const handleFormChange = (_, allValues) => {
    setFormProps(allValues);
  };

  const handleAllowRegularChange = (e) => {
    setAllowRegular(e.target.checked);
    form.setFieldsValue({ allowRegular: e.target.checked });
    if (!setAllowRegular){
      setDefaultFrequency('once');
    }
  };

  const handleRestrictOptionsChange = (e) => {
    setRestrictOptions(e.target.checked);
    form.setFieldsValue({ restrictOptions: e.target.checked });
  };


  return (
    <Flex style={{ maxWidth: 900, margin: 'auto' }}>
      <Flex gap={token.sizeLG}>
        <Form
          form={form}
          layout="vertical"
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
            onceAmountsOptions: [100, 50, 25],
            regularAmountsOptions: [30, 25, 10],
            // onceAmountsOptions: [700, 500, 285, 100, 50, 25],
            // regularAmountsOptions: [250, 100, 50, 30, 25, 10],
            restrictOptions: false,
            restrictedAmounts: [],
            customFields: [],
            // restrictedAmounts: [
            //   { amount: 90, description: 'Aqiqa for a Boy' },
            //   { amount: 80, description: 'Aqiqa for a Girl' },
            // ],
            // customFields: [
            //   { customFieldType: 'shortText', placeholderTextField: "Child's Name" },
            //   { customFieldType: 'date', placeholderDatePicker: 'Date of Birth' },
            //   { customFieldType: 'longText', placeholderTextArea: 'Special Notes', maxChar: 200 },
            // ],
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
          </Form.Item>
          <Form.Item name="defaultDonationAmountValue" label="Default Donation Amount">
            <InputNumber min={1} />
          </Form.Item>

          <Form.List name="onceAmountsOptions">
            {(fields, { add, remove }) => (
              <>
                <Typography.Title level={5}>Suggested One-off Amount</Typography.Title>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[{ required: true, message: 'Missing amount' }]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    {fields.length > 0 && (
                      <Button icon={<CloseCircleOutlined />} type="link" onClick={() => remove(name)}>

                      </Button>
                    )}
                  </Space>
                ))}
                {fields.length < 6 && (
                  <Form.Item>
                    <Button type="dashed" onClick={() => {
                      
                      add(10)
                      }} block>
                      Add Amount
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

          <Form.Item name="allowAmountInput" valuePropName="checked">
            <Checkbox>Allow Amount input</Checkbox>
          </Form.Item>

          <Form.Item name="allowRegular" valuePropName="checked">
            <Checkbox onChange={handleAllowRegularChange}>Allow Regular Donations</Checkbox>
          </Form.Item>

          {allowRegular && (
            <>
              <Form.Item name="defaultFrequency" label="Default Frequency">
                <Select>
                  <Option value="once">Once</Option>
                  <Option value="regular">Regular</Option>
                </Select>
              </Form.Item>

              <Form.List name="regularAmountsOptions">
                {(fields, { add, remove }) => (
                  <>
                    <Typography.Title level={5}>Suggested Regular Amount</Typography.Title>
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
                        {fields.length > 0 && (
                          <Button icon={<CloseCircleOutlined />} type="link" onClick={() => remove(name)}>

                          </Button>
                        )}
                      </Space>
                    ))}
                    {fields.length < 6 && (
                      <Form.Item>
                        <Button type="dashed" onClick={() => add(5)} block>
                          Add Amount
                        </Button>
                      </Form.Item>
                    )}
                  </>
                )}
              </Form.List>
            </>
          )}

          <Form.Item name="restrictOptions" valuePropName="checked">
            <Checkbox onChange={handleRestrictOptionsChange}>Restrict Options</Checkbox>
          </Form.Item>

          {restrictOptions && (

            <Form.List name="restrictedAmounts">
              {(fields, { add, remove }) => (
                <>
                  <Typography.Title level={5}>Custom Amounts</Typography.Title>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        rules={[{ required: true, message: 'Missing amount' }]}
                      >
                        <InputNumber min={1} placeholder="Amount" style={{width: 64}} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        rules={[{ required: true, message: 'Missing description' }]}
                      >
                        <Input placeholder="Description" />
                      </Form.Item>
                      {fields.length > 0 && (
                        <Button icon={<CloseCircleOutlined />} type="link" onClick={() => remove(name)}>

                        </Button>
                      )}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add({ amount: 100, description: 'Default Description' })} block>
                      Add Custom Amount
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          )
          }

          <Form.List name="customFields">
            {(fields, { add, remove }) => (
              <>
                <Typography.Title level={5}>Custom Fields</Typography.Title>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
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
                      <Button icon={<CloseCircleOutlined />} type="link" onClick={() => remove(name)}>

                      </Button>
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Custom Field
                  </Button>
                </Form.Item>
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
            <Button type="primary" onClick={() => {
              setAllowRegular(true)
              form.resetFields()
            }}>Reset to Default</Button>
          </Form.Item>
        </Form>
        <Flex style={{ position: 'relative' }} vertical>
          <ConfigProvider
            theme={{
              token: {
                // add some token style to override
              },
            }}
          >
            <div style={{ position: 'fixed', top: 80 }}>
              <Typography.Title level={4}>Live Preview</Typography.Title>
              <CreateDonationForm {...formProps} />
              {/* <CreateDonationForm {...formProps} restrictOptions allowRegular={false} customAmounts={[1]} customAmountDescriptions={['desc']}/> */}
              {/* <CreateDonationForm {...formProps} customAmounts={[]} customAmountDescriptions={['']} /> */}
            </div>
          </ConfigProvider>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DonationFormBuilder;
