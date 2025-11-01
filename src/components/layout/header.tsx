"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderIcon } from "./header-icon";
import { HeaderSearch } from "./header-search";

type MenuItem = {
    label: string;
    href: string;
}

export function Header() {
    const menu: MenuItem[] = [
        { label: 'Camisa', href: '/categories/camisa'},
        { label: 'Bermuda', href: '/categories/bermuda'}
    ];
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <header className="w-full bg-gray-400">
            <div className="flex max-w-6xl mx-auto justify-between items-center p-6">
                <div className="w-32">
                    <Link href={'/'}>
                        <Image
                        src="/assets/ui/logo-black.png"
                        alt=""
                        width={120}
                        height={40}
                        />
                    </Link>
                </div>
                <div className="flex-1">
                    <div className="w-full hidden md:flex items-center px-6 gap-6">
                        <div className="flex-1">
                            <ul className="flex gap-6">
                                {menu.map(item => (
                                    <li key={item.label}>
                                        <Link href={item.href} key={item.label}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-80">
                            <HeaderSearch/>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href={'/my-orders'}>
                        <HeaderIcon src="/assets/ui/user-line-black.png" alt="Perfil"/>
                    </Link>
                    <Link href={'/cart'}>
                        <HeaderIcon src="/assets/ui/shopping-bag-4-line-black.png" alt="Perfil"/>
                    </Link>
                    <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <HeaderIcon 
                        src="/assets/ui/menu-line-black.png" 
                        alt="Menu"
                        selected={menuOpen}
                        srcSelected="/assets/ui/menu-line-white.png"
                        />
                    </div>
                </div>
            </div>
            {menuOpen &&
                <div className="md:hidden pb-6">
                    {menu.map(item => (
                        <Link href={item.href} key={item.label}>
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div>{item.label}</div>
                                <div>
                                    <Image 
                                    src={'/assets/ui/arrow-up-right.png'} 
                                    alt="Ir para a categoria"
                                    width={24}
                                    height={24}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
            <div className="md:hidden p-6 pt-0">
                <HeaderSearch/>
            </div>
        </header>
    );
}