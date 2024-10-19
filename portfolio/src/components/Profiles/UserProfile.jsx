import { useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../apps/slice/Profiles/profileApiSlice'

import { styled } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import {Typography} from '@mui/material';
import Grid from '@mui/system/Grid';

import CreatePost from '../blogs/CreatePost'
/* import {UserBlogList} from '../blogs/UserBlogList'; */

const BoxType = styled('div')(({ theme }) => ({
    top: '10vh',
    minWidth:'90vw', 
    paddingLeft: '30%',
    justifyContent: "center",
    zIndex: '9',
    position: 'absolute'
}))

export default function UserProfile() {
    const { data: profile, isLoading, error } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [editMode, setEditMode] = useState(false);  
    const [updatedProfile, setUpdatedProfile] = useState({
        name: profile?.name || '',
        bio: profile?.bio || ''
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching profile</p>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setUpdatedProfile({
            name: profile?.name || '',
            bio: profile?.bio || ''
        });
    };

    const handleSaveClick = async () => {
        try {
            await updateProfile(updatedProfile);
            setEditMode(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <BoxType>
            
            <Grid container spacing={{xs:3}} direction={{ xs: 'column', sm: 'row' }}>
                <Grid size={{xs:12,sm: 8,lg:8}} sx={{ backgroundColor: 'transparent' }}>
                <CreatePost />
                </Grid>
                <Grid size={{xs:12,sm:4,lg:4}} sx={{backgroundColor:'transparent'}}>
            <Typography variant="h5" gutterBottom>        
                <Avatar alt="avatar" src={profile.avatar} />
                {editMode ? (
                   <> Hello <TextField
                        label="Name"
                        name="name"
                        size="small"
                        value={updatedProfile.name}
                        onChange={handleInputChange}
                    /> !</>
                ) : (
                    <>Hello {profile.name}!</>
                )}
            </Typography>
            <Divider />
            
                <p> Email: {profile.email}</p>{editMode ? (
                <TextField
                    label="Bio"
                    name="bio"
                    value={updatedProfile.bio}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                />
            ) : (
                <p>Bio: {profile.bio}</p>
                )}
            <Typography gutterBottom>
            {editMode ? (
                <>
                    <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save'}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                        Cancel
                    </Button>
                </>
            ) : (
                <Button variant="outlined" onClick={handleEditClick}>
                    Edit Profile
                </Button>
                            )}</Typography></Grid></Grid>
                
            <Divider />
            {/* <UserBlogList /> */}
        </BoxType>
    )
}