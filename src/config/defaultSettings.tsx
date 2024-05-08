import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  splitMenus: false,
  siderMenuType: 'sub',
  colorWeak: false,
  pwa: true,
  title: 'Engage',
  logo: 'https://framerusercontent.com/images/jHJJtoi1lAZTFGfJvCtM70gp4.png',
  // logo:'https://n3o.ltd/wp-content/uploads/elementor/thumbs/n3o-Engage-p6q56w6e4oga10x6xz0xeobneir23jx69kg6a67ncw.png',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
