// @ts-nocheck

import { useGlobalState } from './../../GlobalProvider';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Button,
  Divider,
  Steps,
  theme,
  Input,
  InputNumber,
  Typography,
  Checkbox,
  Segmented,
  Select,
  Switch,
  DatePicker,
  Space

} from 'antd';
import { ProCard, PageContainer, CheckCard } from '@ant-design/pro-components';
import { CloseOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';



const FundraisingCreatePage: React.FC = () => {
  const { setShowSuccessMessage } = useGlobalState();
  const { setIsEmpty } = useGlobalState();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const goToTeams = () => {
    navigate('/fundraising/pages');
  };

  const [projectSelected, setProjectSelected] = useState(false);




  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
  <StepOne onProjectSelectedChange={setProjectSelected} />, 
  <StepTwo />, 
  // <StepThree />
];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    setShowSuccessMessage("Team successfully created");
    setIsEmpty(false);
    goToTeams();
  };
  

  return (
    <PageContainer
      extra={
        <Button key="2" type="text" onClick={goToTeams}>
          Cancel
        </Button>
      }
      header={{
        title: 'Create A Page',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Pages',
            },
            {
              title: 'Create',
            },
          ],
        },
      }}
      style={{ width: '100%', margin: 'auto', maxWidth: '640px' }}
    >

      <CreateSteps currentStep={currentStep} />
      <br />
      <br />
      <ProCard>

        <div>
          {steps[currentStep]}
          <Divider />
          <Flex justify="start" gap={token.sizeSM} style={{ width: '100%' }}>
            {currentStep !== 0 && <Button onClick={handlePrev}>Back</Button>}
            {currentStep !== steps.length - 1 ? (
              <Button type="primary" onClick={handleNext}
              disabled={currentStep === 0 && !projectSelected}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={handleFinish}>
                Create the page
              </Button>
            )}
          </Flex>
        </div>
      </ProCard>
    </PageContainer>
  );
}

export default FundraisingCreatePage;


const CreateSteps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <Steps
      // onChange={ () => (console.log())}
      current={currentStep}
      items={[
        {
          title: 'Step 1',
          description: 'Set Goal',
        },
        {
          title: 'Step 2',
          description: 'Page Information',
        },
        // {
        //   title: 'Step 3',
        //   description: 'Finishing Touch',
        // },
      ]}
    />
  );
};

// const StepOne: React.FC = () => {
const StepOne: React.FC<{ onProjectSelectedChange: (selected: boolean) => void }> = ({ onProjectSelectedChange }) => {

  const { token } = theme.useToken();
  const [customValueVisible, setCustomValueVisible] = useState(false);
  const [projectSelected, setProjectSelected] = useState(false);
  const [hasEndDate, setHasEndDate] = useState(false);
  const [hasCustomField, setHasCustomField] = useState(false);


  const handleGoalOption = (value: string) => {
    if (value === 'Custom') {
      setCustomValueVisible(true);
    } else {
      setCustomValueVisible(false);
    }
  };

  const handleProjectSelection = (value: string) => {
    console.log(`selected ${value}`);
    setProjectSelected(true)
    onProjectSelectedChange(true);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  return (
    <Flex vertical gap={0}>
      <div>
        <Typography.Title level={5}>I would like to fundraise for</Typography.Title>


        <Select
          showSearch
          size="large"
          style={{ width: '100%' }}
          placeholder="Select Project"
          optionFilterProp="children"
          onChange={handleProjectSelection}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: 'Food Parcel',
              label: 'Food Parcel',
            },
            {
              value: 'School Fund',
              label: 'School Fund',
            },
            {
              value: 'Tube Well',
              label: 'Tube Well',
            },
            {
              value: 'Emergency Appeal',
              label: 'Emergency Appeal',
            },
          ]}
        />

      </div>
      {projectSelected && (
        <Flex vertical>
          <div>
            <Typography.Title level={5}>I want to raise</Typography.Title>

            <Segmented<string>
              block
              size="large"
              options={['£ 10,000', '£ 50,000', '£ 100,000', 'Custom']}
              onChange={(value) => handleGoalOption(value)}
            />
          </div>
          {customValueVisible && (
            <div style={{ marginTop: token.sizeMD }}>
              <InputNumber<number>
                style={{width: '100%'}}
                size="large"
                prefix="£"
                placeholder='125,000'
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                required
              />
            </div>
          )}

          <Flex wrap='wrap' gap={token.sizeSM} justify='space-between' style={{ border: `solid 1px ${token.colorBgTextActive}`, padding: `${token.sizeSM}px`, marginTop: token.sizeMD, borderRadius: token.sizeXS }}>
            <Flex align='center' gap={token.sizeXS}>
              {/* <Flex align='center' gap={token.sizeXS} style={{ padding: `${token.sizeMD}px 0` }}> */}
              <Switch onChange={setHasEndDate} /> Has end date
            </Flex>
            {hasEndDate &&
              <Space>
                <DatePicker variant="filled" size="small" />
              </Space>
            }
          </Flex>

          <Flex wrap='wrap' gap={token.sizeSM} justify='space-between' style={{ border: `solid 1px ${token.colorBgTextActive}`, padding: `${token.sizeSM}px`, marginTop: token.sizeMD, borderRadius: token.sizeXS }}>
            <Flex align='center' gap={token.sizeXS}>
              {/* <Flex align='center' gap={token.sizeXS} style={{ padding: `${token.sizeMD}px 0` }}> */}
              <Switch onChange={setHasCustomField} /> Add a dedication
            </Flex>
            {hasCustomField &&
              <Space>
                <Input variant="filled"  placeholder='On behalf of ...' maxLength={60} style={{ width: '280px' }} />
              </Space>
            }
          </Flex>

        </Flex>
      )}



    </Flex>
  );
};



const StepTwo: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');

  const placeholder = "page-name-1002423";

  // to simulate error validation
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === 'ryan' || value === 'asdf') {
      setError('already taken');
    } else {
      setError('');
    }
  };

  return (
    <Flex vertical gap={0}>
      <div>
        <Typography.Title level={5}>Main Fundraising Page Title</Typography.Title>
        <Input
          size="large"
          count={{
            show: true,
            max: 60,
          }}
          placeholder="Example: Food Bank Initiative"
        />
        <Typography.Text type="secondary">Write campaign name up to 60 characters.</Typography.Text>
      </div>
      <Flex vertical>
        <Typography.Title level={5}>Customise web page address</Typography.Title>
        <Input
          size="large"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          status={error ? 'error' : undefined}
        // style={{ width: '60%' }}
        />

        {error ? (
          <Typography.Text type="danger">https://fundraise.charitywebsite.org/<b>{inputValue}</b> {error}</Typography.Text>
        ) : (
          <Typography.Text>
            <Typography.Text type="secondary">The page will live on: </Typography.Text>
            https://fundraise.charitywebsite.org/<b>{inputValue || placeholder}</b>
          </Typography.Text>
        )}

        <br />
        <br />
        <Typography.Text type="secondary">You can add more to the page like images and long descriptions once page is created.</Typography.Text>
      </Flex>
    </Flex>
  );
};



const StepThree: React.FC = () => {

  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSelect = (value) => {
    setEmails(value);
  };

  const handleInvite = () => {
    // Here you can implement the logic for inviting emails
    console.log('Inviting emails:', emails);
    // Reset the input value and selected emails after inviting
    setInputValue('');
    setEmails([]);
  };


  return (
    <Flex vertical gap={0}>
      <div>
        <Typography.Title level={5}>Invite others to team up with you</Typography.Title>
        <Flex gap={8}>
          <Select
            size='large'
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Type email addresses"
            value={emails}
            onChange={handleSelect}
            suffixIcon={<MailOutlined />}
            // removeIcon={<CloseOutlined />}
            onInputKeyDown={(e) => {
              if (e.keyCode === 13) {
                // Prevent default behavior of Enter key
                e.preventDefault();
                // Manually trigger selection
                handleSelect([...emails, inputValue.trim()]);
                setInputValue('');
              }
            }}
            onBlur={() => {
              if (inputValue.trim() !== '') {
                handleSelect([...emails, inputValue.trim()]);
                setInputValue('');
              }
            }}
            tokenSeparators={[',']}
            notFoundContent={null} // Remove "no data" message
          >
            {emails.map((email) => (
              <Option key={email}>{email}</Option>
            ))}
          </Select>
          {/* <Button
            type="primary"
            onClick={handleInvite}
            disabled={emails.length === 0}
          >
            Invite
          </Button> */}

        </Flex>
        <Typography.Text type="secondary">Add email addresses, separate by commas (,) to add multiple.</Typography.Text>

        <br />
        <br />
        <Typography.Text type="secondary">You can always do this later after you created the team.</Typography.Text>
      </div>
    </Flex>
  );
};
