// @ts-nocheck
import React, { useState } from 'react';
import { Card, Progress, Flex, theme, Button, Drawer, Space, Image, Upload, Input, InputNumber, Typography } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';


import { ShareAltOutlined, PlusOutlined } from '@ant-design/icons';

import { css } from '@emotion/css';

interface FundraisingListItemProps {
  name: string;
  imgUrl: string;
  completionPercent: number;
  supporterCount: number;
  amountRaised: string;
  target: string;
  dayLeft: number;
}

export const FundraisingListItem: React.FC<FundraisingListItemProps> = ({
  name,
  imgUrl,
  supporterCount,
  completionPercent,
  amountRaised,
  target,
  dayLeft,
}) => {
  const { token } = theme.useToken();
  const isMobile = window.innerWidth < 600;

  return (
    <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }}
      className={css`&{

      border-right: 0px solid ${token.colorPrimary};
      transition: all 0.25s ease-out;
    }
    &:hover {
      // background-color: ${token.colorPrimaryBgHover}15;
      border-right: 2px solid ${token.colorPrimary};
    }
  `}
    >
      <Flex
        gap={token.sizeXXS}
        wrap="wrap"
        justify="space-between"
        align="center"
        style={{ flex: 1 }}
      >
        <img
          src={imgUrl}
          style={{
            height: 188,
            width: isMobile ? '100%' : '180px',
            objectFit: 'cover',
            borderRadius: token.borderRadius,
            // objectPosition: 'center',
          }}
        />
        {/* </Flex> */}

        <Flex
          gap={token.sizeMD}
          wrap="wrap"
          style={{ flex: 1, padding: token.sizeSM }}
          vertical
        >
          <Flex
            gap={token.sizeSM}
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{ flex: 1 }}
          >
            <Flex
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                flex: 1,
                width: '70%',
              }}
            >
              {name}
            </Flex>

            <Flex gap={token.sizeXS}>
              <Button type="text" icon={<ShareAltOutlined />}>
                Share
              </Button>
              {/* <Button>Edit Page</Button> */}
              <EditPage
                name={name}
                imgUrl={imgUrl}
                supporterCount={supporterCount}
                completionPercent={completionPercent}
                amountRaised={amountRaised}
                target={target}
                dayLeft={dayLeft}
              />
            </Flex>
          </Flex>

          <Flex
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{
              flex: 1,
              padding: token.sizeSM,
              background: token.colorBgTextHover,
              borderRadius: token.borderRadius,
            }}
          >
            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {supporterCount} Supporters
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >{`${completionPercent}% Collected`}</div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {amountRaised} / {target}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >{`${dayLeft} Days left`}</div>
            </Flex>

            <Progress
              strokeColor={token.colorPrimary}
              percent={completionPercent}
              showInfo={false}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FundraisingListItem;


const EditPage: React.FC<FundraisingListItemProps> = ({
  name,
  imgUrl,
  target,
}) => {

  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="default" onClick={showDrawer}>
          Edit Page
        </Button>
      </Space>
      <Drawer
        title='Edit Page'
        placement="right"
        // size="large"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Flex vertical gap={0} style={{ marginTop: `-${token.sizeLG}px` }}>
          <Typography.Title level={5}>Fundraising Target</Typography.Title>
          <InputNumber<number>
            style={{ width: '100%' }}
            size="large"
            prefix="£"
            value={target}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            required
          />

          <Typography.Title level={5}>For</Typography.Title>
          <Input size="large" value={name} />

          <Typography.Title level={5}>Some Pictures</Typography.Title>
            <ImageUploader imgUrl={imgUrl} />
          
          <Typography.Title level={5}>Page Cover</Typography.Title>


          <Typography.Title level={5}>The Story</Typography.Title>

          <Space style={{ marginTop: token.sizeMD }}>
          </Space>

        </Flex>
      </Drawer>
    </>
  )
};


// Image Uploader

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUploader: React.FC<FundraisingListItemProps> = ({
  imgUrl
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: imgUrl
    },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
    <ImgCrop rotationSlider>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </ImgCrop>
    </>
  );
};