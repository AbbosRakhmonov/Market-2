import {
    IoBusiness,
    IoCart,
    IoCash,
    IoExitOutline,
    IoHome,
    IoKeyOutline,
    IoPeople,
    IoQrCode,
    IoSettingsOutline,
    IoWallet
} from 'react-icons/io5'
import {FaCashRegister, FaHandHoldingUsd} from 'react-icons/fa'

const navListForDirector = [
    {
        id: 1,
        label: 'Bosh sahifa',
        icon: <IoHome size={'1.5rem'} />,
        path: '/',
        submenu: false
    },
    {
        id: 2,
        label: 'Maxsulotlar',
        path: 'maxsulotlar',
        icon: <IoCart size={'1.5rem'} />,
        submenu: [
            {
                id: 1,
                label: 'Yaratish',
                icon: true,
                path: 'maxsulotlar/yaratish',
                submenu: [
                    {
                        id: 1,
                        label: 'Kategoriyalar',
                        icon: 'home',
                        path: 'maxsulotlar/yaratish/kategoriyalar'
                    },
                    {
                        id: 2,
                        label: 'Maxsulotlar',
                        icon: 'home',
                        path: 'maxsulotlar/yaratish/maxsulotlar'
                    },
                    {
                        id: 3,
                        label: 'O\'lchov birliklari',
                        icon: 'home',
                        path: 'maxsulotlar/yaratish/ulchov'
                    },
                    {
                        id: 4,
                        label: 'Yetkazib beruvchilar',
                        icon: 'home',
                        path: 'maxsulotlar/yaratish/yetkazuvchilar'
                    }
                ]
            },
            {
                id: 2,
                label: 'Maxsulotlar hisoboti',
                icon: '',
                path: 'maxsulotlar/hisobot',
                submenu: false
            },
            {
                id: 3,
                label: 'Qabul qilish',
                icon: '',
                path: 'maxsulotlar/qabul/qabulqilish',
                submenu: false
            },
            {
                id: 4,
                label: 'Inventarizatsiya',
                icon: true,
                path: 'maxsulotlar/inventarizatsiya',
                submenu: [
                    {
                        id: 1,
                        label: 'Inventarizatsiya',
                        icon: 'home',
                        path: 'maxsulotlar/inventarizatsiya/inventarizatsiya'
                    },
                    {
                        id: 2,
                        label: 'Inventarizatsiyalar',
                        icon: 'home',
                        path: 'maxsulotlar/inventarizatsiya/inventarizatsiyalar'
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        label: 'Sotuv',
        path: 'sotuv/sotish',
        icon: <IoWallet size={'1.5rem'} />,
        submenu: false
    },
    {
        id: 4,
        label: 'Hamkorlar',
        path: 'hamkorlar',
        icon: <IoPeople size={'1.5rem'} />,
        submenu: [
            {
                id: 1,
                label: 'Agentlar',
                icon: '',
                path: 'hamkorlar/agentlar',
                submenu: false
            },
            {
                id: 2,
                label: 'Mijozlar',
                icon: '',
                path: 'hamkorlar/mijozlar',
                submenu: false
            },
            {
                id: 3,
                label: 'Sotuvchilar',
                icon: '',
                path: 'hamkorlar/sotuvchilar',
                submenu: false
            }
        ]
    },
    {
        id: 5,
        label: 'Do\'konlar',
        icon: <IoBusiness size={'1.5rem'} />,
        path: 'dukonlar',
        submenu: [
            {
                id: 1,
                label: 'Filiallar',
                path: 'dukonlar/filiallar',
                icon: '',
                submenu: false
            }
        ]
    },
    {
        id: 6,
        label: 'Xarajatlar',
        icon: <FaHandHoldingUsd size={'1.5rem'} />,
        path: 'xarajatlar',
        submenu: false
    },
    {
        id: 7,
        label: 'Kassa',
        icon: <FaCashRegister size={'1.5rem'} />,
        path: 'kassa',
        submenu: false
    },
    {
        id: 8,
        label: 'Valyuta kursi',
        icon: <IoCash size={'1.5rem'} />,
        path: 'valyuta',
        submenu: false
    }
]
export const navListForSeller = [
    {
        id: 1,
        label: 'Sotuv',
        path: '/',
        icon: <IoWallet size={'1.5rem'} />,
        submenu: false
    }
]
export const navListForAdmin = [
    {
        id: 1,
        label: 'Bosh sahifa',
        icon: <IoHome size={'1.5rem'} />,
        path: '/'
    },
    {
        id: 2,
        label: 'Shtrix Kodlar',
        path: 'maxsulotlar',
        icon: <IoQrCode size={'1.5rem'} />
    },
    {
        id: 3,
        label: 'Do\'konlar',
        icon: <IoBusiness size={'1.5rem'} />,
        path: 'dukonlar',
        submenu: false
    }
]

export const profileList = [
    {
        id: 1,
        label: 'Tahrirlash',
        path: 'shaxsiy/tahrirlash',
        icon: <IoSettingsOutline size={'1rem'} />
    },
    {
        id: 2,
        path: 'shaxsiy/parol',
        label: 'Parolni o\'zgartirish',
        icon: <IoKeyOutline size={'1rem'} />
    },
    {
        id: 3,
        label: 'Chiqish',
        icon: <IoExitOutline size={'1rem'} />
    }
]

export default navListForDirector
