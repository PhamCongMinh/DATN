import { MenuProps } from 'antd'

export const menuItemsBeforeLogin: MenuProps['items'] = [
  {
    label: <a>Trang chủ</a>,
    key: 'home'
  },
  {
    label: <a>Khóa học</a>,
    key: 'course'
  },
  {
    label: <a>Cuộc thi</a>,
    key: 'rentout'
  },
  {
    label: <a>Blog</a>,
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

export const menuItemsForTeacher: MenuProps['items'] = [
  {
    label: <a>Trang chủ</a>,
    key: 'home'
  },
  {
    label: <a>Quản lý khóa học</a>,
    key: 'manage-course'
  },
  {
    label: <a>Cuộc thi</a>,
    key: 'rentout'
  },
  {
    label: <a>Blog</a>,
    key: 'blog'
  },
  {
    label: <a>Quản lí tài khoản</a>,
    key: 'manage-account'
  }
]

export const menuItemsForStudent: MenuProps['items'] = [
  {
    label: <a>Trang chủ</a>,
    key: 'home'
  },
  {
    label: <a>Khóa học</a>,
    key: 'course'
  },
  {
    label: <a>Cuộc thi</a>,
    key: 'rentout'
  },
  {
    label: <a>Blog</a>,
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
    key: 'course'
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
