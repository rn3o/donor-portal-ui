import React, { useState } from 'react';
import {
    Card,
    Button,
    theme,
    Flex,
    Segmented,
    InputNumber,
    Select,
    Typography,
    Input,
    Space,
    Checkbox
} from 'antd';
import { CalendarOutlined, FileOutlined, HeartFilled, LeftOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';

const CreateDonationForm: React.FC = () => {
    const { token } = theme.useToken();

    const [donationAmountValue, setDonationAmountValue] = useState<number>();
    const [selectedCurrency, setSelectedCurrency] = useState<string>('gbp');
    const [currencySymbol, setCurrencySymbol] = useState<string>('£');
    const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);

    const [selectedSegment, setSelectedSegment] = useState<string>('Give Once');
    const [currentStep, setCurrentStep] = useState<number>(1); // Add state for steps

    const handleSegmentChange = (value: string) => {
        setSelectedSegment(value);
    };

    const handleAmountOption = (value: number) => {
        setDonationAmountValue(value);
        setSelectedAmount(value);
    };

    const handleChangeCurrency = (value: string) => {
        setSelectedCurrency(value);

        const currencySymbols: { [key: string]: string } = {
            'gbp': '£',
            'usd': '$',
            'eur': '€',
            'cad': 'CA$',
            'sgd': 'S$ ',
        };
        setCurrencySymbol(currencySymbols[value]);
    };

    const handleInputChange = (value: number) => {
        setDonationAmountValue(value);
        if (![700, 500, 300, 200, 100, 50, 100, 75, 50, 30, 10, 5].includes(value)) {
            setSelectedAmount(undefined);
        }
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const amountOptionStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    const amountTitle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        fontSize: token.sizeMS,
    };

    const pulseStyle = `
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.8);
  }
  100% {
    transform: scale(1);
  }
}
.pulse-animation {
  animation: pulse 0.5s ease-in-out;
}
`;

    const renderCheckCards = (amounts1: number[], amounts2: number[]) => (
        <CheckCard.Group
            onChange={(value) => handleAmountOption(value as number)}
            value={selectedAmount}
        >
            <Flex>
                {amounts1.map(amount => (
                    <CheckCard
                        key={amount}
                        style={amountOptionStyle}
                        title={<div style={amountTitle}>{currencySymbol}{amount}</div>}
                        value={amount}
                    />
                ))}
            </Flex>
            <Flex>
                {amounts2.map(amount => (
                    <CheckCard
                        key={amount}
                        style={amountOptionStyle}
                        title={<div style={amountTitle}>{currencySymbol}{amount}</div>}
                        value={amount}
                    />
                ))}
            </Flex>
        </CheckCard.Group>
    );

    return (
        <Card bordered={false} style={{ width: '100%' }}>
            <Flex
                gap={token.sizeXL}
                wrap="wrap"
                justify="space-between"
                align="center"
                vertical
                style={{ minWidth: 260, maxWidth: 400 }}
            >
                <style>{pulseStyle}</style>

                {currentStep === 1 && (
                    <>
                        <Flex style={{ flex: '1 0 0', width: '100%' }}>
                            <Segmented
                                style={{ width: '100%', fontWeight: 600 }}
                                block
                                size='large'
                                options={[
                                    { label: 'Give Once', value: 'Give Once' },
                                    {
                                        label: 'Monthly',
                                        value: 'Monthly',
                                        icon: selectedSegment === 'Monthly' ? (
                                            <HeartFilled
                                                className="pulse-animation"
                                                style={{ color: token.colorErrorActive }}
                                            />
                                        ) : null,
                                    },
                                ]}
                                value={selectedSegment}
                                onChange={handleSegmentChange}
                            />
                        </Flex>
                        <div style={{ maxWidth: '100%' }}>
                            {selectedSegment === 'Give Once' && renderCheckCards([700, 500, 300], [200, 100, 50])}
                            {selectedSegment === 'Monthly' && renderCheckCards([100, 75, 50], [30, 10, 5])}
                            <InputNumber<number>
                                className='embed-donation-form'
                                style={{ color: token.colorPrimary }}
                                size="large"
                                prefix={<div style={{ fontSize: token.sizeMD }}>{currencySymbol}</div>}
                                suffix={<div style={{ fontSize: token.sizeMD, marginRight: token.sizeMS }}>{selectedSegment === 'Monthly' && "/month" || null} </div>}
                                value={donationAmountValue}
                                onChange={handleInputChange}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                required
                                addonAfter={<Select
                                    defaultValue="gbp"
                                    style={{ width: 86, zIndex: 1 }}
                                    onChange={handleChangeCurrency}
                                    suffixIcon={null}
                                    options={[
                                        { value: 'gbp', label: '🇬🇧 GBP' },
                                        { value: 'usd', label: '🇺🇸 USD' },
                                        { value: 'eur', label: '🇪🇺 EUR' },
                                        { value: 'cad', label: '🇨🇦 CAD' },
                                        { value: 'sgd', label: '🇸🇬 SGD' },
                                    ]}
                                />}
                            />
                        </div>
                        <Button
                            block
                            size="large"
                            icon={<FileOutlined />}
                            type="primary"
                            onClick={handleNextStep}
                        >
                            Donate
                        </Button>
                    </>
                )}

                {currentStep === 2 && selectedSegment === 'Give Once' && (
                    <Flex gap={token.sizeSM} style={{ width: '100%' }} vertical>
                        Will you consider becoming one of our valued monthly supporters by converting your {currencySymbol}{donationAmountValue} contribution into a monthly donation?
                        <br />Ongoing monthly donations allow us to better focus on our mission.
                        <Button
                            block
                            size="large"
                            type="primary"
                            onClick={() => {
                                setSelectedSegment('Monthly');
                                handleNextStep();
                            }}
                        >
                            Donate {currencySymbol}{donationAmountValue/2} per month
                        </Button>
                        <Button
                            block
                            size="large"
                            onClick={handleNextStep}
                        >
                            Donate {currencySymbol}{donationAmountValue} as one-off
                        </Button>
                    </Flex>
                )}

                {currentStep === 2 && selectedSegment === 'Monthly' && (() => { handleNextStep(); return null; })()}

                {/* {currentStep === 2 && selectedSegment === 'Monthly' && 
                    handleNextStep()
                } */}

                {currentStep === 3 && (
                    <Flex vertical gap={token.sizeMD} style={{ width: '100%' }}>
                        <Button
                            block
                            size="large"
                            type='text'
                            icon={<LeftOutlined />}
                            // onClick={handlePreviousStep}
                            onClick={() => setCurrentStep(1)}
                        >
                            Go Back
                        </Button>
                        <Flex vertical gap={token.sizeSM}>
                            <div>
                                <Typography.Title level={5} style={{ fontFamily: 'inherit', margin: `0px 0px ${token.sizeXXS}px` }}>
                                    Your Name
                                </Typography.Title>
                                <Input
                                    size="large"
                                    placeholder="First Name"
                                />
                                <Input
                                    size="large"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <Typography.Title level={5} style={{ fontFamily: 'inherit', margin: `0px 0px ${token.sizeXXS}px` }}>
                                    Your Email
                                </Typography.Title>
                                <Input
                                    size="large"
                                    placeholder="youremail@example.com"
                                />
                            </div>
                            <div>
                                <Typography.Title level={5} style={{ fontFamily: 'inherit', margin: `0px 0px ${token.sizeXXS}px` }}>
                                    Postcode
                                </Typography.Title>
                                <Input
                                    size="large"
                                    placeholder=""
                                />
                            </div>
                            <Checkbox>Subscribe to Our Newsletter</Checkbox>
                            <Checkbox>I agree with terms and condition</Checkbox>
                        </Flex>
                        <Flex vertical gap={token.sizeSM}>
                            <Button
                                block
                                size="large"
                                type="primary"
                                onClick={handleNextStep}
                            >
                                Continue
                            </Button>
                        </Flex>
                    </Flex>
                )}

                {currentStep === 4 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%' }} vertical>
                        <Button
                            block
                            size="large"
                            type='text'
                            icon={<LeftOutlined />}
                            onClick={handlePreviousStep}
                        >
                            Go Back
                        </Button>
                        <div>Upsell option, checkbox to cover admin fee. Don't modify this for now</div>
                        <br />
                        <div>This will list option to pay with card / apple pay / google pay etc. Don't modify this for now</div>
                        <Button
                            block
                            size="large"
                            type="primary"
                            onClick={handleNextStep}
                        >
                            Pay
                        </Button>
                    </Flex>
                )}

                {currentStep === 5 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%' }} vertical>
                        <Button
                            block
                            size="large"
                            type='text'
                            icon={<LeftOutlined />}
                            onClick={handlePreviousStep}
                        >
                            Change Payment Option
                        </Button>
                        <div>This will be payment page with card details to input. Don't modify this for now</div>
                        <Button
                            block
                            size="large"
                            type="primary"
                            onClick={handleNextStep}
                        >
                            Pay
                        </Button>
                    </Flex>
                )}

                {currentStep === 6 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%' }} vertical>
                        <div>Thanks for donation, you will receive an email confirmation soon.</div>
                        <Button
                            block
                            size="large"
                            onClick={() => setCurrentStep(1)}
                        >
                            Make another donation
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Card>
    );
};

export default CreateDonationForm;
