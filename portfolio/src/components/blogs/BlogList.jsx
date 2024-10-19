import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import {Divider} from "@mui/material";
import { useGetBlogListQuery } from '../../apps/slice/blogs/blogApiSlice';
import { setLoading } from '../../apps/slice/LoadingSlice';

export default function BlogList() {
    const dispatch = useDispatch();


    const { data: blogList, isLoading, error } = useGetBlogListQuery();
    const globalLoading = useSelector((state) => state.loading.loading);

    useEffect(() => {

        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    if (globalLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.toString()}</div>;

    if (!blogList || blogList.length === 0) {
        return <Typography variant="h6" gutterBottom>No blog posts found.</Typography>;
    }

    return (
        <>
            <Typography variant='h5' gutterBottom>
                All Blog Posts
            </Typography>
<Divider/>
            {blogList.map((post, index) => (
                <div key={index}>
                    <Typography variant="h6" gutterBottom>
                    {index+1}) {post.title} - by {post.creatorName}
                    </Typography>
                    <Typography variant="body1">
                        {post.content}
                    </Typography>
                    <Typography variant="caption">
                        Created on: {new Date(post.created).toLocaleDateString()}
                    </Typography>
                    <hr />
                </div>
            ))}
        </>
    );
}
