import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import { useCreateBlogMutation } from '../../apps/slice/blogs/blogApiSlice';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Blogs() {
    const { userInfo } = useSelector((state) => state.auth);
    const [createBlog, { isLoading, error }] = useCreateBlogMutation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Title and content are required.');
            return;
        }

        try {
            await createBlog({
                title,
                content,
                creator: userInfo.id,
            }).unwrap();
            setTitle('');
            setContent('');
            alert('Blog created successfully!');
        } catch (err) {
            console.error('Failed to create blog:', err);
        }
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>
            Create a New Blog</Typography>
            <form onSubmit={handleCreateBlog}>
                <Typography gutterBottom>
                    <TextField
                        id="standard-textarea"
                        label="Enter a blog title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        multiline
                        variant="standard"
                    />
                    {/*                     <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                    /> */}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Blog Content</Typography>
                <Typography gutterBottom>
                    <ReactQuill
                        id="content"
                        value={content}
                        onChange={setContent}
                        placeholder="Enter your blog content"
                    />
                </Typography>
                {/* <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Blog'}
                </button> */}
                <Typography gutterBottom>
                    <Button variant="outlined" type="submit" disabled={isLoading} endIcon={<SendIcon />}>
                        {isLoading ? 'Creating...' : 'Create Blog'}
                    </Button>
                    </Typography>
            </form>

            {/* {error && <Typography sx={{ fontcolor: 'red' }}>Error: {error.data?.msg || 'Failed to create blog.'}</Typography>} */}
        </>
    );
}
