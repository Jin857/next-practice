import { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { SidebarItem } from '@/app/config/config';
import { Bars4Icon } from '@heroicons/react/24/outline';

interface ResponsiveNavbarProProps {
    /// 外部是否存在
    onToggleSidebar?: () => void;
    sidebarItems: SidebarItem[];
    children?: ReactNode;
}

export default function ResponsiveNavbarPro(
    { onToggleSidebar, sidebarItems, children }: ResponsiveNavbarProProps
) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 h-16 lg:px-8" aria-label="Global">
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
                    {children ?? sidebarItems.map((item) => (
                        <DropdownNavItem key={item.name} item={item} />
                    ))}
                </div>

                {/* 右侧：移动端菜单按钮和用户操作 */}
                <div className="flex items-center gap-x-4" >
                    <button
                        onClick={() => { onToggleSidebar != null && children == null ? onToggleSidebar() : setMobileMenuOpen(!mobileMenuOpen) }}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Bars4Icon className="h-5 w-5 text-gray-600" />
                    </button>
                    {/* 桌面端用户操作 */}
                    < div className="hidden lg:flex lg:items-center lg:gap-x-4" >
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
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {sidebarItems.map((item) => (
                            <MobileNavItem key={item.name} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </header >
    );
}

// 移动端导航项组件
function MobileNavItem({ item }: { item: SidebarItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // 如果没有子菜单，渲染普通链接
    if (!item.children || item.children.length === 0) {
        return (
            <Link
                href={item.href}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
            >
                {item.name}
            </Link>
        );
    }

    // 有子菜单，渲染可展开项
    return (
        <div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex justify-between items-center w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
            >
                <span>{item.name}</span>
                {/* 展开图标 */}
                <svg
                    className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* 子菜单项 */}
            {isExpanded && (
                <div className="pl-6">
                    {item.children.map((child) => (
                        <Link
                            key={child.name}
                            href={child.href}
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                        >
                            {child.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// 下拉菜单导航项组件
function DropdownNavItem({ item }: { item: SidebarItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 鼠标进入时打开下拉菜单
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    // 鼠标离开时延迟关闭下拉菜单
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150); // 150ms延迟，避免意外关闭
    };

    // 点击外部区域关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // 如果没有子菜单，渲染普通链接
    if (!item.children || item.children.length === 0) {
        return (
            <Link
                href={item.href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
                {item.name}
            </Link>
        );
    }

    // 有子菜单，渲染下拉菜单
    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
        >
            {/* 主导航项 */}
            <button
                className={`inline-flex items-center px-3 py-2 text-sm font-medium content-center h-16 ${isOpen ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'}`}
            >
                <span>{item.name}</span>
                {/* 下拉图标 */}
                <svg
                    className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {/* 下拉菜单 */}
            {isOpen && (
                <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-opacity-5 z-50">
                    <div className="py-1">
                        {item.children.map((child) => (
                            <Link
                                key={child.name}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}