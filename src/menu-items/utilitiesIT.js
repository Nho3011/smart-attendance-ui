// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilitiesIT = {
  id: 'utilitiesIT',
  title: 'Thanh Menu',
  type: 'group',
  children: [
    {
      id: 'util-user',
      title: 'Quản lý người dùng',
      type: 'item',
      url: '/user',
      breadcrumbs: false
    },
    {
      id: 'util-course',
      title: 'Danh sách môn học',
      type: 'item',
      url: '/course',
      breadcrumbs: false
    },
    {
      id: 'util-student',
      title: 'Quản lý sinh viên',
      type: 'item',
      url: '/student',
      breadcrumbs: false
    },
  ]
};

export default utilitiesIT;
