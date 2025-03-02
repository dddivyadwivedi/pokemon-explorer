import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IPokemonCardProps } from "@/app/interfaces/interface";

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
  const { id, name, image } = pokemon;

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform">
        <div className="flex justify-center">
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs mb-1">#{id.padStart(3, "0")}</p>
          <h2 className="text-lg font-semibold capitalize">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
