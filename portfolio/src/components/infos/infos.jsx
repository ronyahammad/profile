import { useEffect } from "react";
import { useGetInfosQuery } from '../../apps/slice/infos/infosApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../apps/slice/LoadingSlice';

import BackgroundCard from "../../styles/BackgroundCard";

export default function Infos() {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetInfosQuery();
    const globalLoading = useSelector((state) => state.loading.loading);
    const isImage = false;

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    if (globalLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.toString()}</div>;
    
    return (
        <>
             
            <BackgroundCard
                isImage={isImage}
                pos="relative"
                width="100%"
                height="50vh"
                filterTag="home"
            />
        </>
    );
}
