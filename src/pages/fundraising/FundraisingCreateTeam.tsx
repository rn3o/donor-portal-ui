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
} from 'antd';
import { ProCard, PageContainer, CheckCard } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

const FundraisingCreateTeam: React.FC = () => {
  const { setIsEmpty } = useGlobalState();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const goToPages = () => {
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
    goToPages();
    setIsEmpty(false);
  };

  return (
    <PageContainer
      extra={
        <Button key="2" type="text" onClick={goToPages}>
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
      style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
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
                Finish
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
      current={currentStep}
      items={[
        {
          title: 'Step 1',
          description: 'Set Goal',
        },
        {
          title: 'Step 2',
          description: 'About the Team',
        },
        {
          title: 'Step 3',
          description: 'Finishing Touch',
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

            <CheckCard.Group
              onChange={(value) => handleGoalOption(value)}
              defaultValue="A"
            >
              <Flex>
                <CheckCard title="£ 10,000" value="10,000" />
                <CheckCard title="£ 50,000" value="50,000" />
                <CheckCard title="£ 100,000" value="100,000" />
                <CheckCard title="Custom" value="Custom" />
              </Flex>
            </CheckCard.Group>

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
                placeholder="Custom Goal"
                required
              />
            </div>
          )}
        </>
      )}
      {!customValueVisible && (
        <Flex style={{ marginTop: token.sizeMD }}>
          <Checkbox onChange={handleOpenEndedChange}>Open Ended Goal</Checkbox>
        </Flex>
      )}
    </Flex>
  );
};

const StepTwo: React.FC = () => {
  return <>Step Two</>;
};

const StepThree: React.FC = () => {
  return <>Step Three</>;
};
