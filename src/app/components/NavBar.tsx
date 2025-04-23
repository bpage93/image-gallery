import Link from "next/link";
import React from "react";

export default function NavBar() {
    return (
        <nav className="flex gap-4">
            <Link
                href="./src/app/Contact.tsx"
                className="text-white hover:underline"
            >
                Contact
            </Link>

            <Link
                href="./src/app/About.tsx"
                className="text-white hover:underline"
            >
                About
            </Link>
        </nav>
    );
}
