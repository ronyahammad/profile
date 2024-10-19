import { Box, styled } from '@mui/material'
const BoxType = styled('div')(({ theme }) => ({
    top: '10vh',
    width: '100%',
    paddingLeft: '50%',
    justifyContent: "center",
    zIndex: '9',
    position: 'absolute'
}))
export default function Contact() {

    return (
        <BoxType>
            <h3>Contact page</h3>
        </BoxType>
    )

}