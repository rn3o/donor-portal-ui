import React from 'react';
import { Card, Progress, Flex, theme, Button, Tooltip, Divider, Avatar } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom'; 

interface FundraisingTeamMemberListItemProps {
  pageTitle: string;
  fundraiserName: string,
  fundraiserAvatarURL: string,
  imgUrl: string;
  completionPercent: number;
  amountRaised: string;
  supporterCount: number;
  dayLeft: number;
  target: string;
}

export const FundraisingTeamMemberListItem: React.FC<FundraisingTeamMemberListItemProps> = ({
  pageTitle,
  fundraiserName,
  fundraiserAvatarURL,
  imgUrl,
  supporterCount,
  amountRaised,
  completionPercent,
  dayLeft
}) => {
  const { token } = theme.useToken();
  const isMobile = window.innerWidth < 600;

  const navigate = useNavigate(); // Initialize useNavigate


  return (
    <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden', maxWidth: isMobile ? '100%' : '288px',  }, }}
    className={css`&{  
      border-right: 0px solid ${token.colorPrimary};
      transition: all 0.25s ease-out;
    }
    &:hover {
      // background-color: ${token.colorPrimaryBgHover}15;
    //   border-right: 2px solid ${token.colorPrimary};
    //   border-right: 2px solid ${token.colorPrimary};
    //   box-shadow: inset -2px 0 0px -0px ${token.colorPrimary};
    }
  `}
>
      <Flex
        gap={token.sizeXXS}
        wrap="wrap"
        justify="space-between"
        align="center"
        style={{ flex: 1 }}
      >
        <img
          src={imgUrl}
          style={{
            height: 160,
            width: '100%' ,
            // width: isMobile ? '100%' : '180px',
            objectFit: 'cover',
            borderRadius: token.borderRadius,
            // objectPosition: 'center',
          }}
        />
        {/* </Flex> */}

        <Flex
          gap={token.sizeMD}
          wrap="wrap"
          style={{ flex: 1, padding: token.sizeSM}}
          vertical
        >
          <Flex
            gap={token.sizeSM}
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{ flex: 1 }}
          >
            <Flex
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                flex: 1,
                width: '70%',
              }}
              gap={token.sizeXS}
              vertical
            >
              <Flex align='end' gap={token.sizeXS} style={{ marginTop: -`${token.sizeXL}` }}>
                <Avatar src={fundraiserAvatarURL} size={token.sizeXXL} icon={<UserOutlined />} /> 
                {fundraiserName}
              </Flex>
              <Divider style={{ margin: 2}} />
              <div style={{ maxHeight: 30}}>
                {pageTitle}
              </div>
            </Flex>

          </Flex>

          <Flex
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{
              flex: 1,
              padding: token.sizeSM,
            //   background: `${token.colorPrimaryBgHover}25`,
              background: token.colorBgTextHover,
              borderRadius: token.borderRadius,
            }}
          >
            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {supporterCount}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >
                {/* {`${completionPercent}% Collected`} */}
                Supporters
              </div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {dayLeft}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >days left</div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {amountRaised}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >
                {/* {`${dayLeft} Days left`} */}
                Total Funded
                </div>
            </Flex>

            <Progress
              strokeColor={token.colorPrimary}
              percent={completionPercent}
              showInfo={false}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FundraisingTeamMemberListItem;
