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
    Checkbox,
    Tooltip
} from 'antd';
import { CalendarOutlined, CreditCardOutlined, FileOutlined, HeartFilled, LeftOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import SelectAllocationCascader from './SelectAllocationCascader';

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
        setIsAdminFeeChecked(false)
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
    opacity: 0;
  }
  50% {
    opacity: 100;
    transform: scale(2) rotate(-10deg);
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


    // for processing fee an upsells

    const [isAdminFeeChecked, setIsAdminFeeChecked] = useState(false);
    const donationAmountValueWithFee = donationAmountValue + (donationAmountValue / 25);

    return (
        <Card hoverable bordered={false} style={{ width: '100%' }}>
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
                    <Flex
                        vertical 
                        // justify='space-between'
                        // gap={token.sizeMD}
                        style={{ flex: '1 0 0', width: '100%', minHeight: 480 }}>

                        <Flex vertical gap={token.sizeMD}>
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
                            {donationAmountValue > 0 && 
                            <SelectAllocationCascader />
                            }
                        </Flex>

                        
                        <Button
                            style={{ marginTop: 'auto' }}
                            block
                            size="large"
                            // icon={<FileOutlined />}
                            type="primary"
                            onClick={handleNextStep}
                            disabled={donationAmountValue === undefined || donationAmountValue <= 0 && true}
                        >
                            Continue
                        </Button>
                    </Flex>
                )}

                {currentStep === 2 && selectedSegment === 'Give Once' && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: 480}}
                    vertical
                    justify='space-between'>
                        <Typography.Text style={{ fontFamily : 'inherit', fontSize: 'large', textAlign: 'center'}}>
                            Would you like to join us as a valued monthly supporter by converting your {currencySymbol}{donationAmountValue} contribution into a monthly gift.
                            <br />
                            <br />
                            Monthly donations help us
                            <br />
                            make a greater impact.
                        </Typography.Text>

                        <Flex vertical gap={token.sizeSM}>
                            <Button
                                block
                                size="large"
                                type="primary"
                                onClick={() => {
                                    setSelectedSegment('Monthly');
                                    handleNextStep();
                                    setDonationAmountValue(donationAmountValue/2)
                                }}
                                icon={<HeartFilled
                                    className="pulse-animation"
                                    style={{ color: 'white' }}
                                />}
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
                    </Flex>
                )}

                {/* if one-off donation is more than 100, don't upsell for monthy */}
                {currentStep === 2 && donationAmountValue > 100 && (() => { handleNextStep(); return null; })()}

                {/* if donation is 100 or less, offer monthly giving plan */}
                {currentStep === 2 && selectedSegment === 'Monthly' && (() => { handleNextStep(); return null; })()}


                {currentStep === 3 && (
                    <Flex vertical gap={token.sizeMD} style={{ width: '100%', minHeight: 480 }}>
                        {/* <Button
                            block
                            size="large"
                            type='text'
                            icon={<LeftOutlined />}
                            // onClick={handlePreviousStep}
                            onClick={() => setCurrentStep(1)}
                        >
                            Go Back
                        </Button> */}
                        <Flex vertical gap={token.sizeSM}>
                            <div>
                                <Typography.Title level={5} style={{ fontFamily: 'inherit', margin: `0px 0px ${token.sizeXXS}px` }}>
                                    Your Name
                                </Typography.Title>
                                <Input
                                    style={{ borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0px 0px`, marginBottom: '-1px',}}
                                    size="large"
                                    placeholder="First Name"
                                />
                                <Input
                                    style={{ borderRadius: `0px 0px ${token.borderRadius}px ${token.borderRadius}px `}}
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
                                    style={{ width : 120}}
                                    size="large"
                                    placeholder=""
                                />
                            </div>
                            <Checkbox>Subscribe to receive updates from our charity</Checkbox>
                            <Checkbox>I agree with <a>terms and condition</a></Checkbox>
                        </Flex>
                        <Flex gap={token.sizeSM} style={{marginTop: 'auto'}}>
                            <Button
                                size="large"
                                // type='text'
                                icon={<LeftOutlined />}
                                // onClick={handlePreviousStep}
                                onClick={() => setCurrentStep(1)}
                            />

                            <Button
                                block
                                size="large"
                                type="primary"
                                // onClick={handleNextStep}
                                onClick={() => {
                                    handleNextStep();
                                    {donationAmountValue <= 100 && setIsAdminFeeChecked(true)}
                                }}
                            >
                                Continue
                            </Button>
                        </Flex>
                    </Flex>
                )}

                {currentStep === 4 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: 480 }} vertical>
                        
                        <Flex vertical gap={token.sizeXXS} style={{ marginBottom: 'auto'}}>
                            
                            <Tooltip
                                open={donationAmountValue > 100 && isAdminFeeChecked === false && true}
                                placement='right'
                                title="Would you like to cover the transaction costs so that we receive 100% of your gift?">
                                <CheckCard
                                    avatar="https://images.pexels.com/photos/6289064/pexels-photo-6289064.jpeg?auto=compress&cs=tinysrgb&w=200"
                                    style={{display: 'flex', flex: 1, width: '100%'}}
                                    title={"Cover Admin Fee" + ` ${currencySymbol}${donationAmountValue/25}` + ' ?'}
                                    description="Help us pay the processing and platform fee"
                                    onChange={
                                        (checked) => { console.log('checked', checked); setIsAdminFeeChecked(checked); }
                                    }
                                    defaultChecked={donationAmountValue <= 100 && true}
                                    />
                            </Tooltip>

                            {/* upsell */}
                            {/* <CheckCard
                                avatar="https://images.pexels.com/photos/7132575/pexels-photo-7132575.jpeg?auto=compress&cs=tinysrgb&w=200"
                                style={{display: 'flex', flex: 1, width: '100%'}}
                                title="Help Gaza Emergency"
                                description="Save lives in Gaza"
                            /> */}
                            
                            {/* gift aid */}
                            {/* <CheckCard
                                style={{display: 'flex', flex: 1, width: '100%'}}
                                title="Add Gift Aid to my donation"
                                description="25% more without any extra cost to you"
                            /> */}

                        </Flex>

                        <Typography.Title level={5} style={{ fontFamily: 'inherit', textAlign: 'center', marginTop: 0}}>
                                Your donation: <br />
                                &nbsp;
                                {/* {currencySymbol}{donationAmountValue} {selectedSegment === 'Monthly' && "/month" || null}  */}
                                <Typography.Title level={3} style={{ fontFamily: 'inherit', textAlign: 'center', marginTop: 0}}>
                                {currencySymbol}
                                {isAdminFeeChecked ? donationAmountValueWithFee : donationAmountValue}
                                {selectedSegment === 'Monthly' && "/month" || null} 
                                </Typography.Title>
                        </Typography.Title>
                        
                        
                        <Flex vertical gap={token.sizeSM} style={{ marginTop: 'auto'}}>
                            
                            <Button
                                block
                                size="large"
                                type="primary"
                                onClick={handleNextStep}
                                icon={<CreditCardOutlined />}
                            >
                                Credit/Debit Card
                            </Button>

                            {/* apple pay */}
                            {/* <Button
                                block
                                size="large"
                                type="primary"
                                // onClick={handleNextStep}
                                style={{ background: 'black'}}
                                >
                                <img height={22} src="https://res.cloudinary.com/rn3o/image/upload/v1716372044/apay_rpqnwe.png" />
                            </Button> */}

                            {/* google pay */}
                            <Button
                                block
                                size="large"
                                type="primary"
                                // onClick={handleNextStep}
                                style={{ background: 'black'}}
                            >
                                <img height={25} src="https://res.cloudinary.com/rn3o/image/upload/v1716372043/gpay_bljz0a.png" />
                            </Button>

                            {/* paypal */}
                            <Button
                                block
                                size="large"
                                type="primary"
                                // onClick={handleNextStep}
                                style={{ background: '#ffc439'}}
                            >
                                <img height={22} src="https://res.cloudinary.com/rn3o/image/upload/v1716372594/paypal_jilpym.png" />
                            </Button>

                            <Button
                                block
                                size="large"
                                type='text'
                                icon={<LeftOutlined />}
                                onClick={handlePreviousStep}
                                style={{ fontSize: 'smaller'}}
                                >
                                Change my detail
                            </Button>
                            
                        </Flex>
                    </Flex>
                )}

                {currentStep === 5 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: 480 }} vertical>
                        <Button
                            block
                            size="large"
                            type='text'
                            icon={<LeftOutlined />}
                            onClick={handlePreviousStep}
                            style={{ fontSize: 'smaller'}}
                        >
                            Change Payment Option
                        </Button>

                        <Typography.Text style={{ fontFamily: 'inherit', fontSize: token.sizeMS, textAlign: 'center', padding: token.sizeMD}}>
                            Please enter your card details<br/>to complete your donation.
                        </Typography.Text>

                        <div>
                                <Typography.Title level={5} style={{ fontFamily: 'inherit', margin: `0px 0px ${token.sizeXXS}px` }}>
                                    Cardholder Name
                                </Typography.Title>
                                <Input
                                    size="large"
                                    placeholder="Full Name"
                                />
                        </div>
                        <div>
                                <Typography.Title level={5} style={{ fontFamily: 'inherit', margin: `0px 0px ${token.sizeXXS}px` }}>
                                    Card Details
                                </Typography.Title>
                                <Input
                                    size="large"
                                    placeholder="12 Digits"
                                    suffix={<CreditCardOutlined style={{ opacity: 0.3}} />}
                                />
                        </div>
                        <Flex>
                                
                                <Input
                                    style={{ borderRadius: `${token.borderRadius}px 0px 0px ${token.borderRadius}px`}}
                                    size="large"
                                    placeholder="MM / YY"
                                />
                                <Input
                                    style={{ borderRadius: `0px ${token.borderRadius}px ${token.borderRadius}px 0px`, marginLeft: '-1px',}}
                                    size="large"
                                    placeholder="CVC"
                                />
                        </Flex>


                        
                        <Button
                            block
                            style={{ marginTop: 'auto'}}
                            size="large"
                            type="primary"
                            onClick={handleNextStep}
                        >
                            Pay
                        </Button>
                    </Flex>
                )}

                {currentStep === 6 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: 480 }} vertical>

                        <Typography.Title level={5} style={{ fontFamily: 'inherit', textAlign: 'center'}}>
                            Thanks for donation, you will receive an email confirmation soon.
                        </Typography.Title>

                        <img src="https://res.cloudinary.com/rn3o/image/upload/v1716379834/send-message_h2erlx.svg" />
                        <Button
                            style={{marginTop: 'auto'}}
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
