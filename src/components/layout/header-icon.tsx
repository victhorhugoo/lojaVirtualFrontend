import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    selected?: boolean;
    srcSelected?: string;
}

export const HeaderIcon = ({ src, alt, selected, srcSelected }: Props) => {
    return (
        <div className={`flex justify-center items-center size-12 border-gray-200 rounded-2xl ${selected ? 'bg-blue-300' : ' hover:bg-white/50' }`}>
            {/* se não estiver selecionado */}
            {! selected &&
                <Image 
                src={src} 
                alt={alt}
                width={24}
                height={24}
                className="size-6"
                />
            }
            {/* se estiver selecionado */}
            { selected && srcSelected &&
                <Image 
                src={srcSelected} 
                alt={alt}
                width={24}
                height={24}
                className="size-6"
                />}
        </div>
    );
}