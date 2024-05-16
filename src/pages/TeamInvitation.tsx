import React, { useContext } from 'react';
import { Flex, Typography, Card, Avatar, theme, Input, Button, Divider } from 'antd';
import {
  FolderOutlined,
  ShareAltOutlined,
  UserOutlined,
  PlusOutlined,
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
  AppleFilled,
  GoogleOutlined,
} from '@ant-design/icons';
import { AppLogoContext } from '../App';

const { Text, Link } = Typography;


const TeamInvitation: React.FC = () => {

  const { token } = theme.useToken();
  const appLogo: string | undefined = useContext(AppLogoContext);

  // if (!appLogo) {
  //   // Handle the case where appLogo is not defined
  //   return <Flex vertical align='center'> <Avatar /> </Flex>; // no logo to display, should come from main app 
  // }

  return (
    <Flex vertical align='center' justify='space-between' style={{ height: '80vh' }}>
      <Card bordered={false} style={{ width: '100%', maxWidth: 360, marginTop: 100 }}>
        <Flex vertical align='center'>
          <Avatar size={'large'} src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80' /><br />
          <Text style={{ textAlign: 'center' }}>Ryan is inviting you to team up with
            <br /><b>Safa Springs Academy</b></Text>
        </Flex>
      </Card>

      <Card hoverable bordered={false} style={{ width: '100%', maxWidth: 360, cursor: 'default' }}>
        <Flex vertical align='center' gap={token.sizeSM}>
            <Typography.Title level={3}>Sign In to Accept Invitation</Typography.Title>
            <Typography.Text type="secondary">Enter your email to receive a one-time login link</Typography.Text>

          <Flex vertical gap={token.sizeXS} style={{ width: '100%'}}>
            <Typography.Title level={5} style={{ marginBottom: 0, padding: 0}}>Email</Typography.Title>
            <Input
              size="large"
              placeholder="name@example.com"
            />
            <Button type='primary' size='large' style={{ width: '100%' }}>Sign In</Button>
          </Flex>
          <Divider >Or Connect with</Divider>
          
          <Flex justify='space-between' style={{ width: '100%'}}>
            <Button style={{ padding: token.sizeXL}} size='large' icon={<GoogleOutlined style={{ fontSize: '24px'}} />}/>
            <Button style={{ padding: token.sizeXL}} size='large' icon={<FacebookFilled style={{ fontSize: '24px'}} />}/>
            <Button style={{ padding: token.sizeXL}} size='large' icon={<AppleFilled style={{ fontSize: '24px'}} />}/>
            <Button style={{ padding: token.sizeXL}} size='large' icon={<LinkedinFilled style={{ fontSize: '24px'}} />}/>
          </Flex>
        </Flex>
      </Card>

      <Flex align='center'>
        <img
          src={appLogo || 'https://framerusercontent.com/images/jHJJtoi1lAZTFGfJvCtM70gp4.png'}
          style={{ height: 40 }}
        />
      </Flex>


    </Flex>
  );
};

export default TeamInvitation;

