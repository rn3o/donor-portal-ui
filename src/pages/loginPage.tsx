import React, { useState, useContext } from 'react';
import { Flex, Typography, Card, Avatar, theme, Input, Button, Divider } from 'antd';
import {
  FacebookFilled,
  LinkedinFilled,
  AppleFilled,
  GoogleOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { AppLogoContext } from '../App';

const { Text, Link } = Typography;


const LoginPage: React.FC = () => {

  const { token } = theme.useToken();
  const appLogo: string | undefined = useContext(AppLogoContext);

  // if (!appLogo) {
  //   // Handle the case where appLogo is not defined
  //   return <Flex vertical align='center'> <Avatar /> </Flex>; // no logo to display, should come from main app 
  // }

  const [signInAttempted, setSignInAttempted] = useState(false);

  const handleSignIn = () => {
    setSignInAttempted(true);
    // Here you can add additional logic for sign-in attempt
  };

  return (
    <Flex vertical align='center' justify='space-around' gap={token.sizeXL} style={{ minHeight: '90vh'}}>
      {!signInAttempted ? (
        <Card hoverable bordered={false} style={{ width: '100%', maxWidth: 360, cursor: 'default' }}>
          <Flex vertical align='center' gap={token.sizeSM}>
          <Flex align='center' vertical>
        <img
          src={appLogo || 'https://framerusercontent.com/images/jHJJtoi1lAZTFGfJvCtM70gp4.png'}
          style={{ height: token.sizeXL }}
        />
      </Flex>
            <Typography.Title level={3} style={{ textAlign: 'center' }}>Sign In </Typography.Title>
            <Typography.Text type="secondary">Enter your email for a one-time login link</Typography.Text>

            <Flex vertical gap={token.sizeXS} style={{ width: '100%' }}>
              <Typography.Title level={5} style={{ marginBottom: 0, padding: 0 }}>Email</Typography.Title>
              <Input
                size="large"
                placeholder="name@example.com"
              />
              <Button type='primary' size='large' style={{ width: '100%' }} onClick={handleSignIn}>Sign In</Button>
            </Flex>
            <Divider >Or sign in with </Divider>

            <Flex justify='space-around' style={{ width: '100%', paddingBottom: token.sizeSM }}>
              <Button style={{ padding: token.sizeLG }} icon={<GoogleOutlined style={{ fontSize: token.sizeLG }} />} />
              <Button style={{ padding: token.sizeLG }} icon={<FacebookFilled style={{ fontSize: token.sizeLG }} />} />
              <Button style={{ padding: token.sizeLG }} icon={<AppleFilled style={{ fontSize: token.sizeLG }} />} />
              <Button style={{ padding: token.sizeLG }} icon={<LinkedinFilled style={{ fontSize: token.sizeLG }} />} />
            </Flex>
          </Flex>
        </Card>
      ) :
        (
          <Card hoverable bordered={false} style={{ width: '100%', maxWidth: 360, cursor: 'default', textAlign: 'center' }}>
            <CheckCircleFilled style={{ fontSize: token.sizeLG, color: token.colorPrimary }}/><br /><br />
            Please check your email<br />for the login link.
          </Card>
        )
      }
    </Flex>
  );
};

export default LoginPage;

