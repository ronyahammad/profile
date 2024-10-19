import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGetWeatherQuery } from '../../apps/slice/infos/weatherApiSlice';

export default function WeatherInfo() {
    const [currentLocation, setCurrentLocation] = useState({ lat: null, lon: null });

    // Only call the API when lat and lon are available
    const { data, isLoading, isError } = useGetWeatherQuery(currentLocation, {
        skip: !currentLocation.lat || !currentLocation.lon, // Skip fetching if lat/lon are null
    });

    // Fetch location based on IP and call the API
    useEffect(() => {
        const fetchIPLocation = async () => {
            try {
                const res = await fetch("https://ipapi.co/json");
                const locationData = await res.json();
                setCurrentLocation({ lat: locationData.latitude, lon: locationData.longitude });
            } catch (error) {
                console.log("IP-based location error:", error.message);
            }
        };
        fetchIPLocation();
    }, []);

    // Fetch weather data based on geolocation
    const handleGeolocationClick = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lon: longitude });
            },
            (error) => console.log("Geolocation error:", error.message)
        );
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isError) {
        return <Typography>Error loading weather data</Typography>;
    }

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card
                variant="outlined"
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    color: 'black',
                }}
            >
                <CardContent>
                    <Typography gutterBottom sx={{ fontSize: 14 }}>
                        Weather Info
                    </Typography>
                    {data ? (
                        <>
                            <Typography variant="h5" component="div">
                                {data.name}, {data.country}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>
                                Temperature: {data.temperature}°C
                            </Typography>
                            <Typography variant="body2">
                                {data.weatherMain} - {data.description}
                            </Typography>
                        </>
                    ) : (
                        <Typography>No data available</Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button onClick={handleGeolocationClick} size="small">
                        Use Geolocation
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
