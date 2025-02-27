import React from 'react';
import ConnetWalletBTN from './react/connetWalletBTN.jsx';

const navItems = [
    { href: "/", text: "$HAIR" },
    { href: "/nft", text: "NFT" },
    { href: "/wp", text: "WhitePaper" },
    { href: "/rmp", text: "RoadMap" }
];

const NavThing = () => {
    return (
        <nav className="bg-transparent p-2 z-10">
            <ul className="list-none flex gap-5">
                {navItems.map((item, index) => (
                    <li key={index} className="nav-item">
                        <a href={item.href} className="no-underline text-black font-bold hover:text-gray-500">
                            {item.text}
                        </a>
                    </li>
                ))}
                <li className="nav-item">
                    <ConnetWalletBTN client:load />
                </li>
            </ul>
        </nav>
    );
};

export default NavThing;