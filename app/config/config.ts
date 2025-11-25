"use client";

import {
    HomeIcon,
    ShoppingBagIcon,
    InformationCircleIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';

export interface SidebarItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: SidebarItem[];
}

/// 左侧导航栏
export const sidebarItems: SidebarItem[] = [
    {
        name: '首页',
        href: '/',
        icon: HomeIcon,
    },
    {
        name: '产品',
        href: '/products',
        icon: ShoppingBagIcon,
        children: [
            { name: '所有产品', href: '/products', icon: ShoppingBagIcon },
            { name: '热门产品', href: '/products/popular', icon: ShoppingBagIcon },
            { name: '新品上市', href: '/products/new', icon: ShoppingBagIcon },
        ],
    },
    {
        name: '关于我们',
        href: '/about',
        icon: InformationCircleIcon,
        children: [
            { name: '公司简介', href: '/about/company', icon: InformationCircleIcon },
            { name: '团队介绍', href: '/about/team', icon: InformationCircleIcon },
            { name: '发展历程', href: '/about/history', icon: InformationCircleIcon },
        ],
    },
    {
        name: '联系我们',
        href: '/contact',
        icon: PhoneIcon,
    },
];
