const HeaderData = [
    {
        title: 'خانه',
        link: '/',
    },
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
        title: 'نمایندگان',
        dropdown: [
            {
                title: 'نمایندگان داخلی',
                link: './agent/internal-agent',
            },
            {
                title: 'نمایندگان خارجی',
                link: './agent/external-agent',
            },
        ],
    },
    {
        title: 'استخدام',
        link: '/recruitment',
    },
    {
        title: 'تماس با ما',
        link: '/contact-us'
    }
]

export default HeaderData