import { Box, styled } from '@mui/material'
import Infos from "../components/infos/infos"
import WeatherInfo from '../components/apis/WeatherInfo'
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

const BoxType = styled('div')(({ theme }) => ({
    top: '10vh',
    width:'80vw',
    flexGrow: 1,
    height:'100vh', 
    paddingLeft: '30%',
    paddingRight: '20%',
    zIndex: '9',
    position: 'absolute'
}))

export default function Home() {
    return (
        <BoxType>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 4, sm: 2, md: 4,lg:40 }}>
                <h1>Welcome to my Portfolio</h1>
                <WeatherInfo />
            </Stack>
                <Grid size={{ xs: 'grow', md: 6,lg:8 }} >
                    <Infos />
                </Grid>
        </BoxType>
    )

}