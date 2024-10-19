import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useGetInfosQuery } from '../apps/slice/infos/infosApiSlice';

const delay = 2500;

const imageSlide = [
    "https://images.unsplash.com/photo-1725610588109-71d0def86e19",
    "https://images.unsplash.com/photo-1725610588095-f117c0e2a921",
    "https://images.unsplash.com/photo-1725610588142-b2b0a03c29d4",
    "https://images.unsplash.com/photo-1725610588086-b9e38da987f7",
    "https://images.unsplash.com/photo-1711998431907-61f9b72aabdd"
];

export default function BackgroundCard({ isImage, pos, width, height, filterTag }) {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const { data, isLoading, isError } = useGetInfosQuery();  // Add isError for error handling

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        setIndex(0);
    }, [data, isImage]);

    useEffect(() => {
        if (isLoading || !data) return;
        resetTimeout();

        const slideData = isImage ? imageSlide : data || [];
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) => (prevIndex === slideData.length - 1 ? 0 : prevIndex + 1)),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index, isImage, data, isLoading]);

    
    const filteredData = data && filterTag
        ? data.filter((info) => info.tags.includes(filterTag))
        : [];

    const ImageSlider = () => {
        return (
            <>
                {imageSlide.map((img, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: 'inline-block',
                            width: width,
                            height: height,
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                ))}
            </>)
    };

    const ContentSlider = () => {
        return (
            <>
                {filteredData.map((info, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            display: 'inline-block',
                            width: '30vw',
                            height: '50vh',
                            transform: 'translate(10%, 10%)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'ease 2000ms',
                            opacity: isLoading ? 0 : 1,
                        }}
                    >
                        <h2>{info.title}</h2>
                        <h4>{info.subtitle}</h4>
                        <p>{info.content}</p>
                    </Box>
                ))}
            </>
        );
    };

    // Return early if loading or error
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <Box
            sx={{
                position: pos,
                top: 0,
                left: 0,
                width: `${isImage ? imageSlide.length * width : (filteredData.length * 50)}vw`,
                height: height,
                zIndex: -1,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: `${isImage ? imageSlide.length * 100 : (filteredData.length * 50)}vw`,
                    transition: 'ease 2000ms',
                    transform: `translate3d(${-index * (isImage ? 100 : 50)}vw, 0, 0)`,
                }}
            >
                {isImage ? <ImageSlider /> : <ContentSlider />}
            </Box>
        </Box>
    );
}
