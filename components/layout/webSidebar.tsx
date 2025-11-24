"use client";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SidebarItem } from '../../app/config/config';
import "./globals.css";



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
        <div
            className={`
        hidden lg:flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 sticky top-0
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
        >
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b">
                {!isCollapsed && (
                    <h2 className="text-lg font-semibold text-gray-900">菜单</h2>
                )}
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                            {item.children ? (
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
                                                    className={`h-4 w-4 transition-transform flex-shrink-0 ${expandedItems.has(item.name) ? 'rotate-90' : ''
                                                        }`}
                                                />
                                            </>
                                        )}
                                    </button>
                                    {!isCollapsed && expandedItems.has(item.name) && (
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
                            ) : (
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
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 底部 */}
            {!isCollapsed && (
                <div className="p-4 border-t">
                    <div className="text-center text-sm text-gray-500">
                        © 2024 您的品牌
                    </div>
                </div>
            )}
        </div>
    );
}