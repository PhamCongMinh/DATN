import { MenuProps } from 'antd'

export const menuItemsBeforeLogin: MenuProps['items'] = [
  {
    label: <a>Trang chủ</a>,
    key: 'home'
  },
  {
    label: <a>Tìm trọ</a>,
    key: 'rent'
  },
  {
    label: <a>Cho thuê</a>,
    key: 'rentout'
  },
  {
    label: 'Blog',
    key: 'blog'
  },
  {
    label: <a>Đăng kí</a>,
    key: 'signup'
  },
  {
    label: <a>Đăng nhập</a>,
    key: 'signin'
  }
]

export const menuItemsAfterLogin: MenuProps['items'] = [
  {
    label: <a>Trang chủ</a>,
    key: 'home'
  },
  {
    label: <a>Tìm trọ</a>,
    key: 'rent'
  },
  {
    label: <a>Cho thuê</a>,
    key: 'rentout'
  },
  {
    label: 'Blog',
    key: 'blog'
  },
  {
    label: <a>Quản lí tài khoản</a>,
    key: 'manage-account'
  }
]

export const menuItemsForAdmin: MenuProps['items'] = [
  {
    label: <a>Trang chủ</a>,
    key: 'home'
  },
  {
    label: <a>Tìm trọ</a>,
    key: 'rent'
  },
  {
    label: 'Blog',
    key: 'blog'
  },
  {
    label: <a>Quản lí hệ thống</a>,
    key: 'manage-system'
  },
  {
    label: <a>Quản lí tài khoản</a>,
    key: 'manage-account'
  }
]
