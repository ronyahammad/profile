import { Box, styled } from '@mui/material'
const BoxType = styled('div')(({ theme }) => ({
    top: '10vh',
    width: '100%',
    paddingLeft: '30%',
    justifyContent: "center",
    zIndex: '9',
    position: 'absolute'
}))


export default function Admin (){

    return(
        <BoxType>
            <h3>Hello Admin</h3>
        </BoxType>
    )

}