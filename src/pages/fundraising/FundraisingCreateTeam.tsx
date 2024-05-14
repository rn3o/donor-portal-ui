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
  Typography,
  Checkbox,
  Segmented,
  Select
  
} from 'antd';
import { ProCard, PageContainer, CheckCard } from '@ant-design/pro-components';
import { CloseOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';

const FundraisingCreateTeam: React.FC = () => {
  const { setShowSuccessMessage } = useGlobalState();
  const { setIsEmpty } = useGlobalState();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const goToTeams = () => {
    navigate('/fundraising/teams');
  };

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<StepOne />, <StepTwo />, <StepThree />];

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
        title: 'Create A Team',
        breadcrumb: {
          items: [
            {
              title: 'Fundraising',
            },
            {
              title: 'Teams',
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
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={handleFinish}>
                Create the team
              </Button>
            )}
          </Flex>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default FundraisingCreateTeam;

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
          description: 'Page Detail',
        },
        {
          title: 'Step 3',
          description: 'Team Up',
        },
      ]}
    />
  );
};

const StepOne: React.FC = () => {
  const { token } = theme.useToken();
  const [customValueVisible, setCustomValueVisible] = useState(false);
  const [openEndedChecked, setOpenEndedChecked] = useState(false);

  const handleGoalOption = (value: string) => {
    if (value === 'Custom') {
      setCustomValueVisible(true);
    } else {
      setCustomValueVisible(false);
    }
  };

  const handleOpenEndedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenEndedChecked(e.target.checked);
  };

  return (
    <Flex vertical gap={0}>
      <div>
        <Typography.Title level={5}>Team Name</Typography.Title>
        <Input
          size="large"
          count={{
            show: true,
            max: 30,
          }}
          placeholder="Name your team"
        />
      </div>
      {!openEndedChecked && (
        <>
          <div>
            <Typography.Title level={5}>Team Goal</Typography.Title>

            {/* <CheckCard.Group
              onChange={(value) => handleGoalOption(value)}
              defaultValue="A"
            >
              <Flex>
                <CheckCard title="£ 10,000" value="10,000" />
                <CheckCard title="£ 50,000" value="50,000" />
                <CheckCard title="£ 100,000" value="100,000" />
                <CheckCard title="Custom" value="Custom" />
              </Flex>
            </CheckCard.Group> */}

            <Segmented<string>
              block
              size="large"
              options={['£ 10,000', '£ 50,000', '£ 100,000', 'Custom']}
              onChange={(value) => handleGoalOption(value)}
            />
          </div>
          {customValueVisible && (
            <div style={{ marginTop: token.sizeMD }}>
              <Input
                size="large"
                type="number"
                placeholder="£125,000"
                required
              />
            </div>
          )}
        </>
      )}
      {/* {!customValueVisible && (
        <Flex style={{ marginTop: token.sizeMD }}>
          <Checkbox onChange={handleOpenEndedChange}>Can Fundraise Indefinitely</Checkbox>
        </Flex>
      )} */}
    </Flex>
  );
};



const StepTwo: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');

  const placeholder = "team-name";

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
          placeholder="Example: We Are Building a School!"
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
