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

const utilitiesLecturer = {
  id: 'utilitiesLecturer',
  title: 'Thanh Menu',
  type: 'group',
  children: [
    {
      id: 'util-attendance',
      title: 'Điểm danh',
      type: 'item',
      url: '/attendance',
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Xem kết quả điểm danh',
      type: 'item',
      url: '/result',
      breadcrumbs: false
    },
    {
      id: 'lich-giang-day',
      title: 'Lịch giảng dạy',
      type: 'item',
      url: '/plane',
      breadcrumbs: false
    },
    {
      id: 'thong-tin-ca-nhan',
      title: 'Thông tin cá nhân',
      type: 'item',
      url: '/userLecturer',
      breadcrumbs: false
    }
  ]
};

export default utilitiesLecturer;
