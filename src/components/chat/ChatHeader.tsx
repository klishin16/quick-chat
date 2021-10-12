import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography, useTheme} from "@mui/material/index";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowDimensions from "../../hooks/useWindowDimensions";


interface IChatHeaderProps {
    title: string;
    description: string;
    chatHeaderActions?: () => JSX.Element
}

const ChatHeader: React.FC<IChatHeaderProps> = ({title, description, chatHeaderActions}) => {
    const [isMobile, setIsMobile] = useState(false);
    const {width} = useWindowDimensions()
    const theme = useTheme()
    useEffect(() => {
        setIsMobile(theme.breakpoints.values.sm > width)
    })

    return isMobile ? (
        <Accordion disableGutters square style={{zIndex: 2}}>
            <AccordionSummary

                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
            >
                <Typography variant={"h5"}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant={"subtitle1"}>
                    {description}
                </Typography>
            </AccordionDetails>
        </Accordion>
    ) : (
        <React.Fragment>
            <Grid container p={2} sx={{boxSizing: "border-box", width: '100%'}}
                  display={'flex'}
                  justifyContent={"space-between"}
                  flexWrap={"nowrap"}
                  alignItems={"center"}
            >
                <Grid item container sx={{boxSizing: "border-box"}} flexDirection={"column"}>
                    <Typography variant={"h5"} color={theme.palette.primary.main}>{title}</Typography>
                    <Typography variant={"subtitle1"} color={theme.palette.text.primary}>{description}</Typography>
                </Grid>
                <Grid item>
                    {chatHeaderActions && chatHeaderActions()}
                </Grid>
            </Grid>
            <Divider/>
        </React.Fragment>
    )
};

export default ChatHeader;
