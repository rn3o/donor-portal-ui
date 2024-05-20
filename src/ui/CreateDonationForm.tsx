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

    const [donationAmountValue, setDonationAmountValue] = useState();

    // Segmented
    const [selectedSegment, setSelectedSegment] = useState('Give Once');

    const handleSegmentChange = (value: string) => {
        setSelectedSegment(value);
    };

    const handleAmountOption = (value) => {
        setDonationAmountValue(value)
    };

    const amountOptionStyle = {
        display: 'flex', 
        justifyContent: 'center',
    }
    const amountTitle = {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: token.sizeLG,
    }

    return (
        <Card bordered={false} style={{ width: '400px' }}>
            <Flex
                gap={token.sizeXL}
                wrap="wrap"
                justify="space-between"
                align="center"
                vertical
                style={{ width: '100%' }}
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

                    {selectedSegment === 'Give Once' && (
                    <CheckCard.Group
                        onChange={(value) => handleAmountOption(value)}
                        defaultValue=""
                    >
                        <Flex>
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£700</div>} value="700" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£500</div>} value="500" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£300</div>} value="300" />
                        </Flex>
                        <Flex>
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£200</div>} value="200" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£100</div>} value="100" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£50</div>} value="50" />
                        </Flex>
                    </CheckCard.Group>)}
                    {selectedSegment === 'Monthly' && (
                    <CheckCard.Group
                        onChange={(value) => handleAmountOption(value)}
                        defaultValue=""
                    >
                        <Flex>
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£100</div>} value="100" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£75</div>} value="75" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£50</div>} value="50" />
                        </Flex>
                        <Flex>
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£30</div>} value="30" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£10</div>} value="10" />
                            <CheckCard style={amountOptionStyle} title={<div style={amountTitle}>£5</div>} value="5" />
                        </Flex>
                    </CheckCard.Group>)}

                    <InputNumber<number>
                        // style={{display: 'flex', width: '100%', height: 48}}
                        className='embed-donation-form'
                        size="large"
                        prefix="£"
                        value={donationAmountValue}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        required
                        addonAfter={<><Select
                            defaultValue="GBP"
                            // variant='borderless'
                            style={{ width: 100, zIndex: 1 }}
                            // onChange={handleChange}
                            options={[
                              { value: 'GBP', label: 'GBP' },
                              { value: 'USD', label: 'USD' },
                            ]}
                          /> </>}
                    />
                </div>

                

                <Button block size="large" icon={<FileOutlined />} type="primary">
                    Checkout
                </Button>
            </Flex>
        </Card>
    );
};

export default CreateDonationForm;
