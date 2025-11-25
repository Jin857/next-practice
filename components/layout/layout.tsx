"use client";

import { ReactNode, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Footer from '@/components/footer/page';
import { sidebarItems } from '@/app/config/config';
import ResponsiveNavbarPro from './responsiveNavbarPro';

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
                sidebarItems={sidebarItems}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebarCollapse}
            />
            {/* 主内容区域 */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300`}>
                {/* 顶部导航栏 */}
                <ResponsiveNavbarPro sidebarItems={sidebarItems}
                    onToggleSidebar={toggleSidebar}
                    children={<div>自定义内容</div>}
                />
                {/* 页面内容 */}
                <main className="flex-1 p-6 blackgroldcolor">
                    {children}
                </main>
                {/* 页脚 */}
                <Footer />
            </div>
        </div>
    );
}