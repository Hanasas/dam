import React, { useMemo, useState } from 'react';
import {
  HomeOutlined,
  HeartOutlined,
  CustomerServiceOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { musics } from '../../types/Music'; 
import { images } from '../../types/Image';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { MusicPlayer } from '../Music/MusicPlay';
import { MusicList } from '../Music/MusicList';
import { ImagePlayer } from '../Image/ImagePlay';
import { VideoPlayer } from '../Video/VideoPlay';
import { videos } from '../../types/Video';
const { Header, Content, Sider } = Layout;

type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('主页', '1', <HomeOutlined />),
  getItem('音乐', 'sub1', <CustomerServiceOutlined />, [
    getItem('播放', '2'),
    getItem('列表', '3'),
  ]),
  getItem('图片', 'sub2', <PictureOutlined />, [
    getItem('播放', '4'),
    getItem('列表', '5'),
  ]),
  getItem('视频', 'sub3', <PlaySquareOutlined />, [
    getItem('播放', '6'),
    getItem('列表', '7'),
  ]),
  getItem('上传', '8', <UploadOutlined />),
  getItem('下载', '9', <DownloadOutlined />),
  getItem('喜欢', '10', <HeartOutlined />),
];

const isMenuItem = (item: any): item is MenuItem => {
  return item && typeof item === 'object' && 'key' in item && 'label' in item;
};

const findBreadcrumbPath = (
  items: MenuItem[],
  key: string,
  path: MenuItem[] = []
): MenuItem[] => {
  for (const item of items) {
    if (item){
    if (item.key === key) {
      return [...path, item];
    }
    if (isMenuItem(item) && item.children) {
      const foundPath = findBreadcrumbPath(item.children, key, [...path, item]);
      if (foundPath.length) {
        return foundPath;
      }
    }
  }
  }
  return [];
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [MusicIndex, setMusicIndex] = useState(0);
  const [ImageIndex, setImageIndex] = useState(0);
  const [VideoIndex, setVideoIndex] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [currentMenuItem, setCurrentMenuItem] = useState('1');

  const breadcrumbPath = useMemo(() => {
    return findBreadcrumbPath(items, currentMenuItem);
  }, [currentMenuItem, items]);

  const breadcrumbItems = useMemo(() => {
    return breadcrumbPath.map((item, index) => (
      <Breadcrumb.Item key={item.key}>
        {index === breadcrumbPath.length - 1 ? item.label : <a href={`#${item.key}`}>{item.label}</a>}
      </Breadcrumb.Item>
    ));
  }, [breadcrumbPath]);

  const onMusicIndexChange = (index: number) => {
    setMusicIndex(index);
    setCurrentMenuItem('2');
  };

  const onImageIndexChange = (index: number) => {
    setImageIndex(index);
    setCurrentMenuItem('4');
  };

  const onVideoIndexChange = (index: number) => {
    setVideoIndex(index);
    setCurrentMenuItem('6');
  };

  const content = useMemo(() => {
    switch(currentMenuItem) {
      case '1':
        return <div>主页</div>;
      case '2':
        return <MusicPlayer musics={musics} currentMusicIndex={MusicIndex}></MusicPlayer>;
      case '3':
        return <MusicList />;
      case '4':
        return <ImagePlayer images={images} currentImageIndex={ImageIndex}></ImagePlayer>;
      case '5':
        return <div>列表</div>;
      case '6':
        return <VideoPlayer videos={videos} currentVideoIndex={VideoIndex}></VideoPlayer>;
      case '7':
        return <div>列表</div>;
      case '8':
        return <div>上传</div>;
      case '9':
        return <div>下载</div>;
      case '10':
        return <div>喜欢</div>;
      default:
        return <div>主页</div>;
    
    }
  }, [currentMenuItem]);

  const onMenuClick = (e: { key: React.SetStateAction<string>; }) => {
    setCurrentMenuItem(e.key);
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onMenuClick}/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
           {breadcrumbItems}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer , display: 'flex', justifyContent: 'center' }}>
            {content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;