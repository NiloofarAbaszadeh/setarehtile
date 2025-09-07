import ic_analytics from "../../Assets/navbar/ic_analytics.svg"
import ic_inventory from "../../Assets/navbar/images.png"
import ic_latters from "../../Assets/navbar/ic_latters.svg"
import ic_comments from "../../Assets/navbar/ic-comments.svg"
import ic_favorite from "../../Assets/navbar/ic-favorite.svg"
import ic_file from "../../Assets/navbar/ic-file2.svg"

// ----------------------------------------------------------------------

const navConfigNamayandeh = [
  {
    title: 'داشبرد اصلی',
    path: '/dashboard',
    icon: ic_analytics,
  },
  {
    title: 'موجودی کاشی ها',
    path: '/dashboard/inventory',
    icon: ic_inventory,
  },
  {
    title: 'اعلان ها و پیام ها',
    path: '/dashboard/massages',
    icon: ic_latters,
  },
  {
    title: 'نظرات',
    path: '/dashboard/comments',
    icon: ic_comments,
  },
  {
    title: 'کاشی های مورد علاقه',
    path: '/dashboard/favorite-tile',
    icon: ic_favorite,
  },
];

export const navConfigInfo = [
  {
    title: 'داشبرد اصلی',
    path: '/dashboard',
    icon: ic_analytics,
  },
  {
    title: 'فایل ها',
    path: '/dashboard/files',
    icon: ic_file,
  },
];

export const navConfigKarbar = [
  {
    title: 'داشبرد اصلی',
    path: '/dashboard',
    icon: ic_analytics,
  },
  {
    title: 'اعلان ها و پیام ها',
    path: '/dashboard/massages',
    icon: ic_latters,
  },
  {
    title: 'فایل ها',
    path: '/dashboard/files',
    icon: ic_file,
  },
];
export default navConfigNamayandeh;
