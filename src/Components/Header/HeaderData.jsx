const HeaderData = [
    {
        title: 'درباره ما',
        link: '/about-us',
    },
    {
        title: 'اخبار و مقالات',
        img: true,
        dropdown: [
            {
                title: 'مقالات',
                link: './research',
                img: "https://setarehtile.com/uploads/medium_images_4579ea2513.jfif"
            },
            {
                title: 'اخبار',
                link: '/news',
                img: "https://setarehtile.com/uploads/medium_istockphoto_813136942_612x612_c91ae7b299.jpg"
            },
            {
                title: 'بازدیدها',
                link: '/visits',
                img: "https://setarehtile.com/uploads/medium_P1010695_d142d72246.JPG"
            },
        ],
    },
    {
        title: 'گواهی و افتخارات',
        url: "/api/gwahy-dakhlies?populate=deep&locale=",
        megaitem: true,
        dropdown: [
            {
                title: 'گواهی نامه داخلی',
                link: '/certificate/internal-ce',
                url: "/api/gwahy-dakhlies?populate=deep&locale="
            },
            {
                title: 'گواهی نامه خارجی',
                link: '/certificate/external-ce',
                url: "/api/gwahy-kharjies?populate=deep&locale="
            },
            {
                title: 'افتخارات',
                link: '/certificate/honors',
                url: "/api/aftkharats?populate=deep&locale="
            },
        ],
    },
    {
        title: 'نمایندگی ها',
        img: true,
        dropdown: [
            {
                title: 'نمایندگی های داخلی',
                link: './agent/internal-agent',
                img: "https://setarehtile.com/uploads/medium_images_d10f008d15.jpg"
            },
            {
                title: 'نمایندگی های خارجی',
                link: './agent/external-agent',
                img: "https://setarehtile.com/uploads/medium_globe_63ab8b93bb.webp"
            },
        ],
    },
    {
        title: 'محصولات',
        url: '/api/collectionss?populate[profileImage][populate][1]=formats&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=3&locale=',
        megaitem: true,
        dropdown: [
            {
                title: 'کلکسیون ها',
                link: './product-collection',
                url: '/api/collectionss?populate[profileImage][populate][1]=formats&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=3&locale='
            },
            {
                title: 'گروه ها',
                link: '/product-groups',
                url: '/api/groupss?populate[GroupImage][populate][1]=formats&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=3&locale='
            },
            {
                title: 'کاشی ها',
                link: '/product-tilse',
                url: '/api/products?populate[image][populate][1]=formats&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=3&locale='
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
        img: true,
        dropdown: [
            {
                title: "نمایندگان",
                link: "https://setarehsurvey.ir/index.php/176623",
                img: "https://setarehtile.com/uploads/medium_pngtree_creative_business_portrait_exposure_synthetic_business_background_image_262881_2ba997934b.jpg"
            },
            {
                title: "تامین کنندگان",
                link: "https://setarehsurvey.ir/index.php/186919",
                img: "https://setarehtile.com/uploads/medium_no_people_desk_with_multiple_computers_call_center_office_used_by_telemarketing_agents_answer_phone_calls_helpline_empty_space_with_technology_give_assistance_customer_care_bf997f746a.jpg"
            },
            {
                title: "انبوه سازان",
                link: "https://setarehsurvey.ir/index.php/323714",
                img: "https://setarehtile.com/uploads/medium_Company_Background_7a5c6db010.jpg"
            },
            {
                title: "مصرف کنندگان",
                link: "https://setarehsurvey.ir/index.php/765223",
                img: "https://setarehtile.com/uploads/medium_pngtree_partnership_of_companies_collaboration_business_technology_internet_concept_image_15659993_a490534e11.jpg"
            },
            {
                title: "عمومی",
                link: "https://setarehsurvey.ir/index.php/553657",
                img: "https://setarehtile.com/uploads/medium_360_F_935512195_a_Car41hh9vks_U_Wl_B4_Kv_XZ_6qs_R_Bt_V2_XN_0_c6a5e7577c.jpg"
            },
            {
                title: "ایمنی",
                link: "https://setarehsurvey.ir/index.php/669591",
                img: "https://setarehtile.com/uploads/medium_pngtree_technology_companies_sci_fi_poster_blue_business_background_picture_image_714919_db372d5bac.jpg"
            },
            // {
            //     title: "ثبت شکایات",
            //     link: "/",
            //     img: "https://setarehtile.com/uploads/custom_pm_12607_10_10474_rjywt5919w_2001_58646_1338543560_82d80b34ac.jpg"
            // },
        ],
    },
    {
        title: 'ارتباط با ما',
        img: true,
        dropdown: [
            {
                title: 'تماس با ما',
                link: "/contact-us",
                img: "https://setarehtile.com/uploads/medium_Contact_Us_de03fb2cdd.jpg"
            },
            {
                title: 'درخواست استخدام',
                link: '/recruitment',
                img: "https://setarehtile.com/uploads/medium_3de3e449c0423b70cfdcba45ce657ed6_2b85f859fd.png"
            },
            {
                title: "درخواست نمایندگی",
                link: "/",
                img: "https://setarehtile.com/uploads/medium_business_handshake_office_business_handshake_office_101469969_0a09903493.webp"
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