import React from "react";

interface ImgCardProps {
    img: string;
    location: string;
    description: string;
}

export default function ImgCard({ img, location, description }: ImgCardProps) {
    return (
        <div className="content flex flex-col justify-items-start gap-4 mt-4 px-4">
            <div>
                <img
                    className="w-full h-60 object-cover rounded-lg"
                    src={img}
                    alt={description}
                />
            </div>
            <div className="info flex flex-col justify-items-start gap-4">
                <div className="location flex items-center gap-1">
                    {" "}
                    <span className="material-symbols-outlined text-red-400">
                        {" "}
                        location_on
                    </span>
                    <p className="font-semibold">{location}</p>
                </div>
                <div className="detail">
                    <p className="text-sm text-gray-700">{description}</p>{" "}
                </div>
            </div>
        </div>
    );
}
