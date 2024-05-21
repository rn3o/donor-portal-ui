import React, { useState } from 'react';
import {
    Card,
    Button,
    theme,
    Flex,
    Segmented,
    InputNumber,
    Select
} from 'antd';
import { CalendarOutlined, FileOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';

const CreateDonationForm: React.FC = () => {
    const { token } = theme.useToken();

    const [donationAmountValue, setDonationAmountValue] = useState<number>();
    const [selectedCurrency, setSelectedCurrency] = useState<string>('gbp');
    const [currencySymbol, setCurrencySymbol] = useState<string>('£');
    const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);

    // Segmented
    const [selectedSegment, setSelectedSegment] = useState<string>('Give Once');

    const handleSegmentChange = (value: string) => {
        setSelectedSegment(value);
    };

    const handleAmountOption = (value: number) => {
        setDonationAmountValue(value);
        setSelectedAmount(value);
    };

    const handleChangeCurrency = (value: string) => {
        setSelectedCurrency(value);

        // Update currency symbol based on selected currency
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
        // <Card bordered={false} style={{ width: '400px' }}>
        <Card bordered={false} style={{ width: '100%' }}>
            <Flex
                gap={token.sizeXL}
                wrap="wrap"
                justify="space-between"
                align="center"
                vertical
                // style={{ width: '100%' }}
                style={{ minWidth: 260, maxWidth: 400 }}
            >
                <Flex style={{ flex: '1 0 0', width: '100%' }}>

                    <Segmented
                        style={{ width: '100%', fontWeight: 600 }}
                        block
                        size='large'
                        options={[
                            {
                                label: 'Give Once',
                                value: 'Give Once',
                            },
                            {
                                label: 'Monthly',
                                value: 'Monthly',
                                icon: <CalendarOutlined />
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
                        style={{ color: token.colorPrimary}}
                        size="large"
                        prefix={<div style={{fontSize: token.sizeMD}}>{currencySymbol}</div>}
                        suffix={<div style={{fontSize: token.sizeMD, marginRight: token.sizeMS}}>{selectedSegment === 'Monthly' && "/month" || null} </div>}
                        value={donationAmountValue}
                        onChange={handleInputChange}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        required
                        addonBefore={<Select
                            defaultValue="gbp"
                            style={{ width: 92, zIndex: 1 }}
                            onChange={handleChangeCurrency}
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
                    type="primary">
                    Donate
                </Button>
            </Flex>
        </Card>
    );
};

export default CreateDonationForm;
