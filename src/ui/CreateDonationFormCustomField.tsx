import React from 'react';
import { Input, theme, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

interface CreateDonationFormCustomFieldProps {
  maxChar?: number;
  placeholderTextField?: string;
  placeholderTextArea?: string;
  placeholderDatePicker?: string;
  customFieldType: 'shortText' | 'longText' | 'date';
}

const CreateDonationFormCustomField: React.FC<CreateDonationFormCustomFieldProps> = ({
  maxChar = 60,
  placeholderTextField = 'On behalf of..',
  placeholderTextArea = 'Add some notes',
  placeholderDatePicker = 'Select Date',
  customFieldType,
}) => {
  const { token } = theme.useToken();

  return (
    <>
      {customFieldType === 'shortText' && (
        <Input
          count={{
            show: true,
            max: maxChar,
          }}
          size="large"
          maxLength={maxChar}
          placeholder={placeholderTextField}
          prefix={<EditOutlined style={{ opacity: 0.5 }} />}
        />
      )}
      
      {customFieldType === 'longText' && (
        <TextArea
          count={{
            show: true,
            max: maxChar,
          }}
          placeholder={placeholderTextArea}
        />
      )}

      {customFieldType === 'date' && (
        <DatePicker size="large" placeholder={placeholderDatePicker} />
      )}
    </>
  );
};

export default CreateDonationFormCustomField;
