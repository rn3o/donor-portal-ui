import React from 'react';
// import { NoteBlank, FolderUser } from '@phosphor-icons/react';

import {
  SmileOutlined,
  FileOutlined,
  HomeOutlined,
  CalculatorOutlined,
  GiftOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  GroupOutlined,
} from '@ant-design/icons';

import MyAccount from './../pages/MyAccount';
import NoDonation from '../pages/NoDonation';
import FundraisingPages from '../pages/fundraising/FundraisingPages';
import FundraisingTeams from '../pages/fundraising/FundraisingTeams';
import FundraisingTeamInvitation from '../pages/fundraising/FundraisingTeamInvitation';
import DonationLists from '../pages/donation/DonationLists';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/my-account',
        name: 'My Account',
        icon: <HomeOutlined />,
        // component: <MyAccount />,
      },
      {
        path: '/donation',
        name: 'Donations',
        icon: <GiftOutlined />,
        // component: <DonationLists />,
      },
      {
        path: '/giving-plan',
        name: 'Giving Plan',
        icon: <CalendarOutlined />,
        // component: <NoDonation />,
      },
      {
        path: '/sponsorship',
        name: 'Sponsorships',
        icon: <SmileOutlined />,
        // component: <NoDonation />,
      },
      {
        path: '/fundraising',
        name: 'Fundraising',
        icon: <TeamOutlined />,
        // component: <NoDonation />,
        routes: [
          // {
          //   path: '/fundraising/contributions',
          //   name: 'Contributions',
          //   icon: <FileOutlined />,
          //   component: <NoDonation />,
          // },
          {
            path: '/fundraising/pages',
            name: 'Pages',
            icon: <FileOutlined />,
            // component: <FundraisingPages />,
          },
          {
            path: '/fundraising/teams',
            name: 'Teams',
            icon: <FileOutlined />,
            // component: <FundraisingTeams />,
          },
        ],
      },
      {
        path: '/zakat-calculator',
        name: 'Zakat Calculator',
        icon: <CalculatorOutlined />,
        // component: <NoDonation />,
      },

      {
        path: '/account-settings',
        name: 'Account Settings',
        icon: <SettingOutlined />,
      },

      {
        path: '/formbuildertemp',
        name: 'Form Builder (TEMP)',
        icon: <GroupOutlined />,
      },

      // {
      //   path: '/design-system',
      //   name: 'Design System',
      //   icon: <FormatPainterOutlined />,
      //   component: <DesignSystem />,
      // },
      // {
      //   path: '/test-page',
      //   name: 'Test Page*',
      //   icon: <CodeOutlined />,
      //   component: <TestPage />,
      //   routes: [
      //     {
      //       path: '/design-system',
      //       name: 'Design System',
      //       icon: <FormatPainterOutlined />,
      //       component: <DesignSystem />,
      //     },
      //   ],
      // },

      // {
      //   path: '#',
      //   name: 'External Link',
      //   component: <Blank />,
      //   icon: <ChromeOutlined />,
      // },
    ],
  },
  location: {
    pathname: '/',
  },
  // appList: [
  //   {
  //     icon: 'https://res.cloudinary.com/rn3o/image/upload/v1714485452/n3o-engage_mfn0ug.png',
  //     title: 'Engage',
  //     desc: 'Donor Management',
  //     url: '#',
  //   },
  //   {
  //     icon: 'https://res.cloudinary.com/rn3o/image/upload/v1714485438/n3o-tally_hiavbx.png',
  //     title: 'Tally',
  //     desc: 'Finance Management',
  //     url: '#',
  //     target: '_blank',
  //   },
  //   {
  //     icon: 'https://res.cloudinary.com/rn3o/image/upload/v1714485436/n3o-reach_omdzud.png',
  //     title: 'Reach',
  //     desc: 'Programmes (Coming Soon)',
  //     url: '#',
  //   },
  //   {
  //     icon: 'https://res.cloudinary.com/rn3o/image/upload/v1714485454/n3o-crowdfunding_frxgbh.png',
  //     title: 'Crowdfunding',
  //     target: '_blank',
  //     desc: 'Fundraising Platform (Coming Soon)',
  //     url: '#',
  //   },
  //   {
  //     icon: 'https://res.cloudinary.com/rn3o/image/upload/v1714485440/n3o-forms_rcx3ll.png',
  //     title: 'Forms',
  //     target: '_blank',
  //     desc: 'Data Entry Simplified (Coming Soon)',
  //     url: '#',
  //   },
  //   {
  //     icon: 'https://res.cloudinary.com/rn3o/image/upload/v1714485464/n3o_eggrlu.png',
  //     title: 'N3O Website',
  //     target: '_blank',
  //     desc: 'Visit N3O Website for more',
  //     url: '#',
  //   },
  // ],
};
