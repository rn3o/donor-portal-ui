import { useGlobalState } from './../GlobalProvider';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import { Card, Progress, Flex, theme, Divider } from 'antd';
import { css } from '@emotion/css';

import { ArrowRightOutlined } from '@ant-design/icons';

const CardFundraisingSummary: React.FC = () => {
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const goToPage = () => {
    navigate('/fundraising/pages');
  };

  return (
    <Card bordered={false} title="Fundraising" style={{ padding: 0 }}>
      <Flex
        gap={token.sizeXXS}
        wrap="wrap"
        vertical
        style={{ margin: `-${token.sizeLG}px 0` }}
      >
        {mockData.map((data, index) => (
          <FundraisingListItem
            key={index}
            imgUrl={data.imgUrl}
            name={data.title}
            completionPercent={data.progress}
            amountRaised={data.fundraised}
            target={data.target}
            dayLeft={data.dayLeft}
          />
        ))}
      </Flex>

      <Divider />
      <Card
          bordered={false}
          hoverable
          style={{ margin: `-${token.sizeLG}px`, fontWeight: 600, }}
          onClick={goToPage}
        >
          View All Fundraising Pages <ArrowRightOutlined />
        </Card>
    </Card>
  );
};

export default CardFundraisingSummary;

interface FundraisingListItemProps {
  name: string;
  imgUrl: string;
  completionPercent: number;
  amountRaised: string;
  target: string;
  dayLeft: number;
}

const FundraisingListItem: React.FC<FundraisingListItemProps> = ({
  name,
  imgUrl,
  completionPercent,
  amountRaised,
  target,
  dayLeft,
}) => {
  const { token } = theme.useToken();

  return (
    <Card
      hoverable
      bordered={false}
      style={{ margin: `0 -${token.sizeLG}px` }}
      className={css`&{
      border-right: 0px solid ${token.colorPrimary};
      transition: all 0.25s ease-out;
    }
    &:hover {
      background-color: ${token.colorPrimaryBgHover}15;
      border-right: 2px solid ${token.colorPrimary};
    }
  `}
    >
      <Flex
        gap={token.sizeSM}
        wrap="wrap"
        justify="space-between"
        align="center"
        style={{ flex: 1 }}
      >
        <img
          src={imgUrl}
          style={{
            height: 80,
            width: 110,
            borderRadius: token.borderRadius,
            objectFit: 'cover',
          }}
        />

        <Flex
          gap={token.sizeSM}
          wrap="wrap"
          justify="space-between"
          align="center"
          style={{ flex: 1 }}
        >
          <Flex vertical>
            <div style={{ fontSize: token.fontSizeLG }}>{name}</div>
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
    </Card>
  );
};

const mockData = [
  {
    title: 'Water Well Project in Sudan',
    imgUrl:
      'https://images.pexels.com/photos/5742575/pexels-photo-5742575.jpeg?auto=compress&cs=tinysrgb&w=300',
    supporters: 128,
    progress: 58,
    fundraised: '£1,740',
    target: '£3,000',
    dayLeft: 48,
  },
  {
    title: 'Gaza Emergency',
    // imgUrl: 'https://placehold.co/300x200',
    imgUrl:
      'https://images.pexels.com/photos/6929741/pexels-photo-6929741.jpeg?auto=compress&cs=tinysrgb&w=300',
    supporters: 256,
    progress: 75,
    fundraised: '£2,250',
    target: '£3,000',
    dayLeft: 30,
  },
  // {
  //   title: 'School Playground Upgrade',
  //   imgUrl:
  //     'https://images.pexels.com/photos/11128819/pexels-photo-11128819.jpeg?auto=compress&cs=tinysrgb&w=300',
  //   supporters: 112,
  //   progress: 65,
  //   fundraised: '£1,950',
  //   target: '£3,000',
  //   dayLeft: 45,
  // },
];
