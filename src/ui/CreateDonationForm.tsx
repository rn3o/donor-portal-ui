import React, { useEffect, useState } from 'react';
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
    Checkbox,
    Tooltip,
    Slider,
    Badge,
    Tag
} from 'antd';
import { CalendarOutlined, CheckCircleFilled, CreditCardOutlined, GiftFilled, HeartFilled, LeftOutlined, LinkOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import SelectAllocationCascader from './SelectAllocationCascader';
import type { SliderSingleProps } from 'antd';
import CreateDonationFormCustomField from './CreateDonationFormCustomField';

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => `${value}%`;

// Define the allowed custom field types
type CustomFieldType = 'shortText' | 'longText' | 'date';
type FrequencyOption = 'once' | 'regular';

interface CustomField {
    customFieldType: CustomFieldType;
    [key: string]: any;
}

interface CreateDonationFormProps {
    defaultCurrency?: string; //TODO make this available to change from prop
    defaultDonationAmountValue?: number;
    defaultFrequency?: FrequencyOption;

    allowRegular?: boolean;
    allowAllocate?: boolean;
    allowGiftAid?: boolean;
    allowUpsell?: boolean;
    customFields?: CustomField[];

    upsellItemTitle?: string;
    upsellItemImgUrl?: string;
    upsellItemDescription?: string;
    upsellItemValue?: number;

    height?: number; // min height of the widget -- still flexible depends on content

    isLoggedIn?: boolean;
    adminFeeCheckedDefault?: boolean;
    
    overrideStep?: number; // dev only

}

const CreateDonationForm: React.FC<CreateDonationFormProps> = ({
    defaultCurrency = 'gbp', //TODO
    defaultDonationAmountValue = 50,
    defaultFrequency = 'once',

    allowRegular = true,
    allowAllocate = false,
    allowGiftAid = false,
    allowUpsell = false,
    customFields = [],    

    // assigned default for demo purpose
    upsellItemImgUrl = 'https://images.pexels.com/photos/7132575/pexels-photo-7132575.jpeg?auto=compress&cs=tinysrgb&w=200',
    upsellItemTitle = 'Help Gaza Emergency',
    upsellItemDescription = 'Save lives in Gaza',
    upsellItemValue = 20,

    height = 460,
    
    isLoggedIn = false,
    adminFeeCheckedDefault = false,
    
    overrideStep = 1, // dev only
}) => {
    const { token } = theme.useToken();

    const [donationAmountValue, setDonationAmountValue] = useState<number>(defaultDonationAmountValue);
    const [selectedCurrency, setSelectedCurrency] = useState<string>(defaultCurrency);
    const [currencySymbol, setCurrencySymbol] = useState<string>('£');
    const [selectedAmount, setSelectedAmount] = useState<number | undefined>(defaultDonationAmountValue);

    const [selectedSegment, setSelectedSegment] = useState<FrequencyOption>(defaultFrequency);
    const [currentStep, setCurrentStep] = useState<number>(overrideStep); // Add state for steps

    const handleSegmentChange = (value: FrequencyOption) => {
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
        if (![700, 500, 285, 100, 50, 25, 100, 75, 50, 30, 25, 10].includes(value)) {
            setSelectedAmount(undefined);
        }
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => prev - 1);
        setIsAdminFeeChecked(false)
        setIsGiftAidChecked(false)
        setIsUpsellChecked(false)
        setFeePercentageSliderValue(4)
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

    const [isAdminFeeChecked, setIsAdminFeeChecked] = useState(adminFeeCheckedDefault);
    const [isUpsellChecked, setIsUpsellChecked] = useState(false);
    const [isGiftAidChecked, setIsGiftAidChecked] = useState(false);
    const [feePercentageSliderValue, setFeePercentageSliderValue] = useState(4); // Initial slider value

    const donationAmountValueWithFee = donationAmountValue + (donationAmountValue * (feePercentageSliderValue / 100));



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
                     <Flex gap={token.sizeMD} style={{ width: '100%', minHeight: height }} vertical>

                        <Flex vertical gap={token.sizeMD}>

                            {allowRegular &&
                                <Segmented
                                    style={{ width: '100%', fontWeight: 600 }}
                                    block
                                    size='large'
                                    options={[
                                        { label: 'Give Once', value: 'once' },
                                        {
                                            label: 'Give Regularly',
                                            value: 'regular',
                                            icon: selectedSegment === 'regular' ? (
                                                <HeartFilled
                                                    className="pulse-animation"
                                                    style={{ color: token.colorErrorActive }}
                                                />
                                            ) : null,
                                        },
                                    ]}
                                    value={selectedSegment}
                                    onChange={handleSegmentChange}
                                />}

                            {selectedSegment === 'once' && renderCheckCards([700, 500, 285], [100, 50, 25])}
                            {selectedSegment === 'regular' && renderCheckCards([100, 75, 50], [30, 25, 10])}
                            <InputNumber<number>
                                // autoFocus
                                className='embed-donation-form'
                                style={{ color: token.colorPrimary, marginTop: `-${token.sizeMD}px` }}
                                size="large"
                                prefix={<div style={{ fontSize: token.sizeMD }}>{currencySymbol}</div>}
                                suffix={<div style={{ fontSize: token.sizeMD, marginRight: token.sizeMS }}>{selectedSegment === 'regular' && "/month" || null} </div>}
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


                            {/* Conditionally show if props allowAllocate and donationAmountValue > 0 */}
                            {allowAllocate && donationAmountValue > 0 && <SelectAllocationCascader />}

                            {/* Conditionally show CreateDonationFormCustomField components */}
                            {donationAmountValue > 0 && customFields.map((field, index) => (
                                <CreateDonationFormCustomField key={index} {...field} />
                            ))}



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

                {currentStep === 2 && selectedSegment === 'once' && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: height }}
                        vertical
                        justify='space-between'>
                        <Typography.Text style={{ fontFamily: 'inherit', fontSize: 'large', textAlign: 'center' }}>
                            Would you like to join us as a valued monthly supporter by converting your {currencySymbol}{donationAmountValue} contribution into a monthly gift.
                            <br />
                            <br />
                            <b>
                                Monthly donations help us
                                make a long lasting impact.
                            </b>
                        </Typography.Text>

                        <Flex vertical gap={token.sizeSM}>
                            <Button
                                block
                                size="large"
                                type="primary"
                                onClick={() => {
                                    setSelectedSegment('regular');
                                    handleNextStep();
                                    setDonationAmountValue(donationAmountValue / 3)
                                }}
                                style={{ background: token.colorError }}
                                icon={<GiftFilled
                                    className="pulse-animation"
                                    style={{ color: 'white' }}
                                />}
                            >
                                Donate {currencySymbol}${Math.floor(donationAmountValue / 3)} per month
                            </Button>

                            <Button
                                block
                                size="large"
                                type="primary"
                                onClick={() => {
                                    setSelectedSegment('regular');
                                    handleNextStep();
                                    setDonationAmountValue(donationAmountValue / 2)
                                }}
                                icon={<HeartFilled
                                    className="pulse-animation"
                                    style={{ color: 'white' }}
                                />}
                            >
                                Donate {currencySymbol}{donationAmountValue / 2} per month
                            </Button>

                            <Button
                                block
                                size="large"
                                onClick={() => {
                                    { donationAmountValue <= 100 && setIsAdminFeeChecked(true) }
                                    handleNextStep()
                                }}

                            >
                                Donate {currencySymbol}{donationAmountValue} as one-off
                            </Button>
                        </Flex>
                    </Flex>
                )}

                {/* if allowRegular==false, don't upsell for monthy */}
                {currentStep === 2 && !allowRegular && (() => { handleNextStep(); return null; })()}

                {/* if one-off donation is more than 100, don't upsell for monthy */}
                {currentStep === 2 && donationAmountValue > 100 && (() => { handleNextStep(); return null; })()}

                {/* if donation is 100 or less, offer monthly giving plan */}
                {currentStep === 2 && selectedSegment === 'regular' && (() => { handleNextStep(); return null; })()}


                {currentStep === 3 && (
                    <Flex gap={token.sizeMD} style={{ width: '100%', minHeight: height }} vertical>
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
                                    style={{ borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0px 0px`, marginBottom: '-1px', }}
                                    size="large"
                                    placeholder="First Name"
                                />
                                <Input
                                    style={{ borderRadius: `0px 0px ${token.borderRadius}px ${token.borderRadius}px ` }}
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
                                    style={{ width: 120 }}
                                    size="large"
                                    placeholder=""
                                />
                            </div>
                            <Checkbox>Subscribe to receive updates from our charity</Checkbox>
                            <Checkbox>I agree with <a>terms and condition</a></Checkbox>
                        </Flex>
                        <Flex gap={token.sizeSM} style={{ marginTop: 'auto' }}>
                            <Button
                                size="large"
                                // type='text'
                                icon={<LeftOutlined />}
                                // onClick={handlePreviousStep}
                                onClick={() => {
                                    setDonationAmountValue(Math.floor(donationAmountValue))
                                    setCurrentStep(1)
                                }}
                            />

                            <Button
                                block
                                size="large"
                                type="primary"
                                // onClick={handleNextStep}
                                onClick={() => {
                                    handleNextStep();
                                    { donationAmountValue <= 100 && setIsAdminFeeChecked(true) }
                                }}
                            >
                                Continue
                            </Button>
                        </Flex>
                    </Flex>
                )}

                {/* if user is logged in, then skip asking name and email step */}
                {currentStep === 3 && isLoggedIn && (() => { handleNextStep(); { donationAmountValue <= 100 && setIsAdminFeeChecked(true) } ; return null; })()}

                {currentStep === 4 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: height }} vertical>

                        <Flex vertical gap={0} style={{ marginBottom: 'auto' }}>

                            <Tooltip
                                open={donationAmountValue > 100 && isAdminFeeChecked === false && true}
                                placement='right'
                                title="Would you like to cover administration fee so that 100% of your gift will fund the project?">
                                <Badge.Ribbon
                                    text={<>{isAdminFeeChecked && feePercentageSliderValue > 9 && <HeartFilled className="pulse-animation" style={{ color: 'white' }} />}&nbsp;&nbsp;Hooray!</>}
                                    style={{ zIndex: 10, top: 4, padding: '4px 8px', visibility: `${isAdminFeeChecked && feePercentageSliderValue > 9 && 'visible' || 'hidden'}` }}>
                                    <div>
                                        <CheckCard
                                            avatar="https://images.pexels.com/photos/6289064/pexels-photo-6289064.jpeg?auto=compress&cs=tinysrgb&w=200"
                                            style={{ display: 'flex', flex: 1, width: '100%', paddingBottom: `${isAdminFeeChecked && '24px' || 'unset'}` }}
                                            title={"Cover Our Fee" + ` ${currencySymbol}${(donationAmountValue * (feePercentageSliderValue / 100)).toFixed(2)}`
                                                + `${isAdminFeeChecked && ` ` || ` ?`}`}
                                            // + `${isAdminFeeChecked && feePercentageSliderValue > 20 && `Thank you!` || `` }` }
                                            // description="Help us pay the processing & platform fee"
                                            description="Help us pay the processing & platform fee"
                                            onChange={
                                                (checked) => { console.log('checked', checked); setIsAdminFeeChecked(checked); }
                                            }
                                            defaultChecked={donationAmountValue <= 100 && true}
                                            extra={isAdminFeeChecked && <CheckCircleFilled style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, padding: token.sizeXXS, background: token.colorPrimaryBg, fontSize: token.sizeLG, color: token.colorPrimary }} />
                                            }
                                        />

                                        <Slider
                                            style={{
                                                position: 'absolute',
                                                bottom: 30, left: '5%',
                                                width: '90%',
                                                margin: 'auto',
                                                visibility: `${isAdminFeeChecked && 'visible' || 'hidden'}`
                                            }}
                                            tooltip={{ formatter }}
                                            defaultValue={feePercentageSliderValue}
                                            min={3}
                                            max={28}
                                            onChange={setFeePercentageSliderValue} />
                                    </div>
                                </Badge.Ribbon>
                            </Tooltip>

                            {/* upsell */}
                            {allowUpsell &&
                                <CheckCard
                                    avatar={upsellItemImgUrl}
                                    style={{ display: 'flex', flex: 1, width: '100%' }}
                                    // title="Help Gaza Emergency "
                                    title={<>{upsellItemTitle} -&nbsp;{currencySymbol}{upsellItemValue}</>}
                                    description={upsellItemDescription}
                                    extra={isUpsellChecked && <CheckCircleFilled style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, padding: token.sizeXXS, background: token.colorPrimaryBg, fontSize: token.sizeLG, color: token.colorPrimary }} />
                                            }
                                    onChange={
                                        (checked) => { 
                                            console.log('checked', checked); 
                                            setIsUpsellChecked(checked);
                                            if (checked == true) {
                                                setDonationAmountValue(donationAmountValue+upsellItemValue)
                                            } else
                                            {
                                                setDonationAmountValue(donationAmountValue-upsellItemValue)
                                            }
                                        }
                                    }
                                />
                            }

                            {/* gift aid */}
                            {allowGiftAid &&
                            <Tooltip trigger='hover' placement='right' open={!isGiftAidChecked}
                                title={
                                    <>
                                    If you are a UK Taxpayer, we can claim an extra 25p for every £1 you give!<br />
                                    <a href='https://www.gov.uk/donating-to-charity/gift-aid'
                                        target='blank' style={{ fontWeight: '600', lineHeight: 2.5, color: 'white'}}>
                                        <LinkOutlined />&nbsp;<u>Learn more</u>
                                    </a>
                                    </>
                                }>
                                <CheckCard
                                    avatar="https://res.cloudinary.com/rn3o/image/upload/v1716480041/gift-aid-it-subtle-grey-bg_hyjg9q.svg"
                                    style={{ display: 'flex', flex: 1, width: '100%' }}
                                    title="Gift Aid my donation"
                                    // description="Boost gift by 25% at no extra cost!"
                                    onChange={
                                        (checked) => { 
                                            console.log('checked', checked);
                                            setIsGiftAidChecked(checked)
                                        }
                                    }
                                    extra={isGiftAidChecked && <CheckCircleFilled style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, padding: token.sizeXXS, background: token.colorPrimaryBg, fontSize: token.sizeLG, color: token.colorPrimary }} />
                                            }
                                    description={
                                            <>
                                            Boost gift by 25% at no extra cost!
                                            { isGiftAidChecked &&
                                            <Tag bordered={false} color="success" icon={<CheckCircleFilled />} style={{ width: 'auto', marginTop: token.sizeSM}}>
                                                Gift Aid value: 
                                                {isAdminFeeChecked ?
                                                <> {currencySymbol}{(donationAmountValueWithFee/4).toFixed(2)} </>
                                                :
                                                <> {currencySymbol}{(donationAmountValue/4).toFixed(2)} </>
                                                }
                                            </Tag>
                                            }
                                            </>}
                                />
                            </Tooltip>
                            }
                        </Flex>

                        <Typography.Title level={5} style={{ fontFamily: 'inherit', textAlign: 'center', marginTop: 0 }}>
                            Your donation: <br />
                            &nbsp;
                            {/* {currencySymbol}{donationAmountValue} {selectedSegment === 'regular' && "/month" || null}  */}
                            <Typography.Title level={1} style={{ fontFamily: 'inherit', textAlign: 'center', marginTop: 0, fontWeight: 700 }}>
                                {currencySymbol}
                                {isAdminFeeChecked ? ((donationAmountValueWithFee).toFixed(2)) : ((donationAmountValue).toFixed(2))}
                                {selectedSegment === 'regular' && "/month" || null}
                            </Typography.Title>
                        </Typography.Title>


                        <Flex vertical gap={token.sizeSM} style={{ marginTop: 'auto' }}>

                            <Button
                                block
                                size="large"
                                type="primary"
                                onClick={handleNextStep}
                                icon={<CreditCardOutlined />}
                            >
                                Pay with Credit/Debit Card
                            </Button>

                            {selectedSegment === 'regular' ? (
                                <Button
                                    block
                                    size="large"
                                    type="primary"
                                // onClick={handleNextStep}
                                >
                                    Set up Direct Debit
                                </Button>
                            ) : (
                                <>
                                    {/* google pay */}
                                    <Button
                                        block
                                        size="large"
                                        type="primary"
                                        // onClick={handleNextStep}
                                        style={{ background: 'black' }}
                                    >
                                        <img height={25} src="https://res.cloudinary.com/rn3o/image/upload/v1716372043/gpay_bljz0a.png" />
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

                                    {/* paypal */}
                                    <Button
                                        block
                                        size="large"
                                        type="primary"
                                        // onClick={handleNextStep}
                                        style={{ background: '#ffc439' }}
                                    >
                                        <img height={22} src="https://res.cloudinary.com/rn3o/image/upload/v1716372594/paypal_jilpym.png" />
                                    </Button>
                                </>
                            )}

                            {!isLoggedIn ?
                                <Button
                                    block
                                    size="large"
                                    type='text'
                                    icon={<LeftOutlined />}
                                    // onClick={handlePreviousStep}
                                    onClick={() => {
                                        handlePreviousStep();
                                    }}
                                    style={{ fontSize: 'smaller' }}
                                >
                                    Change my detail
                                </Button>
                                :
                                <Button
                                    block
                                    size="large"
                                    type='text'
                                    icon={<LeftOutlined />}
                                    // onClick={handlePreviousStep}
                                    onClick={() => {
                                        setCurrentStep(1);
                                        setIsAdminFeeChecked(false)
                                        setIsGiftAidChecked(false)
                                        setIsUpsellChecked(false)
                                        setFeePercentageSliderValue(4)
                                    }}
                                    style={{ fontSize: 'smaller' }}
                                >
                                    Change amount
                                </Button>
                            }

                        </Flex>
                    </Flex>
                )}

                {currentStep === 5 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: height }} vertical>
                        <Button
                            block
                            size="large"
                            type='text'
                            icon={<LeftOutlined />}
                            onClick={() => {
                                handlePreviousStep()
                                // setIsAdminFeeChecked(false)
                                }}
                            style={{ fontSize: 'smaller' }}
                        >
                            Change Payment Option
                        </Button>

                        <Typography.Text style={{ fontFamily: 'inherit', fontSize: token.sizeMS, textAlign: 'center', padding: token.sizeMD }}>
                            Please enter your card details to complete your donation.
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
                                suffix={<CreditCardOutlined style={{ opacity: 0.3 }} />}
                            />
                        </div>
                        <Flex>

                            <Input
                                style={{ borderRadius: `${token.borderRadius}px 0px 0px ${token.borderRadius}px` }}
                                size="large"
                                placeholder="MM / YY"
                            />
                            <Input
                                style={{ borderRadius: `0px ${token.borderRadius}px ${token.borderRadius}px 0px`, marginLeft: '-1px', }}
                                size="large"
                                placeholder="CVC"
                            />
                        </Flex>



                        <Button
                            block
                            style={{ marginTop: 'auto' }}
                            size="large"
                            type="primary"
                            onClick={handleNextStep}
                        >
                            Pay &nbsp;
                            {currencySymbol}
                            {isAdminFeeChecked ? ((donationAmountValueWithFee).toFixed(2)) : ((donationAmountValue).toFixed(2))}
                            {selectedSegment === 'regular' && "/month" || null}
                        </Button>
                    </Flex>
                )}

                {currentStep === 6 && (
                    <Flex gap={token.sizeSM} style={{ width: '100%', minHeight: height }} vertical>

                        <Typography.Title level={5} style={{ fontFamily: 'inherit', textAlign: 'center' }}>
                            Thanks for donation, you will receive an email confirmation soon.
                        </Typography.Title>

                        <img src="https://res.cloudinary.com/rn3o/image/upload/v1716379834/send-message_h2erlx.svg" />
                        <Button
                            style={{ marginTop: 'auto' }}
                            block
                            size="large"
                            onClick={() => {
                                setDonationAmountValue(Math.floor(donationAmountValue))
                                setFeePercentageSliderValue(4)
                                setIsAdminFeeChecked(false)
                                setCurrentStep(1)
                            }}
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
