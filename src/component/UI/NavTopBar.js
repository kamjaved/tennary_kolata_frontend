import clsx from "clsx";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from '@material-ui/core'
import Logo from '../style/Logo'
import { Link } from 'react-router-dom'

import { useStyles } from "../style/style";


export const NavBarTop = ({ open, onDrawerOpen }) => {
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open
                    })}
                >
                    <MenuIcon />
                </IconButton>


                <Typography className={classes.title} style={{ margin: 5 }} variant="h6" noWrap>
                    Leather-Tennary
                    </Typography>
            </Toolbar>
        </AppBar>
    );
};
