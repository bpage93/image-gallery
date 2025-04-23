"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ImgCard from "./ImgCard";

interface Photo {
    alt: string;
    photographer: string;
    id: number;
    width: number;
    height: number;
    url: string;
    src: { medium: string };
    per_page: number;
    photos: Photo[];
    total_results: number;
    next_page: string;
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

const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const defaultQuery = "travel landmark";

export default function Article({ searchTerm }: ArticleProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuery, setCurrentQuery] = useState<string>("");

    useEffect(() => {
        if (!apiKey) {
            setError(
                "API Key is missing. Please configure it in environment variables."
            );
            setLoading(false);
            setPhotos([]);
            return;
        }

        const queryToFetch =
            searchTerm.trim() === "" ? defaultQuery : searchTerm.trim();

        if (
            queryToFetch === currentQuery &&
            photos.length > 0 &&
            !loading &&
            !error
        ) {
            console.log(
                `Query "${queryToFetch}" hasn't changed, skipping fetch.`
            );
            return;
        }

        const fetchPhotos = async () => {
            console.log(`Fetching photos for query: "${queryToFetch}"`);
            setLoading(true);
            setError(null);

            try {
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
                // eslint-disable-next-line
            } catch (err: any) {
                console.error("Caught error object:", err);
                console.error(
                    "Error fetching photos details:",
                    err.message,
                    err.response?.data
                );

                let errorMessage =
                    "Failed to load photos. Please try again later.";
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        console.error("API Error Status:", err.response.status);
                        console.error("API Error Data:", err.response.data);
                        if (err.response.status === 401) {
                            errorMessage =
                                "Failed to load photos: Invalid API Key.";
                        } else if (err.response.status === 429) {
                            errorMessage =
                                "Failed to load photos: Rate limit exceeded.";
                        } else {
                            errorMessage = `Failed to load photos: Server error (${err.response.status}).`;
                        }
                    } else if (err.request) {
                        console.error("No response received:", err.request);
                        errorMessage =
                            "Failed to load photos: No response from server. Check network connection.";
                    } else {
                        errorMessage = `Failed to load photos: Request setup error (${err.message}).`;
                    }
                } else {
                    errorMessage = `An unexpected error occurred: ${
                        err instanceof Error ? err.message : String(err)
                    }`;
                }

                setError(errorMessage);
                setPhotos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [searchTerm]);

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
                No photos found for "
                {currentQuery ||
                    (searchTerm.trim() === "" ? defaultQuery : searchTerm)}
                ". Try a different search.
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
