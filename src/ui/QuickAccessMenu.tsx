import { css } from '@emotion/css';
import { Flex, Popover, theme, Divider, Typography } from 'antd';
import React, { useState, useEffect, Children, Component } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  UserAddOutlined,
  TeamOutlined,
  FileAddOutlined,
  HeartOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import CreateAccountDrawer from './CreateAccountDrawer';

const { Title, Text } = Typography;

const QuickAccessMenu: React.FC = () => {
  const { token } = theme.useToken();

  const [isAccountDrawerOpen, setAccountDrawerOpen] = useState(false); // State to manage the visibility of the drawer

  const openAccountDrawer = () => {
    setAccountDrawerOpen(true);
  };

  const closeAccountDrawer = () => {
    setAccountDrawerOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Popover
        placement="rightTop"
        overlayStyle={
          {
            // width: 'calc(100vw - 24px)',
            // paddingTop: 8,
            // height: '307px',
          }
        }
        content={
          <div
            style={{
              display: 'flex',
              gap: '16px',
              margin: '-8px',
            }}
          >
            {/* <div style={{ flex: 1 }}>

            </div> */}

            <div
              style={{
                gap: '16px',
                minWidth: '160px',
              }}
            >
              {quickMenuItems.map((item, index) => {
                if (React.isValidElement(item)) {
                  // If it's a React element (like Divider), just return it
                  return React.cloneElement(item, { key: `divider_${index}` });
                } else {
                  // Otherwise, it's an object with name and icon
                  const menuItem = item as quickMenuItem;
                  return (
                    <div
                      key={index}
                      className={css`
                      border-radius: 4px;
                      padding: 8px 12px;
                      display: flex;
                      cursor: pointer;
                      &:hover {
                        background-color: ${token.colorBgTextHover};
                      }
                    `}
                      onClick={() => {
                        if (menuItem.name === 'Account') {
                          openAccountDrawer();
                        }
                      }}
                    >
                      {menuItem.icon}
                      <Flex
                        align="center"
                        style={{
                          marginInlineStart: 14,
                        }}
                      >
                        <div
                          className={css`
                          font-size: 14px;
                          color: ${token.colorText};
                          line-height: 22px;
                        `}
                        >
                          {menuItem.name}
                        </div>
                      </Flex>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'stretch',
            // flex: '1',
            opacity: 0.2,
            // background: 'blue',
            height: '40px',
            position: 'absolute',
            left: 12,
            right: 12,
            // top: 16,
            // bottom: 16,
          }}
        ></div>
      </Popover>

      {/* Render the CreateAccountDrawer component */}
      <CreateAccountDrawer
        visible={isAccountDrawerOpen}
        onClose={closeAccountDrawer}
      />
    </div>
  );
};

export default QuickAccessMenu;

interface quickMenuItem {
  name: string;
  icon: JSX.Element;
}

const quickMenuItems: (quickMenuItem | JSX.Element)[] = [
  { name: 'Donate', icon: <HeartOutlined /> },
  <Divider key="divider1" style={{ margin: '4px 0' }} />,
  { name: 'Make regular giving', icon: <SyncOutlined />},
  { name: 'Sponsor a child', icon: <UserOutlined /> },
  { name: 'Sponsor a student', icon: <UserOutlined /> },
  { name: 'Sponsor a family', icon: <TeamOutlined /> },
  { name: 'Create a pledge', icon: <FileAddOutlined /> },
  <Divider key="divider1" style={{ margin: '4px 0' }} />,
  { name: 'Support a Campaign', icon: <FileAddOutlined /> },
  <Divider key="divider1" style={{ margin: '4px 0' }} />,
  { name: 'Start a Fundraising Page', icon: <FileAddOutlined /> },
  // { name: 'Task', icon: <FileAddOutlined /> },
];
