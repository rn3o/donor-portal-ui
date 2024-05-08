// @ts-nocheck

import React, { useEffect, useState } from 'react';
import {
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  PercentageOutlined,
  NotificationOutlined,
  BarsOutlined,
  UserOutlined,
  BankOutlined,
  ControlOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  Flex,
  Space,
  Select,
  Radio,
  Popconfirm,
  message,
  Alert,
  Badge,
  Segmented,
  Divider,
} from 'antd';

const { Item } = Form;

const App: React.FC = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [formOrder, setFormOrder] = useState<string[]>(['basicInformation']);
  const [formVisibility, setFormVisibility] = useState<{
    [key: string]: boolean;
  }>({
    basicInformation: true,
    address: false,
    socialPresence: false,
    contactPreferences: false,
    interaction: false,
    phoneNumber: false,
    emailAddress: false,
  });

  const { TextArea } = Input;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  const addForm = (formType: string) => {
    const updatedOrder = [...formOrder, formType];
    setFormOrder(updatedOrder);
    setFormVisibility((prevVisibility) => ({
      ...prevVisibility,
      [formType]: true,
    }));
  };

  const closeForm = (formType: string) => {
    if (formType === 'basicInformation') return; // Basic Information form cannot be removed
    setFormVisibility((prevVisibility) => ({
      ...prevVisibility,
      [formType]: false,
    }));
    setFormOrder((prevOrder) => prevOrder.filter((type) => type !== formType));
  };

  const handleConfirm = (formType) => {
    closeForm(formType);
    // message.success('Form removed');
  };

  const getTitle = (formType: string) => {
    switch (formType) {
      case 'basicInformation':
        return 'Basic Information';
      case 'address':
        return 'Address';
      case 'contactPreferences':
        return 'Contact Preferences';
      case 'interaction':
        return 'Interaction';
      case 'phoneNumber':
        return 'Phone Number';
      case 'emailAddress':
        return 'Email Address';
      case 'socialPresence':
        return 'Social Presence';
      case 'giftAid':
        return 'Gift Aid';
      case 'customField1':
        return 'Custom Field 1';
      case 'customField2':
        return 'Custom Field 2';
      default:
        return '';
    }
  };

  // Check if either phone number or email address is added
  const [contactInfoAdded, setContactInfoAdded] = useState<boolean>(false);
  useEffect(() => {
    const hasContactInfo =
      formVisibility.phoneNumber || formVisibility.emailAddress;
    setContactInfoAdded(hasContactInfo);
  }, [formVisibility.phoneNumber, formVisibility.emailAddress]);

  const addFormButtonStyle = {
    height: '52px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    alignText: 'left',
  };

  // segmented based on account type
  const [selectedSegment, setSelectedSegment] = useState<string>('Individual');

  const handleSegmentChange = (value: string) => {
    setSelectedSegment(value);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Segmented
        block
        size="large"
        options={[
          {
            label: 'Individual',
            value: 'Individual',
            icon: <UserOutlined />,
          },
          {
            label: 'Business',
            value: 'Business',
            icon: <BankOutlined />,
          },
        ]}
        value={selectedSegment}
        onChange={handleSegmentChange}
      />

      {formOrder.map((formType, index) => (
        <Card
          key={formType}
          bordered={false}
          size="default"
          title={getTitle(formType)}
          extra={
            formType !== 'basicInformation' && (
              // --- if certain type, than remove form confirm first --- //

              // !['phoneNumber', 'emailAddress'].includes(formType) ? (
              //   <CloseOutlined
              //     onClick={() => {
              //       closeForm(formType);
              //     }}
              //   />
              // ) : (
              //   <Popconfirm
              //     title="Remove this form?"
              //     onConfirm={() => handleConfirm(formType)}
              //     okText="Yes"
              //     cancelText="No"
              //   >
              //     <CloseOutlined />
              //   </Popconfirm>
              // )

              // --- confirm all form on remove --- //

              <Popconfirm
                title={`Remove ${getTitle(formType)}?`}
                onConfirm={() => handleConfirm(formType)}
                okText="Yes"
                cancelText="No"
              >
                <CloseOutlined />
              </Popconfirm>

              // --- just remove directly --- //

              // <CloseOutlined
              //   onClick={() => {
              //     closeForm(formType);
              //   }}
              // />
            )
          }
        >
          {index === 0 && selectedSegment === 'Individual' && (
            <>
              <Item label="Title" name={`${formType}.title`}>
                <Select placeholder="Select title" style={{ width: 120 }}>
                  <Option value="Dr">Dr</Option>
                  <Option value="Mr">Mr</Option>
                  <Option value="Mrs">Mrs</Option>
                  <Option value="Ms">Ms</Option>
                  <Option value="Miss">Miss</Option>
                </Select>
              </Item>
              <Item label="Name" name={`${formType}.name`}>
                <Input placeholder="Name" />
              </Item>
              <Item label="Notes" name={`${formType}.notes`}>
                <TextArea
                  placeholder="Some notes about this account"
                  allowClear
                  onChange={onChange}
                />
              </Item>
            </>
          )}

          {index === 0 && selectedSegment === 'Business' && (
            <>
              <Item label="Org. Name" name={`${formType}.orgName`}>
                <Input placeholder="Name" />
              </Item>
              <Item label="Org. Type" name={`${formType}.orgType`}>
                <Select placeholder="Select Type" style={{ width: 200 }}>
                  <Option value="Dr">Business</Option>
                  <Option value="Mr">Community Group</Option>
                  <Option value="Mrs">Institutional Funder</Option>
                  <Option value="Ms">School</Option>
                </Select>
              </Item>

              <Divider orientationMargin="0" orientation="left">
                {' '}
                Contact Person{' '}
              </Divider>

              <Item label="Title" name={`${formType}.title`}>
                <Select placeholder="Select title" style={{ width: 120 }}>
                  <Option value="Dr">Dr</Option>
                  <Option value="Mr">Mr</Option>
                  <Option value="Mrs">Mrs</Option>
                  <Option value="Ms">Ms</Option>
                  <Option value="Miss">Miss</Option>
                </Select>
              </Item>
              <Item label="Name" name={`${formType}.name`}>
                <Input placeholder="Name" />
              </Item>
              <Item label="Notes" name={`${formType}.notes`}>
                <TextArea
                  placeholder="Some notes about this account"
                  allowClear
                  onChange={onChange}
                />
              </Item>
            </>
          )}

          {formType === 'address' && (
            <div id="address">
              <Item label="Address Line 1" name={`${formType}.addressLine1`}>
                <Input placeholder="Address Line 1" />
              </Item>
              <Item label="Address Line 2" name={`${formType}.addressLine2`}>
                <Input placeholder="Address Line 2" />
              </Item>
              <Item label="Country" name={`${formType}.country`}>
                <Input placeholder="Country" style={{ maxWidth: 200 }} />
              </Item>
              <Item label="Postcode" name={`${formType}.postcode`}>
                <Input placeholder="Postcode" style={{ maxWidth: 100 }} />
              </Item>
            </div>
          )}
          {formType === 'socialPresence' && (
            <div id="social">
              <Item label="Facebook" name={`${formType}.facebook`}>
                <Input placeholder="Facebook" />
              </Item>
              <Item label="Instagram" name={`${formType}.instagram`}>
                <Input placeholder="Instagram" />
              </Item>
              <Item label="LinkedIn" name={`${formType}.linkedin`}>
                <Input placeholder="LinkedIn" />
              </Item>
            </div>
          )}
          {formType === 'phoneNumber' && <MultiPhoneForm />}
          {formType === 'emailAddress' && <MultiEmailForm />}

          {formType === 'contactPreferences' && (
            <div id="contactPreferences">
              <Item label="Label">
                <Input placeholder="Value" />
              </Item>
            </div>
          )}

          {formType === 'giftAid' && (
            <div id="giftAid">
              <Item label="Label">
                <Input placeholder="Value" />
              </Item>
            </div>
          )}

          {formType === 'interaction' && (
            <>
              <Item label="Label">
                <Input placeholder="Value" />
              </Item>
            </>
          )}

          {formType === 'customField1' && (
            <>
              <Item label="Label">
                <Input placeholder="Value" />
              </Item>
            </>
          )}

          {formType === 'customField2' && (
            <>
              <Item label="Label">
                <Input placeholder="Value" />
              </Item>
            </>
          )}
        </Card>
      ))}

      <Divider
        orientationMargin="0"
        orientation="left"
        style={{ fontSize: 'small', fontWeight: '600' }}
      >
        Add more details to this account
      </Divider>

      <Flex vertical gap="16px">
        {!formVisibility.address && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('address')}
            block
          >
            <EnvironmentOutlined /> Address
          </Button>
        )}

        {!formVisibility.phoneNumber && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('phoneNumber')}
            block
          >
            <PhoneOutlined /> Phone Number
          </Button>
        )}
        {!formVisibility.emailAddress && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('emailAddress')}
            block
          >
            <MailOutlined /> Email Address
          </Button>
        )}
        {!formVisibility.socialPresence && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('socialPresence')}
            block
          >
            <GlobalOutlined /> Social Presence
          </Button>
        )}

        {!formVisibility.contactPreferences && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('contactPreferences')}
            block
          >
            <ControlOutlined /> Contact Preferences
          </Button>
        )}

        {!formVisibility.giftAid && selectedSegment === 'Individual' && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('giftAid')}
            block
          >
            <PercentageOutlined /> Gift Aid
          </Button>
        )}
        {!formVisibility.interaction && (
          <Button
            style={addFormButtonStyle}
            type="dashed"
            onClick={() => addForm('interaction')}
            block
          >
            <NotificationOutlined /> Interaction
          </Button>
        )}
        {!formVisibility.customField1 && (
          <Badge.Ribbon
            text="Custom Field"
            color="gray"
            style={{ fontSize: 'smaller' }}
          >
            <Button
              style={addFormButtonStyle}
              type="dashed"
              onClick={() => addForm('customField1')}
              block
            >
              <BarsOutlined /> Marketing
            </Button>
          </Badge.Ribbon>
        )}

        {!formVisibility.customField2 && (
          <Badge.Ribbon
            text="Custom Field"
            color="gray"
            style={{ fontSize: 'smaller' }}
          >
            <Button
              style={addFormButtonStyle}
              type="dashed"
              onClick={() => addForm('customField2')}
              block
            >
              <BarsOutlined /> Retargeting
            </Button>
          </Badge.Ribbon>
        )}

        {!contactInfoAdded && (
          <Alert
            // message="Warning"
            description="Please provide at least one contact method for this account."
            type="warning"
            showIcon
            style={{ marginBottom: 24, textAlign: 'center' }}
          />
        )}
      </Flex>
    </Form>
  );
};

export default App;

// Form to add multiple numbers

const MultiPhoneForm: React.FC = () => {
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const selectBefore = (
    <Select defaultValue="+44">
      <Option value="+44">+44</Option>
      <Option value="+1">+1</Option>
      <Option value="+62">+62</Option>
    </Select>
  );

  const selectAfter = (
    <Select defaultValue="Mobile">
      <Option value="Mobile">Mobile</Option>
      <Option value="Fixed Line">Fixed Line</Option>
      <Option value="Unknown">Unknown</Option>
    </Select>
  );

  const [form] = Form.useForm();
  const [primaryField, setPrimaryField] = useState<string | undefined>();

  useEffect(() => {
    form.setFieldsValue({ phoneNumbers: [''] }); // Initialize with one phone number field
  }, []); // Run only once on component mount

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleAddField = () => {
    form.validateFields().then(() => {
      form.setFieldsValue({
        phoneNumbers: [...form.getFieldValue('phoneNumbers'), ''],
      });
    });
  };

  const handleRemoveField = (index: number) => {
    form.validateFields().then(() => {
      const newFields = [...form.getFieldValue('phoneNumbers')];
      newFields.splice(index, 1);
      form.setFieldsValue({ phoneNumbers: newFields });
      if (primaryField === index.toString()) {
        setPrimaryField(undefined); // Reset primaryField if the removed field was the primary one
      } else if (primaryField && parseInt(primaryField) > index) {
        setPrimaryField((parseInt(primaryField) - 1).toString()); // Adjust primaryField index if necessary
      }
    });
  };

  const handlePrimaryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setPrimaryField(
      index === parseInt(e.target.value) ? undefined : index.toString()
    );
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      form={form}
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.List name="phoneNumbers">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                // label={index === 0 ? 'Phone' : ''}
                required={false}
                key={field.key}
              >
                <Flex>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input phone number.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      addonBefore={<CountryCodeSelection />}
                      placeholder="phone number"
                      // style={{ width: '300px' }}
                      // style={{ width: '60%' }}

                      style={{ flex: '1' }}
                      addonAfter={selectAfter}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ padding: '0 8px' }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                  {fields.length > 1 && (
                    <Flex align="center">
                      <Radio
                        checked={primaryField === index.toString()}
                        onChange={(e) => handlePrimaryChange(e, index)}
                      >
                        Primary
                      </Radio>
                    </Flex>
                  )}
                </Flex>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={handleAddField}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              >
                Add Another
              </Button>
              <Form.ErrorList />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

// Form to add multiple emails

const MultiEmailForm: React.FC = () => {
  const { Option } = Select;

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const selectAfter = (
    <Select defaultValue="Personal">
      <Option value="Personal">Personal</Option>
      <Option value="Work">Work</Option>
      <Option value="Unknown">Unknown</Option>
    </Select>
  );

  const [form] = Form.useForm();
  const [primaryField, setPrimaryField] = useState<string | undefined>();

  useEffect(() => {
    form.setFieldsValue({ phoneNumbers: [''] }); // Initialize with one phone number field
  }, []); // Run only once on component mount

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleAddField = () => {
    form.validateFields().then(() => {
      form.setFieldsValue({
        phoneNumbers: [...form.getFieldValue('phoneNumbers'), ''],
      });
    });
  };

  const handleRemoveField = (index: number) => {
    form.validateFields().then(() => {
      const newFields = [...form.getFieldValue('phoneNumbers')];
      newFields.splice(index, 1);
      form.setFieldsValue({ phoneNumbers: newFields });
      if (primaryField === index.toString()) {
        setPrimaryField(undefined); // Reset primaryField if the removed field was the primary one
      } else if (primaryField && parseInt(primaryField) > index) {
        setPrimaryField((parseInt(primaryField) - 1).toString()); // Adjust primaryField index if necessary
      }
    });
  };

  const handlePrimaryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setPrimaryField(
      index === parseInt(e.target.value) ? undefined : index.toString()
    );
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      form={form}
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.List name="phoneNumbers">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                // label={index === 0 ? 'Phone' : ''}
                required={false}
                key={field.key}
              >
                <Flex>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input email address.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="name@example.com"
                      // style={{ width: '300px' }}
                      // style={{ width: '60%' }}
                      style={{ flex: '1' }}
                      addonAfter={selectAfter}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ padding: '0 8px' }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                  {fields.length > 1 && (
                    <Flex align="center">
                      <Radio
                        checked={primaryField === index.toString()}
                        onChange={(e) => handlePrimaryChange(e, index)}
                      >
                        Primary
                      </Radio>
                    </Flex>
                  )}
                </Flex>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={handleAddField}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              >
                Add Another
              </Button>
              <Form.ErrorList />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

// Country Code Selection

const CountryCodeSelection: React.FC = () => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string; desc: string }
  ) => {
    const labelLower = (option?.label ?? '').toLowerCase();
    const descLower = (option?.desc ?? '').toLowerCase();
    const inputLower = input.toLowerCase();
    return labelLower.includes(inputLower) || descLower.includes(inputLower);
  };

  return (
    <Select
      showSearch
      optionFilterProp="children"
      defaultValue="+44"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={phoneCodeOptions}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji}
          </span>
          {option.data.desc}
        </Space>
      )}
      style={{ width: '80px' }}
      dropdownStyle={{ minWidth: '160px' }}
    />
  );
};

const phoneCodeOptions: SelectProps['options'] = [
  {
    label: '+1',
    value: '+1',
    emoji: '🇺🇸',
    desc: '+1 (USA)',
  },
  {
    label: '+1',
    value: '+1',
    emoji: '🇨🇦',
    desc: '+1 (Canada)',
  },
  {
    label: '+44',
    value: '+44',
    emoji: '🇬🇧',
    desc: '+44 (United Kingdom)',
  },
  {
    label: '+33',
    value: '+33',
    emoji: '🇫🇷',
    desc: '+33 (France)',
  },
  {
    label: '+1-242',
    value: '+1-242',
    emoji: '🇧🇸',
    desc: '+1-242 (Bahamas)',
  },
  {
    label: '+1-246',
    value: '+1-246',
    emoji: '🇧🇧',
    desc: '+1-246 (Barbados)',
  },
  {
    label: '+1-268',
    value: '+1-268',
    emoji: '🇦🇬',
    desc: '+1-268 (Antigua and Barbuda)',
  },
  {
    label: '+1-284',
    value: '+1-284',
    emoji: '🇻🇬',
    desc: '+1-284 (British Virgin Islands)',
  },
  {
    label: '+1-345',
    value: '+1-345',
    emoji: '🇰🇾',
    desc: '+1-345 (Cayman Islands)',
  },
  {
    label: '+1-441',
    value: '+1-441',
    emoji: '🇧🇲',
    desc: '+1-441 (Bermuda)',
  },
  {
    label: '+1-473',
    value: '+1-473',
    emoji: '🇬🇩',
    desc: '+1-473 (Grenada)',
  },
  {
    label: '+1-649',
    value: '+1-649',
    emoji: '🇹🇨',
    desc: '+1-649 (Turks and Caicos Islands)',
  },
  {
    label: '+1-664',
    value: '+1-664',
    emoji: '🇲🇸',
    desc: '+1-664 (Montserrat)',
  },
  {
    label: '+1-670',
    value: '+1-670',
    emoji: '🇲🇵',
    desc: '+1-670 (Northern Mariana Islands)',
  },
  {
    label: '+1-671',
    value: '+1-671',
    emoji: '🇬🇺',
    desc: '+1-671 (Guam)',
  },
  {
    label: '+1-684',
    value: '+1-684',
    emoji: '🇦🇸',
    desc: '+1-684 (American Samoa)',
  },
  {
    label: '+1-721',
    value: '+1-721',
    emoji: '🇸🇽',
    desc: '+1-721 (Sint Maarten)',
  },
  {
    label: '+1-758',
    value: '+1-758',
    emoji: '🇱🇨',
    desc: '+1-758 (Saint Lucia)',
  },
  {
    label: '+1-767',
    value: '+1-767',
    emoji: '🇩🇲',
    desc: '+1-767 (Dominica)',
  },
  {
    label: '+1-784',
    value: '+1-784',
    emoji: '🇻🇨',
    desc: '+1-784 (Saint Vincent and the Grenadines)',
  },
  {
    label: '+1-787',
    value: '+1-787',
    emoji: '🇵🇷',
    desc: '+1-787 (Puerto Rico)',
  },
  {
    label: '+1-868',
    value: '+1-868',
    emoji: '🇹🇹',
    desc: '+1-868 (Trinidad and Tobago)',
  },
  {
    label: '+1-869',
    value: '+1-869',
    emoji: '🇰🇳',
    desc: '+1-869 (Saint Kitts and Nevis)',
  },
  {
    label: '+1-876',
    value: '+1-876',
    emoji: '🇯🇲',
    desc: '+1-876 (Jamaica)',
  },
  {
    label: '+20',
    value: '+20',
    emoji: '🇪🇬',
    desc: '+20 (Egypt)',
  },
  {
    label: '+211',
    value: '+211',
    emoji: '🇸🇸',
    desc: '+211 (South Sudan)',
  },
  {
    label: '+212',
    value: '+212',
    emoji: '🇲🇦',
    desc: '+212 (Morocco)',
  },
  {
    label: '+213',
    value: '+213',
    emoji: '🇩🇿',
    desc: '+213 (Algeria)',
  },
  {
    label: '+216',
    value: '+216',
    emoji: '🇹🇳',
    desc: '+216 (Tunisia)',
  },
  {
    label: '+218',
    value: '+218',
    emoji: '🇱🇾',
    desc: '+218 (Libya)',
  },
  {
    label: '+220',
    value: '+220',
    emoji: '🇬🇲',
    desc: '+220 (Gambia)',
  },
  {
    label: '+221',
    value: '+221',
    emoji: '🇸🇳',
    desc: '+221 (Senegal)',
  },
  {
    label: '+222',
    value: '+222',
    emoji: '🇲🇷',
    desc: '+222 (Mauritania)',
  },
  {
    label: '+223',
    value: '+223',
    emoji: '🇲🇱',
    desc: '+223 (Mali)',
  },
  {
    label: '+224',
    value: '+224',
    emoji: '🇬🇳',
    desc: '+224 (Guinea)',
  },
  {
    label: '+225',
    value: '+225',
    emoji: '🇨🇮',
    desc: '+225 (Côte d’Ivoire)',
  },
  {
    label: '+226',
    value: '+226',
    emoji: '🇧🇫',
    desc: '+226 (Burkina Faso)',
  },
  {
    label: '+227',
    value: '+227',
    emoji: '🇳🇪',
    desc: '+227 (Niger)',
  },
  {
    label: '+228',
    value: '+228',
    emoji: '🇹🇬',
    desc: '+228 (Togo)',
  },
  {
    label: '+229',
    value: '+229',
    emoji: '🇧🇯',
    desc: '+229 (Benin)',
  },
  {
    label: '+230',
    value: '+230',
    emoji: '🇲🇺',
    desc: '+230 (Mauritius)',
  },
  {
    label: '+231',
    value: '+231',
    emoji: '🇱🇷',
    desc: '+231 (Liberia)',
  },
  {
    label: '+232',
    value: '+232',
    emoji: '🇸🇱',
    desc: '+232 (Sierra Leone)',
  },
  {
    label: '+233',
    value: '+233',
    emoji: '🇬🇭',
    desc: '+233 (Ghana)',
  },
  {
    label: '+234',
    value: '+234',
    emoji: '🇳🇬',
    desc: '+234 (Nigeria)',
  },
  {
    label: '+235',
    value: '+235',
    emoji: '🇹🇩',
    desc: '+235 (Chad)',
  },
  {
    label: '+236',
    value: '+236',
    emoji: '🇨🇫',
    desc: '+236 (Central African Republic)',
  },
  {
    label: '+237',
    value: '+237',
    emoji: '🇨🇲',
    desc: '+237 (Cameroon)',
  },
  {
    label: '+238',
    value: '+238',
    emoji: '🇨🇻',
    desc: '+238 (Cape Verde)',
  },
  {
    label: '+239',
    value: '+239',
    emoji: '🇸🇹',
    desc: '+239 (São Tomé and Príncipe)',
  },
  {
    label: '+240',
    value: '+240',
    emoji: '🇬🇶',
    desc: '+240 (Equatorial Guinea)',
  },
  {
    label: '+241',
    value: '+241',
    emoji: '🇬🇦',
    desc: '+241 (Gabon)',
  },
  {
    label: '+242',
    value: '+242',
    emoji: '🇨🇬',
    desc: '+242 (Republic of the Congo)',
  },
  {
    label: '+243',
    value: '+243',
    emoji: '🇨🇩',
    desc: '+243 (Democratic Republic of the Congo)',
  },
  {
    label: '+244',
    value: '+244',
    emoji: '🇦🇴',
    desc: '+244 (Angola)',
  },
  {
    label: '+245',
    value: '+245',
    emoji: '🇬🇼',
    desc: '+245 (Guinea-Bissau)',
  },
  {
    label: '+246',
    value: '+246',
    emoji: '🇮🇴',
    desc: '+246 (British Indian Ocean Territory)',
  },
  {
    label: '+247',
    value: '+247',
    emoji: '🇦🇸',
    desc: '+247 (Ascension Island)',
  },
  {
    label: '+248',
    value: '+248',
    emoji: '🇸🇨',
    desc: '+248 (Seychelles)',
  },
  {
    label: '+249',
    value: '+249',
    emoji: '🇸🇩',
    desc: '+249 (Sudan)',
  },
  {
    label: '+250',
    value: '+250',
    emoji: '🇷🇼',
    desc: '+250 (Rwanda)',
  },
  {
    label: '+251',
    value: '+251',
    emoji: '🇪🇹',
    desc: '+251 (Ethiopia)',
  },
  {
    label: '+252',
    value: '+252',
    emoji: '🇸🇴',
    desc: '+252 (Somalia)',
  },
  {
    label: '+253',
    value: '+253',
    emoji: '🇩🇯',
    desc: '+253 (Djibouti)',
  },
  {
    label: '+254',
    value: '+254',
    emoji: '🇰🇪',
    desc: '+254 (Kenya)',
  },
  {
    label: '+255',
    value: '+255',
    emoji: '🇹🇿',
    desc: '+255 (Tanzania)',
  },
  {
    label: '+256',
    value: '+256',
    emoji: '🇺🇬',
    desc: '+256 (Uganda)',
  },
  {
    label: '+257',
    value: '+257',
    emoji: '🇧🇮',
    desc: '+257 (Burundi)',
  },
  {
    label: '+258',
    value: '+258',
    emoji: '🇲🇿',
    desc: '+258 (Mozambique)',
  },
  {
    label: '+260',
    value: '+260',
    emoji: '🇿🇲',
    desc: '+260 (Zambia)',
  },
  {
    label: '+261',
    value: '+261',
    emoji: '🇲🇬',
    desc: '+261 (Madagascar)',
  },
  {
    label: '+262',
    value: '+262',
    emoji: '🇷🇪',
    desc: '+262 (Réunion)',
  },
  {
    label: '+263',
    value: '+263',
    emoji: '🇿🇼',
    desc: '+263 (Zimbabwe)',
  },
  {
    label: '+264',
    value: '+264',
    emoji: '🇳🇦',
    desc: '+264 (Namibia)',
  },
  {
    label: '+265',
    value: '+265',
    emoji: '🇲🇼',
    desc: '+265 (Malawi)',
  },
  {
    label: '+266',
    value: '+266',
    emoji: '🇱🇸',
    desc: '+266 (Lesotho)',
  },
  {
    label: '+267',
    value: '+267',
    emoji: '🇧🇼',
    desc: '+267 (Botswana)',
  },
  {
    label: '+268',
    value: '+268',
    emoji: '🇸🇿',
    desc: '+268 (Eswatini)',
  },
  {
    label: '+269',
    value: '+269',
    emoji: '🇰🇲',
    desc: '+269 (Comoros)',
  },
  {
    label: '+290',
    value: '+290',
    emoji: '🇸🇭',
    desc: '+290 (Saint Helena)',
  },
  {
    label: '+291',
    value: '+291',
    emoji: '🇪🇷',
    desc: '+291 (Eritrea)',
  },
  {
    label: '+297',
    value: '+297',
    emoji: '🇦🇼',
    desc: '+297 (Aruba)',
  },
  {
    label: '+298',
    value: '+298',
    emoji: '🇫🇴',
    desc: '+298 (Faroe Islands)',
  },
  {
    label: '+299',
    value: '+299',
    emoji: '🇬🇱',
    desc: '+299 (Greenland)',
  },
  {
    label: '+350',
    value: '+350',
    emoji: '🇬🇮',
    desc: '+350 (Gibraltar)',
  },
  {
    label: '+351',
    value: '+351',
    emoji: '🇵🇹',
    desc: '+351 (Portugal)',
  },
  {
    label: '+352',
    value: '+352',
    emoji: '🇱🇺',
    desc: '+352 (Luxembourg)',
  },
  {
    label: '+353',
    value: '+353',
    emoji: '🇮🇪',
    desc: '+353 (Ireland)',
  },
  {
    label: '+354',
    value: '+354',
    emoji: '🇮🇸',
    desc: '+354 (Iceland)',
  },
  {
    label: '+355',
    value: '+355',
    emoji: '🇦🇱',
    desc: '+355 (Albania)',
  },
  {
    label: '+356',
    value: '+356',
    emoji: '🇲🇹',
    desc: '+356 (Malta)',
  },
  {
    label: '+357',
    value: '+357',
    emoji: '🇨🇾',
    desc: '+357 (Cyprus)',
  },
  {
    label: '+358',
    value: '+358',
    emoji: '🇫🇮',
    desc: '+358 (Finland)',
  },
  {
    label: '+359',
    value: '+359',
    emoji: '🇧🇬',
    desc: '+359 (Bulgaria)',
  },
  {
    label: '+370',
    value: '+370',
    emoji: '🇱🇹',
    desc: '+370 (Lithuania)',
  },
  {
    label: '+371',
    value: '+371',
    emoji: '🇱🇻',
    desc: '+371 (Latvia)',
  },
  {
    label: '+372',
    value: '+372',
    emoji: '🇪🇪',
    desc: '+372 (Estonia)',
  },
  {
    label: '+373',
    value: '+373',
    emoji: '🇲🇩',
    desc: '+373 (Moldova)',
  },
  {
    label: '+374',
    value: '+374',
    emoji: '🇦🇲',
    desc: '+374 (Armenia)',
  },
  {
    label: '+375',
    value: '+375',
    emoji: '🇧🇾',
    desc: '+375 (Belarus)',
  },
  {
    label: '+376',
    value: '+376',
    emoji: '🇦🇩',
    desc: '+376 (Andorra)',
  },
  {
    label: '+377',
    value: '+377',
    emoji: '🇲🇨',
    desc: '+377 (Monaco)',
  },
  {
    label: '+378',
    value: '+378',
    emoji: '🇸🇲',
    desc: '+378 (San Marino)',
  },
  {
    label: '+379',
    value: '+379',
    emoji: '🇻🇦',
    desc: '+379 (Vatican City)',
  },
  {
    label: '+380',
    value: '+380',
    emoji: '🇺🇦',
    desc: '+380 (Ukraine)',
  },
  {
    label: '+381',
    value: '+381',
    emoji: '🇷🇸',
    desc: '+381 (Serbia)',
  },
  {
    label: '+382',
    value: '+382',
    emoji: '🇲🇪',
    desc: '+382 (Montenegro)',
  },
  {
    label: '+383',
    value: '+383',
    emoji: '🇽🇰',
    desc: '+383 (Kosovo)',
  },
  {
    label: '+385',
    value: '+385',
    emoji: '🇭🇷',
    desc: '+385 (Croatia)',
  },
  {
    label: '+386',
    value: '+386',
    emoji: '🇸🇮',
    desc: '+386 (Slovenia)',
  },
  {
    label: '+387',
    value: '+387',
    emoji: '🇧🇦',
    desc: '+387 (Bosnia and Herzegovina)',
  },
  {
    label: '+389',
    value: '+389',
    emoji: '🇲🇰',
    desc: '+389 (North Macedonia)',
  },
  {
    label: '+420',
    value: '+420',
    emoji: '🇨🇿',
    desc: '+420 (Czech Republic)',
  },
  {
    label: '+421',
    value: '+421',
    emoji: '🇸🇰',
    desc: '+421 (Slovakia)',
  },
  {
    label: '+423',
    value: '+423',
    emoji: '🇱🇮',
    desc: '+423 (Liechtenstein)',
  },
  // {
  //   label: '+44',
  //   value: '+44',
  //   emoji: '🇬🇧',
  //   desc: '+44 (United Kingdom)',
  // },
  {
    label: '+49',
    value: '+49',
    emoji: '🇩🇪',
    desc: '+49 (Germany)',
  },
  {
    label: '+500',
    value: '+500',
    emoji: '🇫🇰',
    desc: '+500 (Falkland Islands)',
  },
  {
    label: '+501',
    value: '+501',
    emoji: '🇧🇿',
    desc: '+501 (Belize)',
  },
  {
    label: '+502',
    value: '+502',
    emoji: '🇬🇹',
    desc: '+502 (Guatemala)',
  },
  {
    label: '+503',
    value: '+503',
    emoji: '🇸🇻',
    desc: '+503 (El Salvador)',
  },
  {
    label: '+504',
    value: '+504',
    emoji: '🇭🇳',
    desc: '+504 (Honduras)',
  },
  {
    label: '+505',
    value: '+505',
    emoji: '🇳🇮',
    desc: '+505 (Nicaragua)',
  },
  {
    label: '+506',
    value: '+506',
    emoji: '🇨🇷',
    desc: '+506 (Costa Rica)',
  },
  {
    label: '+507',
    value: '+507',
    emoji: '🇵🇦',
    desc: '+507 (Panama)',
  },
  {
    label: '+508',
    value: '+508',
    emoji: '🇵🇲',
    desc: '+508 (Saint Pierre and Miquelon)',
  },
  {
    label: '+509',
    value: '+509',
    emoji: '🇭🇹',
    desc: '+509 (Haiti)',
  },
  {
    label: '+590',
    value: '+590',
    emoji: '🇬🇵',
    desc: '+590 (Guadeloupe)',
  },
  {
    label: '+591',
    value: '+591',
    emoji: '🇧🇴',
    desc: '+591 (Bolivia)',
  },
  {
    label: '+592',
    value: '+592',
    emoji: '🇬🇾',
    desc: '+592 (Guyana)',
  },
  {
    label: '+593',
    value: '+593',
    emoji: '🇪🇨',
    desc: '+593 (Ecuador)',
  },
  {
    label: '+594',
    value: '+594',
    emoji: '🇫🇷',
    desc: '+594 (French Guiana)',
  },
  {
    label: '+595',
    value: '+595',
    emoji: '🇵🇾',
    desc: '+595 (Paraguay)',
  },
  {
    label: '+596',
    value: '+596',
    emoji: '🇫🇷',
    desc: '+596 (Martinique)',
  },
  {
    label: '+597',
    value: '+597',
    emoji: '🇸🇷',
    desc: '+597 (Suriname)',
  },
  {
    label: '+598',
    value: '+598',
    emoji: '🇺🇾',
    desc: '+598 (Uruguay)',
  },
  {
    label: '+599',
    value: '+599',
    emoji: '🇨🇼',
    desc: '+599 (Curaçao)',
  },
  {
    label: '+60',
    value: '+60',
    emoji: '🇲🇾',
    desc: '+60 (Malaysia)',
  },
  {
    label: '+61',
    value: '+61',
    emoji: '🇦🇺',
    desc: '+61 (Australia)',
  },
  {
    label: '+62',
    value: '+62',
    emoji: '🇮🇩',
    desc: '+62 (Indonesia)',
  },
  {
    label: '+63',
    value: '+63',
    emoji: '🇵🇭',
    desc: '+63 (Philippines)',
  },
  {
    label: '+64',
    value: '+64',
    emoji: '🇳🇿',
    desc: '+64 (New Zealand)',
  },
  {
    label: '+65',
    value: '+65',
    emoji: '🇸🇬',
    desc: '+65 (Singapore)',
  },
  {
    label: '+66',
    value: '+66',
    emoji: '🇹🇭',
    desc: '+66 (Thailand)',
  },
  {
    label: '+7',
    value: '+7',
    emoji: '🇷🇺',
    desc: '+7 (Russia)',
  },
  {
    label: '+81',
    value: '+81',
    emoji: '🇯🇵',
    desc: '+81 (Japan)',
  },
  {
    label: '+82',
    value: '+82',
    emoji: '🇰🇷',
    desc: '+82 (South Korea)',
  },
  {
    label: '+84',
    value: '+84',
    emoji: '🇻🇳',
    desc: '+84 (Vietnam)',
  },
  {
    label: '+86',
    value: '+86',
    emoji: '🇨🇳',
    desc: '+86 (China)',
  },
  {
    label: '+855',
    value: '+855',
    emoji: '🇰🇭',
    desc: '+855 (Cambodia)',
  },
  {
    label: '+856',
    value: '+856',
    emoji: '🇱🇦',
    desc: '+856 (Laos)',
  },
  {
    label: '+880',
    value: '+880',
    emoji: '🇧🇩',
    desc: '+880 (Bangladesh)',
  },
  {
    label: '+886',
    value: '+886',
    emoji: '🇹🇼',
    desc: '+886 (Taiwan)',
  },
  {
    label: '+90',
    value: '+90',
    emoji: '🇹🇷',
    desc: '+90 (Turkey)',
  },
  {
    label: '+91',
    value: '+91',
    emoji: '🇮🇳',
    desc: '+91 (India)',
  },
  {
    label: '+92',
    value: '+92',
    emoji: '🇵🇰',
    desc: '+92 (Pakistan)',
  },
  {
    label: '+93',
    value: '+93',
    emoji: '🇦🇫',
    desc: '+93 (Afghanistan)',
  },
  {
    label: '+94',
    value: '+94',
    emoji: '🇱🇰',
    desc: '+94 (Sri Lanka)',
  },
  {
    label: '+95',
    value: '+95',
    emoji: '🇲🇲',
    desc: '+95 (Myanmar)',
  },
  {
    label: '+960',
    value: '+960',
    emoji: '🇲🇻',
    desc: '+960 (Maldives)',
  },
  {
    label: '+961',
    value: '+961',
    emoji: '🇱🇧',
    desc: '+961 (Lebanon)',
  },
  {
    label: '+962',
    value: '+962',
    emoji: '🇯🇴',
    desc: '+962 (Jordan)',
  },
  {
    label: '+963',
    value: '+963',
    emoji: '🇸🇾',
    desc: '+963 (Syria)',
  },
  {
    label: '+964',
    value: '+964',
    emoji: '🇮🇶',
    desc: '+964 (Iraq)',
  },
  {
    label: '+965',
    value: '+965',
    emoji: '🇰🇼',
    desc: '+965 (Kuwait)',
  },
  {
    label: '+966',
    value: '+966',
    emoji: '🇸🇦',
    desc: '+966 (Saudi Arabia)',
  },
  {
    label: '+967',
    value: '+967',
    emoji: '🇾🇪',
    desc: '+967 (Yemen)',
  },
  {
    label: '+968',
    value: '+968',
    emoji: '🇴🇲',
    desc: '+968 (Oman)',
  },
  {
    label: '+970',
    value: '+970',
    emoji: '🇵🇸',
    desc: '+970 (Palestine)',
  },
  {
    label: '+971',
    value: '+971',
    emoji: '🇦🇪',
    desc: '+971 (United Arab Emirates)',
  },
  {
    label: '+972',
    value: '+972',
    emoji: '🇮🇱',
    desc: '+972 (Israel)',
  },
  {
    label: '+973',
    value: '+973',
    emoji: '🇧🇭',
    desc: '+973 (Bahrain)',
  },
  {
    label: '+974',
    value: '+974',
    emoji: '🇶🇦',
    desc: '+974 (Qatar)',
  },
  {
    label: '+975',
    value: '+975',
    emoji: '🇧🇹',
    desc: '+975 (Bhutan)',
  },
  {
    label: '+976',
    value: '+976',
    emoji: '🇲🇳',
    desc: '+976 (Mongolia)',
  },
  {
    label: '+977',
    value: '+977',
    emoji: '🇳🇵',
    desc: '+977 (Nepal)',
  },
  {
    label: '+98',
    value: '+98',
    emoji: '🇮🇷',
    desc: '+98 (Iran)',
  },
  {
    label: '+992',
    value: '+992',
    emoji: '🇹🇯',
    desc: '+992 (Tajikistan)',
  },
  {
    label: '+993',
    value: '+993',
    emoji: '🇹🇲',
    desc: '+993 (Turkmenistan)',
  },
  {
    label: '+994',
    value: '+994',
    emoji: '🇦🇿',
    desc: '+994 (Azerbaijan)',
  },
  {
    label: '+995',
    value: '+995',
    emoji: '🇬🇪',
    desc: '+995 (Georgia)',
  },
  {
    label: '+996',
    value: '+996',
    emoji: '🇰🇬',
    desc: '+996 (Kyrgyzstan)',
  },
  {
    label: '+998',
    value: '+998',
    emoji: '🇺🇿',
    desc: '+998 (Uzbekistan)',
  },
];
