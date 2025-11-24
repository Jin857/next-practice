import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { navigation, NavigationItem } from '@/app/config/config';

// 在 NavigationWithDropdown 组件中添加移动端菜单
export default function NavigationWithDropdown() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* 桌面端导航 */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">
                                您的品牌
                            </Link>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                            {navigation.map((item) => (
                                <DropdownNavItem key={item.name} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* 移动端菜单按钮 */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">打开主菜单</span>
                            {/* 菜单图标 */}
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 移动端菜单 */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <MobileNavItem key={item.name} item={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

// 移动端导航项组件
function MobileNavItem({ item }: { item: NavigationItem }) {
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
function DropdownNavItem({ item }: { item: NavigationItem }) {
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
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${isOpen
                    ? 'text-blue-600'
                    : 'text-gray-900 hover:text-blue-600'
                    }`}
            >
                <span>{item.name}</span>
                {/* 下拉图标 */}
                <svg
                    className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* 下拉菜单 */}
            {isOpen && (
                <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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