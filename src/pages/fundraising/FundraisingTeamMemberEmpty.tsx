import { useGlobalState } from './../../GlobalProvider';

import React, { useState } from 'react';
import { Flex, Button, Result, theme, Modal, Select, Typography, message, Input, Divider } from 'antd';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined, MailOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons';


const FundraisingTeamMemberEmpty: React.FC = () => {
    const { isEmpty } = useGlobalState();
    const { token } = theme.useToken();
    const navigate = useNavigate();

    const inviteFundraiser = () => {
        navigate('/fundraising/teams/invite-member');
    };

    const goToTeams = () => {
        navigate('/fundraising/teams');
    };



    return (
        <PageContainer
            header={{
                title: 'Safa Spring Academy',
                breadcrumb: {
                    items: [
                        {
                            title: 'Fundraising',
                        },
                        {
                            title: 'Teams',
                        },
                        {
                            title: 'Fundraisers',
                        },
                    ],
                },
            }}
            extra={[
                <Button type="text" key="2" onClick={goToTeams}>
                    <ArrowLeftOutlined /> Back to Teams
                </Button>,
                <InviteModal />
                // <Button key="1" onClick={inviteFundraiser}>
                //   Invite others to join
                // </Button>,
            ]}
            // subTitle="Simple Description"
            style={{ width: '100%', margin: 'auto', maxWidth: '800px' }}
        >
            <ProCard
                style={
                    {
                        // height: '80vh',
                        // minHeight: 600,
                        // paddingBottom: 40,
                    }
                }
            >
                <Flex align="center" vertical>
                    <Result
                        // status="404"
                        icon={
                            <img src="https://res.cloudinary.com/rn3o/image/upload/v1714642400/empty-no-team_gmualx.svg" />
                        }
                        title="Let's team up!"
                        subTitle={
                            <>
                                No Member yet
                            </>
                        }
                        extra={
                            <InviteModal />
                        }
                    />
                </Flex>
            </ProCard>
        </PageContainer>
    );
};

export default FundraisingTeamMemberEmpty;



const InviteModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
        setIsModalOpen(false);
    };

    return (
        <>
            <Button key="1" onClick={showModal}>
                Invite others to join
            </Button>
            <Modal title="Invite other to fundraise for Firdaus Fields School" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        type="primary"
                        onClick={handleInvite}
                        disabled={emails.length === 0}
                    >
                        Send Invites
                    </Button>
                ]}
            >

                <Typography.Title level={5}>Share a link to send your invites</Typography.Title>

                <CopyInput />


                <Divider style={{ marginTop: 30 }}>OR</Divider>


                <Typography.Title level={5}>Invites via Email Addresses</Typography.Title>

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
                </Select>

                <Typography.Text type="secondary">Add email addresses, separate by commas (,) to add multiple.</Typography.Text>


            </Modal>
        </>
    );
};

const CopyInput: React.FC = () => {
    const inputValue = 'https://teamup.xyz.org/234234'; // Default value

    const handleCopy = () => {
        const inputElement = document.getElementById('copy-input') as HTMLInputElement;
        inputElement.select();
        document.execCommand('copy');
        message.success('Copied to clipboard');
    };

    return (
        <Input
            id="copy-input"
            defaultValue={inputValue}
            suffix={
                <Button
                    // type="text"
                    icon={<CopyOutlined />}
                    onClick={handleCopy}
                >Copy</Button>
            }
            readOnly
        />
    );
};



