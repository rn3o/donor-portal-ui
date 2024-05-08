import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type {
  ConfigProviderProps,
  RadioChangeEvent,
  TableProps,
  TourProps,
  UploadFile,
  TabsProps,
} from 'antd';
import {
  Flex,
  Button,
  Calendar,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Popconfirm,
  QRCode,
  Radio,
  Select,
  Space,
  Tabs,
  Table,
  theme,
  TimePicker,
  Tour,
  Transfer,
  Upload,
  Switch,
  Typography,
} from 'antd';
import enUS from 'antd/locale/en_US';
import enGB from 'antd/locale/en_GB';
import frFR from 'antd/locale/fr_FR';
import arEG from 'antd/locale/ar_EG';
import urPK from 'antd/locale/ur_PK';
import idID from 'antd/locale/id_ID';
import { ProCard, PageContainer } from '@ant-design/pro-components';

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
import 'dayjs/locale/ar-dz';
import 'dayjs/locale/fr';
import 'dayjs/locale/id';
import 'dayjs/locale/ur';

import ButtonsDemo from './../ui/demo/ButtonsDemo';
import IconsDemo from '../ui/demo/IconsDemo';
import DropdownButtonsDemo from '../ui/demo/DropdownButtonsDemo';
import StepsDemo from '../ui/demo/StepsDemo';
import CheckboxesDemo from '../ui/demo/CheckboxesDemo';
import SwitchesDemo from '../ui/demo/SwitchesDemo';
import MultiDrawer from '../ui/demo/MultiDrawer';

const { Title, Text } = Typography;

type Locale = ConfigProviderProps['locale'];

dayjs.locale('en');

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [{ text: 'filter1', value: 'filter1' }],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const Page: React.FC = () => {
  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const tourRefs = React.useRef<HTMLElement[]>([]);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const info = () => {
    Modal.info({
      title: 'some info',
      content: 'some info',
    });
  };

  const confirm = () => {
    Modal.confirm({
      title: 'some info',
      content: 'some info',
    });
  };

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => tourRefs.current[0],
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => tourRefs.current[1],
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => tourRefs.current[2],
    },
  ];

  const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://res.cloudinary.com/rn3o/image/upload/v1662111509/samples/food/dessert.jpg',
    },
    {
      uid: '-2',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://res.cloudinary.com/rn3o/image/upload/v1662111509/samples/food/dessert.jpg',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'error',
    },
  ];

  return (
    <Space
      direction="vertical"
      size={[0, 16]}
      style={{
        width: '100%',
        // paddingTop: 16,
        // borderTop: `1px solid ${token.colorBorder}`,
      }}
    >
      {/* <Pagination defaultCurrent={1} total={50} showSizeChanger /> */}

      <Space wrap>
        <DatePicker />
        <TimePicker />
        <RangePicker />
      </Space>

      <Flex>
        <div
          style={{
            width: 320,
            border: `1px solid ${token.colorBorder}`,
            borderRadius: 8,
          }}
        >
          <Calendar fullscreen={false} value={dayjs()} />
        </div>

        <Form
          style={{ padding: token.sizeXL }}
          name="basic"
          autoComplete="off"
          layout="vertical"
          // labelCol={{ sm: { span: 4 } }}
          // wrapperCol={{ span: 6 }}
        >
          <Flex gap="16px" align="center" style={{ padding: '0 16px 24px 0' }}>
            <Button type="primary" onClick={showModal}>
              Show Modal
            </Button>
            {/* <Button onClick={info}>Show info</Button>
        <Button onClick={confirm}>Show confirm</Button> */}
            <Popconfirm title="Confirm?">
              <a>Click to confirm</a>
            </Popconfirm>
          </Flex>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input width={200} />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ type: 'number', min: 15, max: 99 }]}
            initialValue={10}
          >
            <InputNumber width={200} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>

      <Modal title="Are you sure?" open={open} onCancel={hideModal}>
        <p>Some confirmation texts to display</p>
      </Modal>
      <Space wrap size={80}>
        {/* <QRCode
          value="#"
          status="expired"
          onRefresh={() => console.log('refresh')}
        /> */}
        <Image
          width={320}
          src="https://res.cloudinary.com/rn3o/image/upload/v1662111509/samples/food/dessert.jpg"
        />
      </Space>
      <Upload listType="picture-card" fileList={fileList} />

      <Button type="primary" onClick={() => setTourOpen(true)}>
        Begin Tour
      </Button>
      <Space>
        <Button ref={(node) => node && tourRefs.current.splice(0, 0, node)}>
          {' '}
          Upload
        </Button>
        <Button
          ref={(node) => node && tourRefs.current.splice(1, 0, node)}
          type="primary"
        >
          Save
        </Button>
        <Button
          ref={(node) => node && tourRefs.current.splice(2, 0, node)}
          icon={<EllipsisOutlined />}
        />
      </Space>
      <Tour open={tourOpen} steps={steps} onClose={() => setTourOpen(false)} />
    </Space>
  );
};

const DesignSystem: React.FC = () => {
  const [locale, setLocal] = useState<Locale>(enUS);

  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    setLocal(localeValue);
    if (!localeValue) {
      dayjs.locale('en');
    } else if (localeValue === 'fr') {
      dayjs.locale('fr');
    } else if (localeValue === 'ardz') {
      dayjs.locale('ardz');
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General',
      children: 'Content of Tab pane 1',
    },
    {
      key: '2',
      label: 'Navigation',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Data Entry',
      children: 'Content of Tab Pane 3',
    },
  ];

  const [isMultiDrawerOpen, setMultiDrawerOpen] = useState(false); // State to manage the visibility of the drawer

  const openMultiDrawer = () => {
    setMultiDrawerOpen(true);
  };

  const closeMultiDrawer = () => {
    setMultiDrawerOpen(false);
  };

  return (
    <PageContainer
      style={{
        marginTop: 160,
      }}
      header={{
        title: 'Design System Preview',
      }}
      subTitle=""
    >
      <ConfigProvider locale={locale}>
        <ProCard>
          <Text
            style={{ fontFamily: 'inherit', fontWeight: '300', opacity: '0.7' }}
          >
            This page showcases this app UI elements. 
            <br />
            <b>To change theme, Use the floating button</b> located at the bottom right of the screen.
          </Text>

          <Divider />

          <General />

          <Divider />

          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 16 }}>Locale:</span>
            <Radio.Group value={locale} onChange={changeLocale}>
              <Radio.Button key="en" value={enGB}>
                English
              </Radio.Button>
              <Radio.Button key="fr" value={frFR}>
                French
              </Radio.Button>
              <Radio.Button key="ar-dz" value={arEG}>
                Arabic
              </Radio.Button>
              <Radio.Button key="pk" value={urPK}>
                Urdu
              </Radio.Button>
              <Radio.Button key="id" value={idID}>
                Bahasa Indonesia
              </Radio.Button>
            </Radio.Group>
          </div>
          <Page />

          <Divider />
          <Button onClick={openMultiDrawer}>Open Drawer</Button>
          <MultiDrawer visible={isMultiDrawerOpen} onClose={closeMultiDrawer} />

          <Divider />
          <StepsDemo />

          <Divider />
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </ProCard>
      </ConfigProvider>
    </PageContainer>
  );
};

export default DesignSystem;

const General: React.FC = () => {
  return (
    <>
      <Flex vertical gap="large">
        <ButtonsDemo />
        <Divider style={{ margin: 0 }} />
        <DropdownButtonsDemo />
        <Divider style={{ margin: 0 }} />
        <Space>
          <SwitchesDemo />
          <Divider type="vertical" />
          <IconsDemo />
        </Space>
        <Divider style={{ margin: 0 }} />
        <CheckboxesDemo />
      </Flex>
      {/* <Page /> */}
    </>
  );
};
