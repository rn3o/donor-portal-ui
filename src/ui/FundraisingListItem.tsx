import React from 'react';
import { Card, Progress, Flex, theme, Button } from 'antd';

import { ShareAltOutlined } from '@ant-design/icons';

import { css } from '@emotion/css';

interface FundraisingListItemProps {
  name: string;
  imgUrl: string;
  completionPercent: number;
  supporterCount: number;
  amountRaised: string;
  target: string;
  dayLeft: number;
}

export const FundraisingListItem: React.FC<FundraisingListItemProps> = ({
  name,
  imgUrl,
  supporterCount,
  completionPercent,
  amountRaised,
  target,
  dayLeft,
}) => {
  const { token } = theme.useToken();
  const isMobile = window.innerWidth < 600;

  return (
    <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }}
    className={css`&{

      border-right: 0px solid ${token.colorPrimary};
      transition: all 0.25s ease-out;
    }
    &:hover {
      // background-color: ${token.colorPrimaryBgHover}15;
      border-right: 2px solid ${token.colorPrimary};
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
            height: 180,
            width: isMobile ? '100%' : '180px',
            objectFit: 'cover',
            borderRadius: token.borderRadius,
            // objectPosition: 'center',
          }}
        />
        {/* </Flex> */}

        <Flex
          gap={token.sizeMD}
          wrap="wrap"
          style={{ flex: 1, padding: token.sizeSM }}
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
            >
              {name}
            </Flex>

            <Flex gap={token.sizeXS}>
              <Button type="text" icon={<ShareAltOutlined />}>
                Share
              </Button>
              <Button>Edit</Button>
            </Flex>
          </Flex>

          <Flex
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{
              flex: 1,
              padding: token.sizeSM,
              background: token.colorBgTextHover,
              borderRadius: token.borderRadius,
            }}
          >
            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {supporterCount} Supporters
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >{`${completionPercent}% Collected`}</div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {amountRaised} / {target}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >{`${dayLeft} Days left`}</div>
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

export default FundraisingListItem;
