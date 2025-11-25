"use client";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SidebarItem } from '@/app/config/config';
import "./globals.css";
import { useEffect, useRef, useState } from 'react';

interface SidebarProps {
    /// Web 导航栏
    isCollapsed?: boolean;
    onToggle?: () => void;
    isActive: (url: string) => boolean;
    toggleExpanded: (url: string) => void;
    sidebarItems: SidebarItem[];
    expandedItems: Set<string>;
}

export default function WebSidebar({
    isCollapsed = false,
    onToggle,
    isActive,
    sidebarItems,
    expandedItems,
    toggleExpanded,
}: SidebarProps) {
    return (
        <div className={`hidden lg:flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 sticky top-0 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b">
                {!isCollapsed && (
                    <h2 className="text-lg font-semibold text-gray-900">菜单</h2>
                )}
                <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onToggle}
                >
                    {isCollapsed ? (
                        <ChevronRightIcon className="h-4 w-4" />
                    ) : (
                        <ChevronLeftIcon className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* 导航项 */}
            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    {sidebarItems.map((item) => (
                        <li key={item.name}>
                            <DropdownNavItem
                                item={item}
                                isActive={isActive}
                                isCollapsed={isCollapsed}
                                fistHase={(itemv) => expandedItems.has(itemv)}
                                toggleExpanded={toggleExpanded} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}


interface DropdownNavItemProps {
    /// Web 导航栏
    isCollapsed?: boolean;
    isActive: (url: string) => boolean;
    item: SidebarItem;
    fistHase: (url: string) => boolean;
    toggleExpanded: (url: string) => void;
}

// 下拉菜单导航项组件
function DropdownNavItem({ isCollapsed, isActive, item, fistHase, toggleExpanded }: DropdownNavItemProps) {
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
                className={`flex items-center p-3 rounded-lg transition-colors ${isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                    } ${isCollapsed ? 'web-sidebar-menu-li' : ''}`}
                title={isCollapsed ? item.name : ''}
            >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.name}</span>
                )}
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
            <>
                <button
                    onClick={() => toggleExpanded(item.name)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                        } ${isCollapsed ? 'web-sidebar-menu-li' : ''}`}
                >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                        <>
                            <span className="ml-3 font-medium flex-1 text-left">
                                {item.name}
                            </span>
                            <ChevronRightIcon
                                className={`h-4 w-4 transition-transform flex-shrink-0 ${fistHase(item.name) ? 'rotate-90' : ''}`}
                            />
                        </>
                    )}
                </button>
                {!isCollapsed && fistHase(item.name) && (
                    <ul className="ml-8 mt-2 space-y-1 border-l border-gray-200 pl-4">
                        {item.children.map((child) => (
                            <li key={child.name}>
                                <Link
                                    href={child.href}
                                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${isActive(child.href)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <child.icon className="h-4 w-4" />
                                    <span>{child.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </>

            {/* 下拉菜单 */}
            {isCollapsed && isOpen && (
                <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-opacity-5 z-50 " style={{ position: 'fixed' }}>
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
            )
            }
        </div >
    );
}