import React from 'react';
import {
  Card,
  Alert,
  Space,
  Button,
  theme,
  Divider,
  Flex,
  Statistic,
} from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const CardZakatCalculator: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Card hoverable bordered={false} title="Zakat Calculator">
      <Flex
        gap={token.sizeXXL}
        wrap="wrap"
        justify="space-between"
        align="center"
      >
       <div> 
        Helping you give your Zakat <b>accurately</b> and <b>safely</b>
       </div>
        <Button size="large" icon={<CalculatorOutlined />} type="primary">
          Calculate
        </Button>
      </Flex>
    </Card>
  );
};

export default CardZakatCalculator;
