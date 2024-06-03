import React from 'react';

import { Switch, FloatButton, Flex } from 'antd';
import { useGlobalState } from './GlobalProvider';
import { CodeOutlined } from '@ant-design/icons';

const GlobalStateToggles: React.FC = () => {
  const {
    showAlerts,
    isEmpty,
    showMany,
    setShowAlerts,
    setIsEmpty,
    setShowMany,
  } = useGlobalState();

  const toggler = {
    fontSize: 10,
    justifyContent: 'flex-start',
    align: 'left',
    width: 120,
    // marginLeft: '-100px',
    gap: '8px',
  };

  return (
    <FloatButton.Group
      trigger="click"
      style={{ left: 4, bottom: 150, zIndex: 999, opacity: .5, transform: 'scale(.75)' }}
      icon={<CodeOutlined />}
      tooltip={<div>Change UI States (DEMO)</div>}
    >
      <Flex
        vertical
        justify="flex-start"
        gap={8}
        style={{ alignItems: 'left', background: 'white', padding: 8 }}
      >
        <Flex style={toggler}>
          <Switch size="small" checked={showAlerts} onChange={setShowAlerts} />
          {showAlerts ? 'Alerts: Visible' : 'Alerts: Hidden'}
        </Flex>
        <Flex style={toggler}>
          <Switch size="small" checked={isEmpty} onChange={setIsEmpty} />
          {isEmpty ? 'Empty: YES' : 'Empty: NO'}
        </Flex>
        <Flex style={toggler}>
          <Switch size="small" checked={showMany} onChange={setShowMany} />
          {showMany ? 'Has Many: YES' : 'Has Many: NO'}
        </Flex>
      </Flex>
    </FloatButton.Group>
  );
};

export default GlobalStateToggles;
