import { Box, styled } from '@mui/material'
const BoxType = styled('div')(({ theme }) => ({
    top: '10vh',
    width: '100%',
    paddingLeft: '50%',
    justifyContent: "center",
    zIndex: '9',
    position: 'absolute'
}))

export default function About() {

    return (
        <BoxType>
            <h3>About me</h3>
        </BoxType>
    )

}