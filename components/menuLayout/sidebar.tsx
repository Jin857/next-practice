// components/Sidebar.tsx
"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import H5Sidebar from './h5Sidebar';
import { sidebarItems } from './config';
import WebSidebar from './webSidebar';



interface SidebarProps {
    /// H5 导航栏
    isOpen: boolean;
    onClose: () => void;
    /// Web 导航栏
    isCollapsed?: boolean;
    onToggle?: () => void;
}

export default function Sidebar({
    isOpen,
    onClose,
    isCollapsed = false,
    onToggle
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

    return <>
        <H5Sidebar
            isOpen={isOpen}
            onClose={onClose}
            sidebarItems={sidebarItems}
        />
        <WebSidebar
            isCollapsed={isCollapsed}
            onToggle={onToggle}
            isActive={isActive}
            sidebarItems={sidebarItems}
            expandedItems={expandedItems}
            toggleExpanded={toggleExpanded}
        />
    </>;
}