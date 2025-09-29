const HeaderData = [
    {
        title: 'درباره ما',
        link: '/about-us',
    },
    {
        title: 'اخبار و مقالات',
        dropdown: [
            {
                title: 'مقالات',
                link: './research',
            },
            {
                title: 'اخبار',
                link: '/news',
            },
            {
                title: 'بازدیدها',
                link: '/visits',
            },
        ],
    },
    {
        title: 'گواهی و افتخارات',
        dropdown: [
            {
                title: 'گواهی نامه داخلی',
                link: './certificate/internal-ce',
            },
            {
                title: 'گواهی نامه خارجی',
                link: './certificate/external-ce',
            },
            {
                title: 'افتخارات',
                link: './certificate/honors',
            },
        ],
    },
    {
        title: 'نمایندگی ها',
        dropdown: [
            {
                title: 'نمایندگی های داخلی',
                link: './agent/internal-agent',
            },
            {
                title: 'نمایندگی های خارجی',
                link: './agent/external-agent',
            },
        ],
    },
    {
        title: 'محصولات',
        dropdown: [
            {
                title: 'کلکسیون ها',
                link: './product-collection',
            },
            {
                title: 'گروه ها',
                link: '/product-groups',
            },
            {
                title: 'کاشی ها',
                link: '/product-tilse',
            },
        ],
    },
    
    {
        title: 'کاتالوگ',
        link: '/catalog',
    },
    {
        title: 'نظرسنجی',
        link: "/survay",
        dropdown: [
            {
                title: "نمایندگان",
                link: "https://setarehsurvey.ir/index.php/176623",
            },
            {
                title: "تامین کنندگان",
                link: "https://setarehsurvey.ir/index.php/186919",
            },
            {
                title: "انبوه سازان",
                link: "https://setarehsurvey.ir/index.php/323714",
            },
            {
                title: "مصرف کنندگان",
                link: "https://setarehsurvey.ir/index.php/765223",
            },
            {
                title: "عمومی",
                link: "https://setarehsurvey.ir/index.php/553657",
            },
            {
                title: "ایمنی",
                link: "https://setarehsurvey.ir/index.php/669591",
            },
            {
                title: "ثبت شکایات",
                link: "/",
            },
        ],
    },
    {
        title: 'ارتباط با ما',
        dropdown: [
            {
                title: 'تماس با ما',
                link: "/contact-us",
            },
            {
                title: 'درخواست استخدام',
                link: '/recruitment',
            },
            {
                title: "درخواست نمایندگی",
                link: "/",
            }
        ],
    },
]

const HeaderDataEn = [
    {
        title: 'About Us',
        link: '/about-us',
    },
    {
        title: 'News & Articles',
        dropdown: [
            {
                title: 'Researches',
                link: './research',
            },
            {
                title: 'News',
                link: '/news',
            },
            {
                title: 'Visits',
                link: '/visits',
            },
        ],
    },
    {
        title: 'Certificate',
        dropdown: [
            {
                title: 'Internal CE',
                link: './certificate/internal-ce',
            },
            {
                title: 'External CE',
                link: './certificate/external-ce',
            },
            {
                title: 'Honors',
                link: './certificate/honors',
            },
        ],
    },
    {
        title: 'Product',
        dropdown: [
            {
                title: 'Collections',
                link: './product-collection',
            },
            {
                title: 'Groups',
                link: '/product-groups',
            },
            {
                title: 'Tiles',
                link: '/product-tilse',
            },
        ],
    },
    {
        title: 'Catalogs',
        link: '/catalog',
    },
    {
        title: 'Egents',
        dropdown: [
            {
                title: 'Internal Egents',
                link: './agent/internal-agent',
            },
            {
                title: 'External Egents',
                link: './agent/external-agent',
            },
        ],
    },
    // {
    //     title: 'Recruitment',
    //     link: '/recruitment',
    // },
    {
        title: 'Contact Us',
        dropdown: [
            {
                title: "Contact Info",
                link: "/contact-us",
            },
        ],
    }
]

export {HeaderDataEn};
export default HeaderData