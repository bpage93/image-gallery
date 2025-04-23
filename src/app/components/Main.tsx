"use client";

import React, { useState } from "react";
import Article from "./Article";
import Search from "./Search";

export default function Main() {
    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <>
            <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <Article searchTerm={searchTerm} />
        </>
    );
}
