import { CopyOutlined, SearchOutlined } from '@ant-design/icons';

import { Input, Flex, AutoComplete, theme, Typography, Select } from 'antd';
import React, { useState, useEffect, Children, Component } from 'react';

const { Title, Text } = Typography;

// const { token } = theme.useToken();

const SearchAutocomplete: React.FC = () => {
  return (
    <>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={380}
        style={{
          // marginInlineStart: 112,
          width: 260,
        }}
        options={options}
      >
        {/* <SearchInput /> */}
        <Input
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Search"
          variant="filled"
        />
      </AutoComplete>
      <div style={{ position: 'relative' }}>
        <Select
          placeholder="Accounts"
          variant="borderless"
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 999,
            maxWidth: 130,
          }}
          options={[
            { value: 'Accounts', label: 'Accounts' },
            { value: 'Giving', label: 'Giving' },
            { value: 'Sponsorships', label: 'Sponsorships' },
            { value: 'Feedbacks', label: 'Feedbacks' },
            { value: 'Pledges', label: 'Pledges' },
          ]}
        />
      </div>
    </>
  );
};

export default SearchAutocomplete;

const renderTitle = (title: string) => (
  <span>
    {title}
    {/* <a
      style={{ float: 'right' }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a> */}
  </span>
);

const renderItem = (
  name: string,
  address: string,
  refNumber: string,
  phone: string,
  email: string
) => ({
  value: name,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Flex vertical>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
        <span
          style={{
            fontSize: '12px',
            opacity: '0.5',
          }}
        >
          {address && (
            <>
              <Text
                style={{ fontSize: 12 }}
                copyable={{
                  icon: [
                    <CopyOutlined key="copy-icon" style={{ color: 'gray' }} />,
                  ],
                  tooltips: ['Copy Address', 'Copied!'],
                }}
              >
                {address}
              </Text>
              <br />
            </>
          )}

          {phone && (
            <>
              <Text
                style={{ fontSize: 12 }}
                copyable={{
                  icon: [
                    <CopyOutlined key="copy-icon" style={{ color: 'gray' }} />,
                  ],
                  tooltips: ['Copy Phone', 'Copied!'],
                }}
              >
                {phone}
              </Text>
              <br />
            </>
          )}

          {email && (
            <>
              <Text
                style={{ fontSize: 12 }}
                copyable={{
                  icon: [
                    <CopyOutlined key="copy-icon" style={{ color: 'gray' }} />,
                  ],
                  tooltips: ['Copy Email', 'Copied!'],
                }}
              >
                {email}
              </Text>
            </>
          )}
        </span>
      </Flex>
      <span>
        <Text
          copyable={{
            icon: [<CopyOutlined key="copy-icon" style={{ color: 'gray' }} />],
            tooltips: ['Copy Reference No.', 'Copied!'],
          }}
        >
          {refNumber}
        </Text>
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Recent Searches'),
    options: [
      renderItem(
        'Benjamin Thompson',
        '22 Maple Rd, Cardiff',
        'AC450123',
        '+44 123456789',
        'benjamin@example.com'
      ),
      renderItem(
        'Isabella Rodriguez',
        '15 Oak St, Liverpool',
        'AC560789',
        '',
        'isabella@example.com'
      ),
    ],
  },
  {
    label: renderTitle('Accounts'),
    options: [
      renderItem(
        'Alexander Mitchell',
        '123 Main St, London',
        'AC100123',
        '+44 7412345678',
        'alexander@example.com'
      ),
      renderItem(
        'Emily Campbell',
        '456 High St, Manchester',
        'AC106789',
        '',
        'emily@example.com'
      ),
      renderItem(
        'Christopher Wright',
        '789 Elm St, Bristol',
        'AC203456',
        '+44 7712345678',
        'christopher@example.com'
      ),
      renderItem('Victoria Walker', '222 Park Ave, Leeds', 'AC304567', '', ''),
      renderItem(
        'Daniel Turner',
        '55 Cherry Ln, Edinburgh',
        'AC407890',
        '+44 7812345678',
        'daniel@example.com'
      ),
    ],
  },
  {
    label: renderTitle('Sponsorships'),
    options: [
      renderItem(
        'Madison Hall',
        '789 Park Ave, Birmingham',
        'AC601234',
        '+44 7987654321',
        'madison@example.com'
      ),
      renderItem('Joshua King', '101 Elm St, Glasgow', 'AC300567', '', ''),
    ],
  },
];
