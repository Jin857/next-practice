"use client";

import { useState } from 'react';
import {
    ChevronRightIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '../../app/config/config';

interface SidebarProps {
    /// H5 导航栏
    isOpen: boolean;
    onClose: () => void;
    sidebarItems: SidebarItem[];
}

export default function H5Sidebar({
    isOpen,
    onClose,
    sidebarItems,
}: SidebarProps) {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleExpanded = (name: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(name)) {
            newExpanded.delete(name);
        } else {
            newExpanded.add(name);
        }
        setExpandedItems(newExpanded);
    };

    const isActive = (href: string) => {
        return pathname === href;
    };


    return (
        <div className="lg:hidden">
            {/* 移动端遮罩层 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* 移动端侧边栏 */}
            <div
                className={`
            fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            w-64 lg:hidden
          `}
            >
                <div className="flex flex-col h-full">
                    {/* 头部 */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">菜单</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <XMarkIcon className="h-5 w-5" />
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
                                                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${isActive(item.href)
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="font-medium">{item.name}</span>
                                                </div>
                                                <ChevronRightIcon
                                                    className={`h-4 w-4 transition-transform ${expandedItems.has(item.name) ? 'rotate-90' : ''
                                                        }`}
                                                />
                                            </button>
                                            {expandedItems.has(item.name) && (
                                                <ul className="ml-8 mt-2 space-y-1 border-l border-gray-200 pl-4">
                                                    {item.children.map((child) => (
                                                        <li key={child.name}>
                                                            <Link
                                                                href={child.href}
                                                                onClick={onClose}
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
                                            onClick={onClose}
                                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive(item.href)
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* 底部 */}
                    <div className="p-4 border-t">
                        <div className="text-center text-sm text-gray-500">
                            © 2024 您的品牌
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}