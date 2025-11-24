// components/responsiveNavbar.tsx
"use client";
import { Bars4Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { navigation, NavigationItem } from './config';


interface ResponsiveNavbarProps {
    onToggleSidebar: () => void;
}

export default function ResponsiveNavbar({ onToggleSidebar }: ResponsiveNavbarProps) {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
                <div className="flex items-center gap-x-4">
                    <Link href="/" className="flex items-center">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            Logo
                        </div>
                        <span className="ml-2 text-lg font-semibold text-gray-900 hidden sm:block">
                            品牌名称
                        </span>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item: NavigationItem) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors px-3 py-2 rounded-md"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* 右侧：移动端菜单按钮和用户操作 */}
                <div className="flex items-center gap-x-4">
                    {/* 侧边栏触发按钮 - 移动端 */}
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Bars4Icon className="h-5 w-5 text-gray-600" />
                    </button>
                    {/* 桌面端用户操作 */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <Link
                            href="/login"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                        >
                            登录
                        </Link>
                        <Link
                            href="/register"
                            className="text-sm font-semibold leading-3 bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            注册
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}