"use client";

import React from "react";
import "material-symbols";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <header className="bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c] flex justify-center items-center gap-3 min-w-screen h-20 rounded-t-lg">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white ">
                    add_a_photo
                </span>
                <p className="text-white text-2xl">Image Gallery</p>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => {
                        router.push("/about");
                    }}
                >
                    About
                </button>
                <button
                    onClick={() => {
                        router.push("/contact");
                    }}
                >
                    Contact
                </button>

                {/* <Link
                    href="./src/app/about/page.tsx"
                    className="text-white hover:underline"
                >
                    contact
                </Link>

                <Link
                    href="/about/page.tsx"
                    className="text-white hover:underline"
                >
                    about
                </Link> */}
            </div>
        </header>
    );
}
