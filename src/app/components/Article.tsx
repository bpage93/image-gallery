"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ImgCard from "./ImgCard";

interface Photo {
    id: number;
    photographer: string;
    src: {
        medium: string;
    };
    alt: string;
}

interface PexelsResponse {
    page: number;
    per_page: number;
    photos: Photo[];
    total_results: number;
    next_page: string;
}

interface ArticleProps {
    searchTerm: string;
}

export default function Article({ searchTerm }: ArticleProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuery, setCurrentQuery] = useState<string>("");

    const apiKey = "ayFhcbDQ6bfoJLQbUAYMmgcS2Kneafe3JceyoyIg9qmLJ3eacjJqqahU";

    const defaultQuery = "travel landmark";

    useEffect(() => {
        const queryToFetch =
            searchTerm.trim() === "" ? defaultQuery : searchTerm;

        if (queryToFetch === currentQuery && photos.length > 0 && !loading) {
            return;
        }

        const fetchPhotos = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log(`Fetching photos for query: "${queryToFetch}"`);
                const response = await axios.get<PexelsResponse>(
                    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                        queryToFetch
                    )}&per_page=12`,
                    {
                        headers: {
                            Authorization: apiKey,
                        },
                    }
                );

                setPhotos(response.data.photos);
                setCurrentQuery(queryToFetch);
            } catch (err: any) {
                console.error("Error fetching photos:", err);

                let errorMessage =
                    "Failed to load photos. Please try again later.";
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    errorMessage = "Failed to load photos: Invalid API Key.";
                } else if (axios.isAxiosError(err) && err.request) {
                    errorMessage =
                        "Failed to load photos: No response from server.";
                }
                setError(errorMessage);
                setPhotos([]);
                setCurrentQuery("");
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [searchTerm, apiKey]);

    if (loading) {
        return (
            <p className="text-center mt-8 animate-pulse">Loading photos...</p>
        );
    }

    if (error) {
        return <p className="text-center mt-8 text-red-600">Error: {error}</p>;
    }

    if (photos.length === 0) {
        return (
            <p className="text-center mt-8">
                No photos found for "{currentQuery}". Try a different search.
            </p>
        );
    }

    return (
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {photos.map((photo) => (
                <ImgCard
                    key={photo.id}
                    img={photo.src.medium}
                    location={photo.photographer}
                    description={photo.alt}
                />
            ))}
        </article>
    );
}
