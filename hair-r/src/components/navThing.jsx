import React from 'react';
import ConnetWalletBtn from './connetWalletBTN'
const navItems = [
    { href: "/", text: "$HAIR" },
    { href: "/nft", text: "NFT" },
    { href: "/hairpaper", text: "Hair Paper" },
];

const NavThing = () => {
    return (
        <nav className="bg-transparent p-2 z-10 flex flex-row items-center justify-between">
            <ul className="list-none flex gap-5 mx-8">
                {navItems.map((item, index) => (
                    <li key={index} className="nav-item">
                        <a href={item.href} className="no-underline text-black font-bold hover:text-gray-500">
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
            <ConnetWalletBtn className="p-4" />
        </nav>
    );
};

export default NavThing;