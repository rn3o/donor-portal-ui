// @ts-nocheck

import './index.css';
import defaultProps from './config/defaultProps';
import defaultSettings from './config/defaultSettings';

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, lazy, Suspense, startTransition, createContext } from 'react';

import {
  LogoutOutlined,
  QuestionCircleFilled,
  AppstoreOutlined,
  HeartOutlined,
  RadiusUprightOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  ColumnWidthOutlined,
  FontColorsOutlined,
  LayoutOutlined,
  CloseOutlined,
  SunFilled,
  MoonFilled,
  FormatPainterOutlined,
  ControlOutlined,
  HomeOutlined,
  LoginOutlined,
  MailOutlined,
  ProductOutlined,
  GroupOutlined,
  ShoppingOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';

import { css } from '@emotion/css';
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  theme,
  Flex,
  FloatButton,
  Typography,
  ColorPicker,
  Select,
  Slider,
  Drawer,
  InputNumber,
  Switch,
  Radio,
  Avatar,
} from 'antd';

import type { ColorPickerProps } from 'antd';

import type { ConfigProviderProps } from 'antd';

const { Text } = Typography;

// import enUS from 'antd/es/locale/en_US';
import enUS from 'antd/locale/en_US';

import DesignSystem from './pages/DesignSystem';
import TestPage from './pages/_TestPage';
import FirstLevelPage from './pages/TopLevelPage';

import QuickAccessMenu from './ui/QuickAccessMenu';
import NoDonation from './pages/NoDonation';
import MyAccount from './pages/MyAccount';
import TopLevelPage from './pages/TopLevelPage';
import TeamInvitation from './pages/TeamInvitation';
import LoginPage from './pages/loginPage';
import DonationWidgetsDemo from './pages/DonationWidgetsDemo';
import DonationFormBuilder from './pages/DonationFormBuilder';
// import FundraisingPages from './pages/fundraising/FundraisingPages';
// import FundraisingTeams from './pages/fundraising/FundraisingTeams';
// import FundraisingTeamInvitation from './pages/fundraising/FundraisingTeamInvitation';
// import FundraisingCreateTeam from './pages/fundraising/FundraisingCreateTeam';
// import FundraisingCreatePage from './pages/fundraising/FundraisingCreatePage';
// import DonationLists from './pages/donation/DonationLists';
// import DonationCreate from './pages/donation/DonationCreate';
// import GivingPlanLists from './pages/giving-plan/GivingPlanLists';
// import GivingPlanCreate from './pages/giving-plan/GivingPlanCreate';

// const MyAccount = lazy(() => import('./pages/MyAccount'));
const FundraisingPages = lazy(() =>
  import('./pages/fundraising/FundraisingPages')
);
const FundraisingTeams = lazy(() =>
  import('./pages/fundraising/FundraisingTeams')
);
const FundraisingTeamMember = lazy(() =>
  import('./pages/fundraising/FundraisingTeamMember')
);
const FundraisingTeamMemberEmpty = lazy(() =>
  import('./pages/fundraising/FundraisingTeamMemberEmpty')
);
const FundraisingTeamInvitation = lazy(() =>
  import('./pages/fundraising/FundraisingTeamInvitation')
);
const FundraisingCreateTeam = lazy(() =>
  import('./pages/fundraising/FundraisingCreateTeam')
);
const FundraisingCreatePage = lazy(() =>
  import('./pages/fundraising/FundraisingCreatePage')
);
const DonationLists = lazy(() => import('./pages/donation/DonationLists'));
const DonationCreate = lazy(() => import('./pages/donation/DonationCreate'));
const GivingPlanLists = lazy(() =>
  import('./pages/giving-plan/GivingPlanLists')
);
const GivingPlanCreate = lazy(() =>
  import('./pages/giving-plan/GivingPlanCreate')
);
const SponsorshipLists = lazy(() =>
  import('./pages/sponsorship/SponsorshipLists')
);
const SponsorshipCreate = lazy(() =>
  import('./pages/sponsorship/SponsorshipCreate')
);
const ZakatCalcLists = lazy(() =>
  import('./pages/zakat-calculator/ZakatCalcLists')
);
const ZakatCalcCreate = lazy(() =>
  import('./pages/zakat-calculator/ZakatCalcCreate')
);

const AccountSettings = lazy(() => import('./pages/AccountSettings'));
const FormBuilderPageTemp = lazy(() => import('./pages/FormBuilderPageTemp'));

export const AppLogoContext = createContext<string>('');

export default () => {
  const [pathname, setPathname] = useState('/dashboard');
  // const [pageContent, setPageContent] = useState(<CreateAccount />);

  const navigate = useNavigate();
  const location = useLocation();

  // array of routes that shall not be rendered in the ProLayout
  const excludedRoutes = [
    '/login',
    '/team-invitation',
    '/top-level-page',
    '/donation-widgets-demo',
    '/form-builder',
    // add more
  ]

  const shouldRenderProLayout = !excludedRoutes.some(route => location.pathname.startsWith(route));

  const { token } = theme.useToken();

  // Themer Settings

  const [openThemerDrawer, setOpenThemerDrawer] = useState(false);

  const showThemerDrawer = () => {
    setOpenThemerDrawer(true);
  };

  // Wrap the state update with startTransition
  const onCloseThemerDrawer = () => {
    startTransition(() => {
      setOpenThemerDrawer(false);
    });
  };

  // color theme presets
  type Preset = Required<ColorPickerProps>['presets'][number];
  const genCustomPresets = (
    colorList: { key: string; colors: string[] }[]
  ): Preset[] => colorList.map(({ key, colors }) => ({ label: key, colors }));

  const customColorList = [
    {
      key: 'Sample Colors',
      colors: [
        '#1890ff',
        '#25bbdb',
        '#4faf46',
        '#e42281',
        '#F5222D',
        '#FA541C',
        '#FAAD14',
        '#13C2C2',
        '#2F54EB',
        '#722ED1',
      ],
    },
  ];
  const presets = genCustomPresets(customColorList);

  const fontFamilies = [
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Signika', label: 'Signika' },
    { value: 'Epilogue', label: 'Epilogue' },
    { value: 'Switzer', label: 'Switzer' },
    // { value: 'Satoshi', label: 'Satoshi' },
    // Add more font families as needed
  ];

  const [selectedFont, setSelectedFont] = useState(fontFamilies[1].value);

  const handleFontChange = (value) => {
    setSelectedFont(value);
    document.documentElement.style.setProperty('--font-family', value);
  };

  const handleBackgroundChange = (value) => {
    const layoutBgList = document.querySelectorAll('.my-prefix-layout-bg-list');
    layoutBgList.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.background = value;
      }
    });
  };

  const navStyle = [
    { value: 'mix', label: 'Side' },
    // { value: 'side', label: 'Side Nav' },
    { value: 'top', label: 'Top' },
  ];

  const [selectedNavStyle, setSelectedNavStyle] = useState(navStyle[0].value);

  const handleNavStyle = (value) => {
    setSelectedNavStyle(value);
    setSetting((prevSettings) => ({
      ...prevSettings,
      layout: value, // Update the layout property in settings state
    }));
  };

  const [primaryColorTheme, setPrimaryColorTheme] = React.useState(token.colorPrimary);

  const [themeRadius, setThemeRadius] = React.useState(6);

  const [themeFontSize, setThemeFontSize] = React.useState(13);

  const [themeSpacingSize, setThemeSpacingSize] = React.useState(4);

  const [themeMode, setThemeMode] = useState('light');

  const [appTitle, setAppTitle] = React.useState('');

  const [appLogo, setAppLogo] = React.useState(
    'https://framerusercontent.com/images/jHJJtoi1lAZTFGfJvCtM70gp4.png'
  );

  const [heroImage, setHeroImage] = React.useState(
    'https://res.cloudinary.com/rn3o/image/upload/v1714470245/minimalist-vector-style-playful-geometric-pattern-_2_kcjitx.png'
  );

  const handleThemePresets = (value, option) => {
    console.log('change to ' + option.label);
    const {
      font,
      fontSize,
      color,
      background,
      spacing,
      corner,
      label,
      logo,
      title,
      heroImage,
    } = option;
    setSelectedFont(font);
    document.documentElement.style.setProperty('--font-family', font);
    handleBackgroundChange(background);
    setThemeRadius(corner);
    setThemeFontSize(fontSize);
    setPrimaryColorTheme(color);
    setThemeSpacingSize(spacing);
    setAppLogo(logo);
    setAppTitle(title);
    setHeroImage(heroImage);
  };

  const handleThemeChange = (e) => {
    setThemeMode(e.target.value);
    handleBackgroundChange('');
  };

  // Themer Settings End

  const [settings, setSetting] = useState<ProSettings>({
    fixSiderbar: true,
    layout: selectedNavStyle,
    fixedHeader: true,
    splitMenus: false,
    siderMenuType: 'sub',
    navTheme: themeMode,
    // navTheme: 'realDark'
  });

  useEffect(() => {
    setSetting((prevSetting) => ({
      ...prevSetting,
      navTheme: themeMode,
    }));
  }, [themeMode]);

  return (
    <>
      <ConfigProvider
        locale={enUS}
        theme={{
          components: {
            Divider: {
              colorSplit: 'rgba(5, 5, 5, 0.12)',
            },
            Button: {
              algorithm: true,
            },
            Menu: {
              algorithm: true,
            },
          },
          token: {
            colorPrimary: primaryColorTheme,
            fontSize: themeFontSize,
            // sizeStep: themeSpacingSize,
            sizeUnit: themeSpacingSize,
            borderRadius: themeRadius,
            colorLink: primaryColorTheme,
            colorInfo: primaryColorTheme,
          },
        }}
      >

        {/* Themer Start */}
        <Drawer
          // title="Edit Theme"
          headerStyle={{ display: 'none' }}
          // mask={false}
          onClose={onCloseThemerDrawer}
          open={openThemerDrawer}
          height={100}
          placement="bottom"
          style={{ zIndex: 999999}}
          destroyOnClose
        >
          <Flex
            align="center"
            gap={token.sizeMD}
            style={{
              // scale: '0.8',
              padding: token.sizeXS,
              // background: token.colorBgBase,
              borderRadius: token.borderRadiusOuter,
            }}
          >
            <Button
              onClick={onCloseThemerDrawer}
              style={{ position: 'absolute', right: 24 }}
            >
              <CloseOutlined />
            </Button>

            <Flex align="center" gap="4px">
              Theme Example
              <Select
                placeholder="Select example"
                defaultValue="Select"
                options={themePresets}
                // value={selectedFont}
                onChange={handleThemePresets}
                style={{
                  width: 120,
                }}
              />
            </Flex>

            <ColorPicker
              // showText
              value={primaryColorTheme}
              presets={presets}
              onChangeComplete={(color) =>
                setPrimaryColorTheme(color.toHexString())
              }
            />
            <Flex align="center" gap="4px">
              <LayoutOutlined /> Nav
              <Select
                options={navStyle}
                value={selectedNavStyle}
                onChange={handleNavStyle}
                style={{
                  width: 90,
                }}
              />
            </Flex>

            <Flex align="center" gap="4px">
              <FontColorsOutlined /> Font
              <Select
                options={fontFamilies}
                value={selectedFont}
                onChange={handleFontChange}
                style={{
                  width: 140,
                }}
              />
            </Flex>

            <Flex align="center" gap="4px">
              <FontSizeOutlined />
              <InputNumber
                min={11}
                max={16}
                defaultValue={themeFontSize}
                onChange={setThemeFontSize}
                changeOnWheel
                style={{ width: 60 }}
              />
            </Flex>

            <Flex align="center" gap="4px">
              <RadiusUprightOutlined /> Corners
              <Slider
                defaultValue={themeRadius}
                onChangeComplete={setThemeRadius}
                min={0}
                max={24}
                style={{ width: 80 }}
              />
            </Flex>

            <Flex align="center" gap="4px">
              <ColumnWidthOutlined /> Spacing
              <Slider
                defaultValue={themeSpacingSize}
                onChangeComplete={setThemeSpacingSize}
                min={1}
                max={5}
                style={{ width: 80 }}
              />
            </Flex>

            <Radio.Group
              size="small"
              value={themeMode}
              onChange={handleThemeChange}
              buttonStyle="solid"
            >
              <Radio.Button value="light">
                <SunFilled />
              </Radio.Button>
              <Radio.Button value="realDark">
                <MoonFilled />
              </Radio.Button>
            </Radio.Group>
          </Flex>
        </Drawer>

        {/* Themer End */}

        {shouldRenderProLayout && (
        <ProLayout
          menuExtraRender={({ collapsed, isMobile }) =>
            collapsed ? (
              <Flex vertical gap="16px">
                <Flex
                  gap="8px"
                  align="center"
                  style={{
                    margin: '16px -12px -12px',
                    padding: '8px 4px',
                    color: token.colorTextHeading,
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: 8,
                    height: '40px',
                  }}
                  className={css`
                    &:hover {
                      background-color: ${token.colorBgTextHover};
                    }
                  `}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<HeartOutlined />}
                  // size='small'
                  />
                  <QuickAccessMenu />
                </Flex>
                <Divider style={{ margin: '4px 0' }} />
              </Flex>
            ) : (
              <Flex vertical gap="16px">
                <Flex
                  gap="8px"
                  align="center"
                  style={{
                    margin: '16px -12px -12px',
                    padding: '8px 8px',
                    border: `dashed 2px ${primaryColorTheme}40`,
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: 8,
                    height: '40px',
                    display: !isMobile ? '' : 'none',
                  }}
                  className={css`
                      &:hover {
                        background-color: ${primaryColorTheme}40;
                      }
                  `}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<HeartOutlined />}
                    size="small"
                  // style={{fontWeight: 'bold',}}
                  />

                  <Text
                    style={{
                      minWidth: '200px',
                      // display: 'block',
                      fontWeight: '600',
                      fontFamily: 'inherit',
                    }}
                  >
                    Contribute
                  </Text>
                  <QuickAccessMenu />
                </Flex>
                <Divider style={{ margin: '12px 0',  }} />
              </Flex>
            )
          }
          prefixCls="my-prefix"
          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px',
            },
          ]}
          {...defaultProps}
          location={{
            pathname,
          }}
          token={{
            header: {
              colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
            },
          }}
          menu={{
            collapsedShowGroupTitle: true,
            defaultOpenAll: true,
          }}
          avatarProps={{
            src: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60',
            size: 'small',
            title: 'Ryan S.',
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'accountSettings',
                        icon: <ControlOutlined />,
                        label: (
                          <div onClick={() => navigate('/account-settings')}>
                            My Preferences
                          </div>
                        ),
                      },
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: 'Logout',
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            if (typeof window === 'undefined') return [];
            return [
              // props.layout !== 'side' && document.body.clientWidth > 400 ? (
              //   <Flex
              //     style={{
              //       marginInlineEnd: 20,
              //     }}
              //   >
              //     <SearchAutocomplete />
              //   </Flex>
              // ) : undefined,
              props.layout !== 'mix' && document.body.clientWidth > 400 ? (
                <Flex
                  gap="8px"
                  align="center"
                  style={{
                    // margin: '16px -12px -12px',
                    padding: '8px 8px',
                    border: `dashed 2px ${token.colorBgTextHover}`,
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: 8,
                    height: '40px',
                  }}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<HeartOutlined />}
                    size="small"
                  // style={{fontWeight: 'bold',}}
                  />

                  <span
                    style={{
                      minWidth: '120px',
                      // display: 'block',
                      fontWeight: '600',
                    }}
                  >
                    Contribute
                  </span>
                  {/* <QuickAccessMenu /> */}
                </Flex>
              ) : undefined,
              // <InfoCircleFilled key="InfoCircleFilled" />,
              // <QuestionCircleFilled key="QuestionCircleFilled" />,
              <ShoppingOutlined />,
            ];
          }}
          headerTitleRender={(logo, title, _) => {
            const defaultDom = (
              <>
                {/* {logo} */}
                <img src={appLogo} style={{ maxHeight: 30 }} />
                &nbsp;
                <Divider type="vertical" />
                <div style={{ fontSize: 'smaller', opacity: '0.6' }}>
                  Donor Portal
                </div>
              </>
            );
            if (typeof window === 'undefined') return defaultDom;
            if (document.body.clientWidth < 600) {
              return defaultDom;
            }
            if (_.isMobile) return defaultDom;
            return (
              <>
                {defaultDom}
                {/* <MenuCard /> */}
              </>
            );
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <>
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2024 {appTitle}</div>
                </div>
              </>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                setPathname(item.path || '/my-account');
                navigate(item.path);
              }}
            >
              {dom}
            </div>
          )}
          // title="Engage"
          logo={appLogo}
          {...settings}
          // {...defaultSettings}

          disableContentMargin={true}
        >
          {/* top border accent color theme hack*/}
          <Button
            type="primary"
            style={{
              height: '4px',
              width: '100%',
              left: 0,
              top: '-5px',
              zIndex: 9999,
              borderRadius: '0',
              position: 'fixed',
              pointerEvents: 'none',
            }}
          />

          <HeroBackgroundImage imageUrl={heroImage} />

          <MobileNavBottomBar />

          

          {/* <Flex style={{ maxWidth: 800, margin: 'auto' }}> */}
          <Content />
          {/* </Flex> */}
        </ProLayout>
        )}

        {/* non-dashboard routes*/}
        {!shouldRenderProLayout && (
        <div>
        <HeroBackgroundImage imageUrl={heroImage} />
        <AppLogoContext.Provider value={appLogo}>
          <NonDashboardPage />
        </AppLogoContext.Provider>
        </div>)}

      </ConfigProvider>


      <FloatButton
          icon={<BgColorsOutlined />}
          tooltip={<div>Change Theme</div>}
          onClick={showThemerDrawer}
          badge={{ dot: true }}
          style={{ left: 4, bottom:110, zIndex: 9999, opacity: .5, transform: 'scale(.75)' }}
        />

      {/* page shortcuts: */}

      <FloatButton.Group shape="square" 
      style={{ left: 6, bottom:280, zIndex: 999 }}
      className={css`&{
        flex-direction: row;
        margin-left: -56px;
        transition: all ease 0.3s;
        border-left: solid 30px transparent;
        opacity: 0.4;
      }
        &:hover {
          margin-left: -12px;
          opacity: 1;
        }
        &::after {
          content: "DEMO SHORTCUTS";
          letter-spacing: 2px;
          display: block;
          position: absolute;
          top: 50%;
          opacity: .5;
          left: -90px; 
          transform: translateY(-50%) rotate(-90deg);
          white-space: nowrap;
        }
        &::before {
          content: "DEMO SHORTCUTS SHORTCUTS";
          color: white;
          background: white;
          letter-spacing: 2px;
          padding: 10px;
          display: block;
          position: absolute;
          top: 50%;
          z-index: -1;
          opacity: 0;
          right: -180px; 
          transform: translateY(-50%) rotate(-90deg);
          white-space: nowrap;
        }
      `}
      >

        <FloatButton
          icon={<FormatPainterOutlined />}
          tooltip={<div>Show Design System</div>}
          onClick={() => {
            setPathname('/design-system');
            navigate('/design-system');
          }}
        />

        <FloatButton
        tooltip={<div>Dashboard View</div>}
        onClick={() => navigate('/my-account')}
        icon={<LayoutOutlined />}
         />

        <FloatButton
        tooltip={<div>Donation Widgets Examples</div>}
        onClick={() => navigate('/donation-widgets-demo')}
        icon={<ProductOutlined />}
        />

        <FloatButton
        tooltip={<div>Donation Form Builder</div>}
        onClick={() => navigate('/form-builder')}
        icon={<GroupOutlined />}
        />

        <FloatButton
        tooltip={<div>Login Screen</div>}
        onClick={() => navigate('/login')}
        icon={<LoginOutlined />}
         />

        <FloatButton
        tooltip={<div>Team invitation</div>}
        onClick={() => navigate('/team-invitation')}
        icon={<MailOutlined />}
         />



        <FloatButton
        tooltip={<div>Blank page (non-dashboard)</div>}
        onClick={() => navigate('/top-level-page')}
        />


        {/* <FloatButton.BackTop visibilityHeight={0} /> */}
      </FloatButton.Group>
    </>
  );
};

// Hero Image to make the page less boring!

const HeroBackgroundImage = ({ imageUrl }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        margin: '-32px -8px 0 -8px',
        // background: 'blue',
        padding: 0,
        height: '280px',
        backgroundImage: `url(${imageUrl ||
          'https://res.cloudinary.com/rn3o/image/upload/v1714470245/minimalist-vector-style-playful-geometric-pattern-_2_kcjitx.png'
          })`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        position: 'fixed', // Change position to fixed
        zIndex: 0,
        opacity: 1 - scrollY / 100, // Adjust the 500 for faster or slower fade-out
        transition: 'opacity 0.5s', // Smooth transition for opacity change
        maskImage:
          'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.15) 100%)',
        WebkitMaskImage:
          'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.15) 100%)', // For Safari compatibility
      }}
    ></div>
  );
};

// mobile menu

const MobileNavBottomBar = () => {

  const { token } = theme.useToken();

  if (document.body.clientWidth < 680)
  return (
    <div
      style={{
        width: '100%',
        margin: '-32px -8px 0 -8px',
        // background: 'blue',
        background: token.colorBgElevated,
        boxShadow: token.boxShadow,
        position: 'fixed',
        bottom: 0,
        zIndex: 999,
        // visibility: isMobile ? 'visible' : 'hidden'
      }}
    >
      <Flex
        justify='space-around'
        align='center'
        style={{
          padding: token.sizeSM,
        }}
      >
        <Button type='text' size='large' icon={<HomeOutlined />}></Button>
        <Button type='text' size='large' icon={<MailOutlined />}></Button>
        <Button
          type="primary"
          shape="circle"
          icon={<HeartOutlined />}
        size='large'
        >
        </Button>
        <Button type='text' size='large' icon={<ShoppingOutlined />}></Button>
        <Button type='text' size='large' icon={<SettingOutlined />}></Button>
        {/* <Avatar src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60' /> */}
      </Flex>
    </div>
  );
};

// Non Dashboard Routes

const NonDashboardPage = () => (
  <Routes>
    <Route path="/team-invitation" element={<TeamInvitation />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/top-level-page" element={<TopLevelPage />} />
    <Route path="/donation-widgets-demo" element={<DonationWidgetsDemo />} />
    
    {/* Temporary */}
    <Route path="/form-builder" element={
    <div style={{padding:40, background: 'white'}}>
      <DonationFormBuilder />
    </div>
  } />
  </Routes>
)

// Logged in Routes, Everyting that appears inside dashboard view / ProLayout

const Content = () => (
  <Routes>
    {/* Not lazy loaded */}
    <Route path="/" element={<MyAccount />} />
    <Route path="/my-account" element={<MyAccount />} />

    {/* Lazy load other components */}
    <Route
      path="/donation"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <DonationLists />{' '}
        </Suspense>
      }
    />

    <Route
      path="/donation/create"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <DonationCreate />{' '}
        </Suspense>
      }
    />

    <Route
      path="/giving-plan"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <GivingPlanLists />{' '}
        </Suspense>
      }
    />

    <Route
      path="/giving-plan/create"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <GivingPlanCreate />{' '}
        </Suspense>
      }
    />

    <Route
      path="/sponsorship"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <SponsorshipLists />{' '}
        </Suspense>
      }
    />

    <Route
      path="/sponsorship/create"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <SponsorshipCreate />{' '}
        </Suspense>
      }
    />

    <Route
      path="/zakat-calculator"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <ZakatCalcLists />{' '}
        </Suspense>
      }
    />

    <Route
      path="/zakat-calculator/calculate"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <ZakatCalcCreate />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/pages"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingPages />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/pages/create"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingCreatePage />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/teams"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingTeams />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/teams/members"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingTeamMember />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/teams/members-empty"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingTeamMemberEmpty />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/teams/invitations"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingTeamInvitation />{' '}
        </Suspense>
      }
    />

    <Route
      path="/fundraising/teams/create"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FundraisingCreateTeam />{' '}
        </Suspense>
      }
    />

    <Route
      path="/account-settings"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <AccountSettings />{' '}
        </Suspense>
      }
    />

    <Route
      path="/formbuildertemp"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <FormBuilderPageTemp />{' '}
        </Suspense>
      }
    />

    <Route
      path="/design-system"
      element={
        <Suspense fallback={<>loading</>}>
          {' '}
          <DesignSystem />{' '}
        </Suspense>
      }
    />
  </Routes>
);

// Theme Presets Example:

const themePresets = [
  {
    value: 'Engage',
    label: 'Engage',
    font: 'Poppins',
    fontSize: 13,
    color: '#1890ff',
    background: '',
    spacing: 4,
    corner: 6,
    title: 'N3O Ltd',
    logo: 'https://framerusercontent.com/images/jHJJtoi1lAZTFGfJvCtM70gp4.png',
    heroImage:
      'https://res.cloudinary.com/rn3o/image/upload/v1714470245/minimalist-vector-style-playful-geometric-pattern-_2_kcjitx.png',
  },
  {
    value: 'Care Compass',
    label: 'Care Compass',
    font: 'Plus Jakarta Sans',
    fontSize: 13,
    color: '#4A55AC',
    background: '',
    spacing: 4,
    corner: 6,
    title: 'Care Compass',
    logo: 'https://res.cloudinary.com/rn3o/image/upload/v1705660427/org-logo_kujgyf.png',
    heroImage:
      'https://res.cloudinary.com/rn3o/image/upload/v1714468783/portal-hero-CC_skezgu.png',
  },
  {
    value: 'MH',
    label: 'MH',
    font: 'Signika',
    fontSize: 14,
    color: '#25bbdb',
    background: '#f1efea',
    spacing: 5,
    corner: 2,
    title: 'Muslim Hands',
    logo: 'https://muslimhands.org.uk/_ui/media/logo-blue.png',
    heroImage:
      'https://res.cloudinary.com/rn3o/image/upload/v1714468783/portal-hero-MH_rphbkm.png',
  },
  {
    value: 'RF',
    label: 'RF',
    font: 'Lato',
    fontSize: 13,
    color: '#4faf46',
    background: '#ebebeb60',
    spacing: 4,
    corner: 6,
    title: 'READ FOUNDATION',
    logo: 'https://readfoundation.org.uk/wp-content/uploads/2023/10/Logo@2x-1.png',
    heroImage:
      'https://res.cloudinary.com/rn3o/image/upload/v1714468783/portal-hero-RF_zzzbkk.png',
  },
  {
    value: 'CR',
    label: 'CR',
    font: 'Epilogue',
    fontSize: 15,
    color: '#e42281',
    background: '',
    // background: '#eef6fe',
    spacing: 5,
    corner: 14,
    title: 'Charity Right',
    logo: 'https://n3o.ltd/wp-content/uploads/2023/02/charity-right-logo.png',
    heroImage:
      'https://res.cloudinary.com/rn3o/image/upload/v1714470876/portal-hero-CR_okttmk.png',
  },
  {
    value: 'GER',
    label: 'GER',
    font: 'Switzer',
    fontSize: 13,
    color: '#1956a7',
    background: '',
    spacing: 5,
    corner: 1,
    title: 'Global Ehsan Relief',
    logo: 'https://global-ehsan-relief.uk/assets/images/logo.svg',
    heroImage:
      'https://res.cloudinary.com/rn3o/image/upload/v1714468784/portal-hero-GER_ncb58a.png',
  },
];
