// @ts-nocheck
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect, forwardRef, useLayoutEffect } from 'react';
import { Avatar, Card, Divider, Segmented, Tooltip, Modal, Flex, theme, Button, Drawer, Space, Image, Upload, Input, InputNumber, Popconfirm, Typography, Select } from 'antd';
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


import { ShareAltOutlined, CopyOutlined, MailOutlined, PlusOutlined, UploadOutlined, CloseOutlined, TeamOutlined } from '@ant-design/icons';

import { css } from '@emotion/css';

interface FundraisingTeamListItemProps {
  name: string;
  imgUrl: string;
  completionPercent: number;
  amountRaised: string;
  teamMember: number,
  supporterCount: number;
  target: number;
  dayLeft: number;
  isOwner: boolean;
  pageRoute: string;
}

export const FundraisingTeamListItem: React.FC<FundraisingTeamListItemProps> = ({
  name,
  imgUrl,
  supporterCount,
  amountRaised,
  teamMember,
  target,
  isOwner, // Destructure isOwner prop
  pageRoute, // Destructure pageRoute prop
}) => {
  const { token } = theme.useToken();
  const isMobile = window.innerWidth < 600;

  const navigate = useNavigate(); // Initialize useNavigate

  const seeFundraisers = () => {
    navigate(pageRoute); // Navigate to the specified route when the button is clicked
  };

  return (
    <Card hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }}
      className={css`&{
        

      border-right: 0px solid ${token.colorPrimary};
      transition: all 0.25s ease-out;
    }
    &:hover {
      // background-color: ${token.colorPrimaryBgHover}15;
    //   border-right: 2px solid ${token.colorPrimary};
      border-right: 2px solid ${token.colorPrimary};
    //   box-shadow: inset -2px 0 0px -0px ${token.colorPrimary};
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
            height: 160,
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
              <Button type="text" icon={<Tooltip title="Share"><ShareAltOutlined /></Tooltip>} />
              {isOwner ? (
              // <Button>Edit Team Page</Button>
              <EditTeam
                name={name}
                imgUrl={imgUrl}
                supporterCount={supporterCount}
                target={target}
              />
              )
                :
                // Render Edit Page button based on isOwner prop
                (<Tooltip title="You are not an organiser of this team"><Button disabled>Edit Team</Button></Tooltip>)
              } 
              <Button icon={<TeamOutlined />} onClick={seeFundraisers}>Fundraisers</Button> {/* Call seeFundraisers function on click */}
            </Flex>
          </Flex>

          <Flex
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{
              flex: 1,
              borderTop: `solid 1px ${token.colorBorder}`,
              paddingTop: token.sizeSM,
              // padding: token.sizeSM,
              //   background: `${token.colorPrimaryBgHover}25`,
              // background: token.colorBgTextHover,
              borderRadius: token.borderRadius,
            }}
          >
            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {supporterCount}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >
                {/* {`${completionPercent}% Collected`} */}
                Total Supporters
              </div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {teamMember}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >Fundraisers</div>
            </Flex>

            <Flex vertical>
              <div style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {amountRaised}
              </div>
              <div
                style={{ fontSize: token.fontSizeSM }}
              >
                {/* {`${dayLeft} Days left`} */}
                Total Fundraised
              </div>
            </Flex>

            {/* <Progress
              strokeColor={token.colorPrimary}
              percent={completionPercent}
              showInfo={false}
            /> */}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FundraisingTeamListItem;


const EditTeam: React.FC<FundraisingListItemProps> = ({
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

  const [pageName, setPageName] = useState(name);
  const [pageTarget, setPageTarget] = useState(target);

  const handlePageNameChange = (e) => {
    setPageName(e.target.value);
  };
  const handlePageTargetChange = (e) => {
    setPageTarget(e.target.value);
  };

  // Segmented
  const [selectedSegment, setSelectedSegment] = useState('Team Page');

  const handleSegmentChange = (value: string) => {
    setSelectedSegment(value);
  };

  return (
    <>
      <Space>
        <Button type="default" onClick={showDrawer}>
          Edit Team
        </Button>
      </Space>
      <Drawer
        title='Edit Team'
        placement="right"
        size="large"
        width={480}
        onClose={onClose}
        open={open}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       Save Changes
        //     </Button>
        //   </Space>
        // }
      >

        <Segmented
        block
          options={[
            {
              label: 'Team Page',
              value: 'Team Page',
            },
            {
              label: 'Fundraisers',
              value: 'Fundraisers',
            },
          ]}
          value={selectedSegment}
          onChange={handleSegmentChange}
        />


        {selectedSegment === 'Team Page' && (
        <Flex vertical gap={0}>

          <Typography.Title level={5}>Team Name</Typography.Title>
          <Input
            size="large"
            value={pageName}
            disabled
          />

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
          <Button size='large' icon={<UploadOutlined />}>Change Cover</Button>


          <Space style={{ marginBottom: token.sizeXXL }}>
            <br />
          </Space>

          <Flex gap={token.sizeSM} style={{ 
            margin: `-${token.sizeLG}px`, 
            padding: `${token.sizeLG}px`, 
            background: token.colorBgBase,
            borderTop: `solid 1px ${token.colorBorder}`,
            position: 'sticky',
            bottom: `-${token.sizeLG}px`,
            boxShadow: token.boxShadow
            }}>
            <Button block>Reset Changes</Button>
            <Button block type='primary'>Save Changes</Button>
          </Flex>

        </Flex>)}

        {selectedSegment === 'Fundraisers' && (
          <TeamMemberList />
        )}
      </Drawer>
    </>
  )
};


const TeamMemberList: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Flex vertical>
      
      <Flex align='center' justify='space-between'>
        <Divider style={{marginTop: token.sizeLG}} orientation="left" orientationMargin="0"><b>Members</b></Divider>
      </Flex>

      <MemberItemActive />
      <InviteModal />
      
      <Divider style={{marginTop: token.sizeLG}} orientation="left" orientationMargin="0"><b>Invitee</b></Divider>
      <MemberItemInvitee />

      <Divider style={{marginTop: token.sizeLG}} orientation="left" orientationMargin="0"><b>Requests</b></Divider>
      <MemberItemRequests />
    </Flex>
  );
};



const MemberItemActive: React.FC = () => {
  const { token } = theme.useToken();

  // Mockup data for names and roles
  const members = [
    { name: 'John Doe', role: 'Organiser' },
    { name: 'Jane Smith', role: 'Organiser' },
    { name: 'Emma Watson', role: 'Organiser' },
    { name: 'Michael Johnson', role: 'Member' },
    { name: 'Emily Brown', role: 'Member' },
    { name: 'Daniel Wilson', role: 'Member' },
    { name: 'Olivia Taylor', role: 'Member' },
    { name: 'Matthew Martinez', role: 'Member' },
    { name: 'Sophia Anderson', role: 'Member' },
    { name: 'William Thomas', role: 'Member' },
    { name: 'Isabella White', role: 'Member' },
    { name: 'David Harris', role: 'Member' },
    { name: 'Mia Clark', role: 'Member' },
    { name: 'James Lewis', role: 'Member' },
    { name: 'Charlotte Walker', role: 'Member' },
    { name: 'Benjamin King', role: 'Member' }
];


  return (
    <>
      <Flex justify='space-between' style={{ width: '100%', paddingBottom: token.sizeSM }}>
        <Space>
          <Avatar size={'large'} src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80' />
          <Typography.Text>Ryan S.</Typography.Text>
        </Space>
        <Space>
          <Select
            style={{ width: '120px' }}
            placeholder="Edit Role"
            defaultValue='Team Owner'
            disabled
          />
          <Button disabled type='text' icon={<CloseOutlined />} />
        </Space>
      </Flex>
      
      {members.map((member, index) => (
        <Flex key={index} justify='space-between' style={{ width: '100%', paddingBottom: token.sizeSM }}>
          <Space>
            {/* Randomizing the avatar source URL with a random number */}
            <Avatar style={{ backgroundColor: token.colorBgTextHover }} size={'large'} src={`https://i.pravatar.cc/${Math.floor(Math.random() * 100)}`} />
            <Typography.Text>{member.name}</Typography.Text>
          </Space>
          <Space>
            <Select
              style={{ width: '120px' }}
              placeholder="Edit Role"
              optionFilterProp="children"
              defaultValue={member.role}
              options={[
                {
                  value: 'Organiser',
                  label: 'Organiser',
                },
                {
                  value: 'Member',
                  label: 'Member',
                },
              ]}
            />

            <Popconfirm
              key={index}
              description="remove from team?"
              // onConfirm={confirm}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type='text' icon={<CloseOutlined />} />
            </Popconfirm>
          </Space>
        </Flex>
      ))}
    </>
  );
};


const MemberItemInvitee: React.FC = () => {
  const { token } = theme.useToken();

  // Mockup data for email addresses
  const invitees = ['john.doe@example.com', 'jane.doe@example.com', 'elon.musk@example.com'];

  return (
    <>
    <Flex style={{ background: token.colorBgTextHover, padding: token.sizeSM, borderRadius: token.sizeXS, marginBottom: token.sizeMD}}>
      Email Lists Invited by Organizers
    </Flex>
      {invitees.map((email, index) => (
        <Flex key={index} justify='space-between' style={{ width: '100%', paddingBottom: token.sizeSM }}>
          <Space>
            {/* Randomizing the avatar source URL with a random number */}
            <Avatar style={{ backgroundColor: token.colorBgTextHover }} size={'large'} src={`https://i.pravatar.cc/${Math.floor(Math.random() * 100)}`} />
            <Typography.Text>{email} </Typography.Text>
          </Space>
          <Space>
            <Button type='text' danger>Revoke</Button>
            <Button>Resend</Button>
          </Space>
        </Flex>
      ))}
    </>
  );
};


const MemberItemRequests: React.FC = () => {
  const { token } = theme.useToken();

  // Mockup data for emails
  const names = ['Alice W.', 'Charlie D.', 'Willy Wonka', 'Winnie T P.', 'Christoper R.'];

  return (
    <>
    <Flex style={{ background: token.colorBgTextHover, padding: token.sizeSM, borderRadius: token.sizeXS, marginBottom: token.sizeMD}}>
      Individual wanted to join as fundraiser member
    </Flex>
      {names.map((email, index) => (
        <Flex key={index} justify='space-between' style={{ width: '100%', paddingBottom: token.sizeSM }}>
          <Space>
            {/* Randomizing the avatar source URL with a random number */}
            <Avatar style={{ backgroundColor: token.colorBgTextHover }} size={'large'} src={`https://i.pravatar.cc/${Math.floor(Math.random() * 100)}`} />
            <Typography.Text>{email} </Typography.Text>
          </Space>

          <Space>
            <Button type='text' danger>Reject</Button>
            <Button>Accept</Button>
          </Space>
        </Flex>
      ))}
    </>
  );
};

const InviteModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
      setIsModalOpen(true);
  };

  const handleOk = () => {
      setIsModalOpen(false);
  };

  const handleCancel = () => {
      setIsModalOpen(false);
  };

  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
      setInputValue(value);
  };

  const handleSelect = (value) => {
      setEmails(value);
  };

  const handleInvite = () => {
      // Here you can implement the logic for inviting emails
      console.log('Inviting emails:', emails);
      // Reset the input value and selected emails after inviting
      setInputValue('');
      setEmails([]);
      setIsModalOpen(false);
      message.success('Invitation Sent');
  };


  return (
      <>
          <Button type='dashed' size='large' key="1" onClick={showModal}>
              Invite others to join
          </Button>
          <Modal title="Invite other to fundraise for Firdaus Fields School" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[]}
          >

              <Typography.Title level={5}>Share a link</Typography.Title>

              <CopyInput />


              <Divider style={{ marginTop: 30 }}>OR</Divider>


              <Typography.Title level={5}>Send Invitation Email</Typography.Title>

              <Flex gap={8}>
                  <Select
                      size='large'
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Type email addresses"
                      value={emails}
                      onChange={handleSelect}
                      suffixIcon={<MailOutlined />}
                      // removeIcon={<CloseOutlined />}
                      onInputKeyDown={(e) => {
                          if (e.keyCode === 13) {
                              // Prevent default behavior of Enter key
                              e.preventDefault();
                              // Manually trigger selection
                              handleSelect([...emails, inputValue.trim()]);
                              setInputValue('');
                          }
                      }}
                      onBlur={() => {
                          if (inputValue.trim() !== '') {
                              handleSelect([...emails, inputValue.trim()]);
                              setInputValue('');
                          }
                      }}
                      tokenSeparators={[',']}
                      notFoundContent={null} // Remove "no data" message
                  >
                  </Select>

                  <Button
                      type="primary"
                      size="large"
                      onClick={handleInvite}
                      disabled={emails.length === 0}
                  >
                      Send Invitation(s)
                  </Button>
              </Flex>

              <Typography.Text type="secondary">Separate by commas (,) to add multiple.</Typography.Text>


          </Modal>
      </>
  );
};


const CopyInput: React.FC = () => {
  const inputValue = 'https://teamup.xyz.org/234234'; // Default value

  const handleCopy = () => {
      const inputElement = document.getElementById('copy-input') as HTMLInputElement;
      inputElement.select();
      document.execCommand('copy');
      message.success('Copied to clipboard');
  };

  return (
      <Input
          id="copy-input"
          defaultValue={inputValue}
          suffix={
              <Button
                  // type="text"
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
              >Copy</Button>
          }
          readOnly
      />
  );
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
          .insert('Team with us\n', { header: 2 })
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