import React from 'react';
import { Card, Progress, Flex, theme, Button, Tooltip } from 'antd';

import { ShareAltOutlined } from '@ant-design/icons';

import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom'; 

interface FundraisingTeamListItemProps {
  name: string;
  imgUrl: string;
  completionPercent: number;
  amountRaised: string;
  teamMember: number,
  supporterCount: number;
  target: string;
  dayLeft: number;
  isOwner: boolean; 
  pageRoute: string; 

}

export const FundraisingTeamListItem: React.FC<FundraisingTeamListItemProps> = ({
  name,
  imgUrl,
  supporterCount,
  amountRaised,
  teamMember,
  isOwner, // Destructure isOwner prop
  pageRoute, // Destructure pageRoute prop
}) => {
  const { token } = theme.useToken();
  const isMobile = window.innerWidth < 600;

  const navigate = useNavigate(); // Initialize useNavigate

  const seeFundraisers = () => {
    navigate(pageRoute); // Navigate to the specified route when the button is clicked
  };

  return (
    <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }}
    className={css`&{
        

      border-right: 0px solid ${token.colorPrimary};
      transition: all 0.25s ease-out;
    }
    &:hover {
      // background-color: ${token.colorPrimaryBgHover}15;
    //   border-right: 2px solid ${token.colorPrimary};
      border-right: 2px solid ${token.colorPrimary};
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
            height: 186,
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
              <Button type="text" icon={<Tooltip title="Share"><ShareAltOutlined /></Tooltip>} />
              {isOwner ? (<Button>Edit Page</Button>)
              :
              (<Tooltip title="You are not an organiser of this team"><Button disabled>Edit Page</Button></Tooltip>)
                } {/* Render Edit Page button based on isOwner prop */}
              <Button onClick={seeFundraisers}>See Fundraisers</Button> {/* Call seeFundraisers function on click */}
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
                Total Supporters
              </div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {teamMember}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >Fundraisers</div>
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

            {/* <Progress
              strokeColor={token.colorPrimary}
              percent={completionPercent}
              showInfo={false}
            /> */}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FundraisingTeamListItem;
