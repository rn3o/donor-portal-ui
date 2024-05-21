import React, { useState } from 'react';
import type { CascaderProps, GetProp } from 'antd';
import { Cascader, Flex, Space, Divider, theme, ConfigProvider } from 'antd';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

// New dimensionOne (was dimensionTwo)
const dimensionOne: Option[] = [
  {
    value: 'General Fund',
    label: 'General Fund',
    isLeaf: false,
  },
  {
    value: 'Education',
    label: 'Education',
    isLeaf: false,
  },
  {
    value: 'WASH',
    label: 'WASH',
    isLeaf: false,
  },
  {
    value: 'Emergency',
    label: 'Emergency',
    isLeaf: false,
  },
  {
    value: 'Poverty',
    label: 'Poverty',
    isLeaf: false,
  },
  {
    value: 'Food Fund',
    label: 'Food Fund',
    isLeaf: false,
  },
  {
    value: 'Shelter',
    label: 'Shelter',
    isLeaf: false,
  },
];

// New dimensionTwo (was dimensionThree)
const dimensionTwo: { [key: string]: Option[] } = {
  default: [
    {
      value: 'Afghanistan',
      label: 'Afghanistan',
      isLeaf: false,
    },
    {
      value: 'Gaza',
      label: 'Gaza',
      isLeaf: false,
    },
    {
      value: 'Mali',
      label: 'Mali',
      isLeaf: false,
    },
    {
      value: 'Pakistan',
      label: 'Pakistan',
      isLeaf: false,
    },
    {
      value: 'Sudan',
      label: 'Sudan',
      isLeaf: false,
    },
    {
      value: 'Syria',
      label: 'Syria',
      isLeaf: false,
    },
    {
      value: 'Turkey',
      label: 'Turkey',
      isLeaf: false,
    },
    {
      value: 'Yemen',
      label: 'Yemen',
      isLeaf: false,
    },
  ],
  WASH: [
    {
      value: 'Sudan',
      label: 'Sudan',
      isLeaf: false,
    },
    {
      value: 'Mali',
      label: 'Mali',
      isLeaf: false,
    },
  ],
  Education: [
    {
      value: 'Pakistan',
      label: 'Pakistan',
      isLeaf: false,
    },
    {
      value: 'Yemen',
      label: 'Yemen',
      isLeaf: false,
    },
  ],
  Emergency: [
    {
      value: 'Gaza',
      label: 'Gaza',
      isLeaf: false,
    },
    {
      value: 'Turkey',
      label: 'Turkey',
      isLeaf: false,
    },
  ],
};

// New dimensionThree (was dimensionOne)
const dimensionThree: Option[] = [
  {
    value: 'Zakat',
    label: 'Zakat',
    isLeaf: true,
  },
  {
    value: 'Sadaqah',
    label: 'Sadaqah',
    isLeaf: true,
  },
];

const SelectAllocationCascader: React.FC = () => {
  const { token } = theme.useToken();

  const [options, setOptions] = useState<Option[]>(dimensionOne);
  const [text, setText] = useState('Wherever Needed Most');

  const onChange: CascaderProps<Option>['onChange'] = (_, selectedOptions) => {
    const labels = selectedOptions.map((o) => o.label);
    let displayText = labels.join(' - ');

    if (selectedOptions.length === 1) {
      displayText += ' - Wherever Needed Most';
    }

    setText(displayText);
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    if (targetOption.children) {
      // Already loaded options
      return;
    }

    //@ts-ignore
    targetOption.loading = true;
    
    setTimeout(() => {
    //@ts-ignore
      targetOption.loading = false;

      if (selectedOptions.length === 1) {
        const firstLevelValue = targetOption.value as string;
        targetOption.children =
          dimensionTwo[firstLevelValue] || dimensionTwo.default;
      } else if (selectedOptions.length === 2) {
        targetOption.children = dimensionThree;
      }

      setOptions([...options]);
    }, 300);
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <ConfigProvider
      theme={{
        components: {
          Cascader: {
            dropdownHeight: 280,
          },
        },
      }}
    >
      <Flex vertical gap={20} style={{ fontFamily: 'sans-serif' }}>
        <Space direction="vertical">
          Your donation will be designated to:
          {/* @ts-ignore */}
          <Cascader
            size="large"
            showSearch={{ filter }}
            options={options}
            loadData={loadData}
            onChange={onChange}
            dropdownRender={dropdownRender}
            changeOnSelect
          >
            {/* Hide this to show Searchable Input */}
            <a style={{ fontWeight: 600, padding: 0 }}>{text}</a>
          </Cascader>
        </Space>
      </Flex>
    </ConfigProvider>
  );
};

const dropdownRender = (menus: React.ReactNode) => {
  const { token } = theme.useToken();

  return (
    <div>
      {menus}
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: token.sizeMD }}>
        Project availability varies by location.
      </div>
    </div>
  );
};

export default SelectAllocationCascader;
