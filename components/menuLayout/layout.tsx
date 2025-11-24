// components/Layout.tsx
"use client";

import { ReactNode, useState } from 'react';
import ResponsiveNavbar from './responsiveNavbar';
import Sidebar from './sidebar';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    /// 用来开启关闭 H5 导航栏
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    /// 用来管理 Web 导航栏
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* 侧边栏 */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebarCollapse}
            />
            {/* 主内容区域 */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300`}>
                {/* 顶部导航栏 */}
                <ResponsiveNavbar onToggleSidebar={toggleSidebar} />
                {/* 页面内容 */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}