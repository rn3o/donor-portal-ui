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
    justifyContent: 'flex-end',
    align: 'right',
    width: 120,
    marginLeft: '-100px',
    gap: '8px',
  };

  return (
    <FloatButton.Group
      trigger="click"
      style={{ right: 24, bottom: 196 }}
      icon={<CodeOutlined />}
      tooltip={<div>Toggle UI States</div>}
    >
      <Flex
        vertical
        justify="flex-end"
        gap={8}
        style={{ align: 'right', background: 'white', padding: 8 }}
      >
        <Flex style={toggler}>
          {showAlerts ? 'Alerts: Visible' : 'Alerts: Hidden'}
          <Switch size="small" checked={showAlerts} onChange={setShowAlerts} />
        </Flex>
        <Flex style={toggler}>
          {isEmpty ? 'Empty: YES' : 'Empty: NO'}
          <Switch size="small" checked={isEmpty} onChange={setIsEmpty} />
        </Flex>
        <Flex style={toggler}>
          {showMany ? 'Has Many: YES' : 'Has Many: NO'}
          <Switch size="small" checked={showMany} onChange={setShowMany} />
        </Flex>
      </Flex>
    </FloatButton.Group>

    // <div style={{ position: 'fixed', bottom: 80, left: 20, zIndex: 9999 }}>
    //   for demo purpose
    //   <div>
    //     <Switch size="small" checked={showAlerts} onChange={setShowAlerts} />
    //     <span>{showAlerts ? 'Alerts: Visible' : 'Alerts: Hidden'}</span>
    //   </div>
    //   <div>
    //     <Switch size="small" checked={isEmpty} onChange={setIsEmpty} />
    //     <span>{isEmpty ? 'Empty: YES' : 'Empty: NO'}</span>
    //   </div>
    //   <div>
    //     <Switch size="small" checked={showMany} onChange={setShowMany} />
    //     <span>{showMany ? 'Many: ON' : 'Many: OFF'}</span>
    //   </div>
    // </div>
  );
};

export default GlobalStateToggles;
