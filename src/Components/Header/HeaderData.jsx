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

const HeaderDataEn = [
    {
        title: 'Home',
        link: '/',
    },
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
        link: '/contact-us'
    }
]

export {HeaderDataEn};
export default HeaderData