import React from "react";

interface SearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export default function Search({ searchTerm, onSearchChange }: SearchProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="p-4 flex justify-center">
            <input
                type="search"
                placeholder="Search Image"
                value={searchTerm}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
