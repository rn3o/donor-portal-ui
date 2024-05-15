// @ts-nocheck
import React, { useState, useRef, useEffect, forwardRef, useLayoutEffect } from 'react';
import { Card, Progress, Flex, theme, Button, Drawer, Space, Image, Upload, Input, InputNumber, Typography } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Quill from 'quill';
import "quill/dist/quill.snow.css";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";

Quill.register({
  "modules/toolbar": Toolbar,
  "themes/snow": Snow,
  "formats/bold": Bold,
  "formats/italic": Italic,
  "formats/header": Header,
});


import { ShareAltOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { css } from '@emotion/css';

interface FundraisingListItemProps {
  name: string;
  imgUrl: string;
  completionPercent: number;
  supporterCount: number;
  amountRaised: number;
  target: number;
  dayLeft: number;
  team: string;
}

export const FundraisingListItem: React.FC<FundraisingListItemProps> = ({
  name,
  imgUrl,
  supporterCount,
  completionPercent,
  amountRaised,
  target,
  dayLeft,
  team
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
              gap={token.sizeXXS}
              vertical
            >
              {name}

              {/* if fundraising for team,  */}
              {team &&
                <Flex style={{
                  fontSize: 'smaller',
                  fontWeight: '500',
                  background: token.colorPrimaryBg,
                  width: 'fit-content',
                  borderRadius: token.sizeXS,
                  padding: `${token.sizeXXS}px ${token.sizeXS}px`
                }}>
                  fundraising for&nbsp;<b>{team}</b>
                </Flex>
              }

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
                team={team}
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
                £{amountRaised} / £{target}
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
  team
}) => {

  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [pageName, setPageName] = useState(name);
  const [pageTarget, setPageTarget] = useState(target);

  const handlePageNameChange = (e) => {
    setPageName(e.target.value);
  };
  const handlePageTargetChange = (e) => {
    setPageTarget(e.target.value);
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
        size="large"
        width={480}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              Save Changes
            </Button>
          </Space>
        }
      >
        <Flex vertical gap={0} style={{ marginTop: `-${token.sizeLG}px` }}>

          {team ?
            (
              <>
                Fundraising for {team}
              </>
            ) : (
              <>
                TODO: Fundraise for a team * select a team *
              </>
            )
          }

          <Typography.Title level={5}>Goal</Typography.Title>
          <InputNumber<number>
            style={{ width: '100%' }}
            size="large"
            prefix="£"
            value={pageTarget}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            onChange={handlePageTargetChange}
            required
          />

          <Typography.Title level={5}>For</Typography.Title>
          <Input
            count={{
              show: true,
              max: 60,
            }}
            size="large"
            value={pageName}
            onChange={handlePageNameChange}
          />

          <Typography.Title level={5}>Pictures</Typography.Title>
          <ImageUploader imgUrl={imgUrl} />




          <Typography.Title level={5}>The Story</Typography.Title>
          <Flex>
            <RichTextEditor />
          </Flex>


          <Typography.Title level={5}>Page Cover</Typography.Title>
          <Image
            // width={330}
            src="https://placehold.co/800x240"
          />
          <Button icon={<UploadOutlined />}>Change Cover</Button>


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
      </ImgCrop>
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
    </>
  );
};


// Rich Text Editor
const Delta = Quill.import('delta');

const RichTextEditor: React.FC<FundraisingListItemProps> = () => {

  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  return (
    <div style={{ width: "100%", fontFamily: 'inherit' }}>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Help Us Make a Difference\n', { header: 2 })
          .insert('\n')
          .insert('Dear Supporters,\n\n')
          .insert('As our community faces unprecedented challenges, we are reaching out to you with an urgent appeal. Your support can make a real difference in the lives of those in need.\n\n')
          .insert('Here\'s how your donation can help:\n\n', { header: 3 })
          .insert('\u2022 Provide food and shelter to families displaced\n')
          .insert('\u2022 Fund medical supplies for underserved communities\n')
          .insert('\u2022 Support education initiatives for children affected by conflict\n\n')
          .insert('Together, we can bring hope to those who need it most.\n\n', { bold: true })
          .insert('Your generosity matters. \nJoin us in making a positive impact today.\n\n')
          .insert('Sincerely,\n')
          .insert('The Charity Team\n\n')
          .insert('\"Give charity without delay, for it stands in the way of calamity.\" \n-  Prophet Muhammad ﷺ', { italic: true })
          .insert('\n')
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      {/* <div class="controls">
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
      </div> */}

      {/* <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : 'Empty'}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
      </div> */}
    </div>
  );
};

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);