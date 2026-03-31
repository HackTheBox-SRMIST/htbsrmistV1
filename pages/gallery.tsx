import { GetServerSideProps } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { DBInstance } from "../utils/db.connect";

interface GalleryImage {
    _id: string;
    url: string;
    title?: string;
    alt?: string;
}

interface GalleryProps {
    images: GalleryImage[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const dbInstance = await DBInstance.getInstance();
        const collection = await dbInstance.getCollection("gallery");

        // Fetch items, sort by newest (descending _id implies insertion order)
        const items = await collection.find({}).sort({ _id: -1 }).toArray();
        
        const images = items.map(item => ({
            _id: item._id.toString(),
            url: item.url || item.link || "", 
            title: item.title || null,
            alt: item.alt || item.title || null
        }));

        // Filter out empty URLs just to be safe
        const validImages = images.filter(img => img.url.trim() !== "");

        return {
            props: { images: validImages },
        };
    } catch (e) {
        console.error("Gallery Fetch Error:", e);
        return {
            props: { images: [] }
        }
    }
}

export default function GalleryPage({ images }: GalleryProps) {
    return (
        <div className="bg-transparent min-h-screen font-poppins text-white flex flex-col selection:bg-htb-green selection:text-black">        
            <main className="flex-grow container mx-auto px-4 py-12 mb-20">

                {images.length === 0 ? (
                    <div className="text-center text-gray-500 py-32 text-xl font-light border border-dashed border-[#333] rounded-2xl mx-auto max-w-3xl">
                        No images found in the gallery yet. Stay tuned!
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-2 sm:px-0">
                        {images.map((image, i) => (
                            <div 
                                key={image._id} 
                                className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-lg bg-[#1a1a1a] transition-all duration-300 border border-[#2a2a2a] hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                                style={{
                                    animation: `fade-in-up 0.5s ease-out forwards`,
                                    animationDelay: `${i * 0.05}s`,
                                    opacity: 0
                                }}
                            >
                                <img 
                                    src={image.url} 
                                    alt={image.alt || "HTB SRMIST Gallery image"} 
                                    className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                {image.title && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <p className="text-white font-medium text-lg p-6 w-full truncate relative z-10 bottom-0 shadow-sm border-l-4 border-green-500 ml-4 mb-4 backdrop-blur-sm bg-black/20 rounded-r-md">
                                            {image.title}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
