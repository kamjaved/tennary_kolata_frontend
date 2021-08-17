import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import clsx from "clsx";
import { useTheme, Drawer, CssBaseline, Divider, IconButton } from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";


import MenuSettings from "./MenuSetting";
import { NavBarTop } from "./NavTopBar";
import { useStyles } from "../style/style";
import Routes from '../../Routing/routes'


const MenuBurguer = ({ theme, onDrawerClose }) => {
    const classes = useStyles();

    return (
        <div className={classes.toolbar}>
            <IconButton onClick={onDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
    );
};



export default function EmbedSideNav() {

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <NavBarTop onDrawerOpen={handleDrawerOpen} open={open} />

                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                >
                    <MenuBurguer theme={theme} onDrawerClose={handleDrawerClose} />
                    <Divider />

                    <MenuSettings onDrawerClose={handleDrawerClose} />

                </Drawer>


                <Routes />

            </div>
        </Router>
    );
}
