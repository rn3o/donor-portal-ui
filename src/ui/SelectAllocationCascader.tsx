import React, { useState } from 'react';
import type { CascaderProps, GetProp } from 'antd';
import { Cascader, Flex, Space, Divider, theme, ConfigProvider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface Option {
    value?: string | number | null;
    label: React.ReactNode;
    children?: Option[];
    isLeaf?: boolean;
}

const dimensionOne: Option[] = [
    {
        value: 'General Fund',
        label: 'General Fund',
        isLeaf: false,
    },
    {
        value: 'Morocco Emergency Fund',
        label: 'Morocco Emergency Fund',
        isLeaf: true,
    },
    {
        value: 'Turkey Earthquake Appeal',
        label: 'Turkey Earthquake Appeal',
        isLeaf: true,
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
    {
        value: 'Mental Health Project',
        label: 'Mental Health Project',
        isLeaf: false,
    },
];

// New dimensionTwo (was dimensionThree)
const dimensionTwo: { [key: string]: Option[] } = {
    default: [
        {
            value: 'Wherever Needed Most',
            label: 'Wherever Needed Most',
            isLeaf: false,
        },
        {
            value: 'Afghanistan',
            label: 'Afghanistan',
            isLeaf: false,
        },
        {
            value: 'Bangladesh',
            label: 'Bangladesh',
            isLeaf: false,
        },
        {
            value: 'Ethiopia',
            label: 'Ethiopia',
            isLeaf: false,
        },
        {
            value: 'Gaza',
            label: 'Gaza',
            isLeaf: false,
        },
        {
            value: 'Kenya',
            label: 'Kenya',
            isLeaf: false,
        },
        {
            value: 'Mali',
            label: 'Mali',
            isLeaf: false,
        },
        {
            value: 'Niger',
            label: 'Niger',
            isLeaf: false,
        },
        {
            value: 'Pakistan',
            label: 'Pakistan',
            isLeaf: false,
        },
        {
            value: 'Somalia',
            label: 'Somalia',
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
            value: 'Kenya',
            label: 'Kenya',
            isLeaf: false,
        },
        {
            value: 'Mali',
            label: 'Mali',
            isLeaf: false,
        },
        {
            value: 'Niger',
            label: 'Niger',
            isLeaf: false,
        },
        {
            value: 'Somalia',
            label: 'Somalia',
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
    "Mental Health Project": [
        {
            value: 'England',
            label: 'England',
            isLeaf: true,
        },
        {
            value: 'Scotland',
            label: 'Scotland',
            isLeaf: true,
        },
        {
            value: 'France',
            label: 'France',
            isLeaf: true,
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
        let displayText = labels.join(' · ');

        // if (selectedOptions.length === 1) {
        //     displayText += ' · Wherever Needed Most';
        // }

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
                        optionPadding: '8px 12px'
                    },
                },
            }}
        >
            <Flex vertical gap={20} style={{ fontFamily: 'sans-serif' }}>
                <Space direction="vertical">
                    {/* Your donation will be designated to: */}
                    Allocate Your Donation:
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
            <div style={{ padding: token.sizeSM, opacity: 0.6 }}>
                <InfoCircleOutlined />&nbsp;&nbsp;Projects vary by location.
                <br />Select a project and location, or just a project.
            </div>
        </div>
    );
};

export default SelectAllocationCascader;
