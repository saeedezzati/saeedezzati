// Components
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RandomPattern from "common/randomPattern/containers/RandomPattern";
import { RestartIcon, ExitIcon } from "icons/CommonIcons";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    root: {
        height: "100vh",
        userSelect: "none",
        fontFamily: "Monoton"
    },
    blur: {
        filter: "blur(10px)",
        pointerEvents: "none"
    },
    board: {
        width: "fit-content"
    },
    score: {
        fontSize: 220,
        textShadow: theme.palette.textShadow,
        color: theme.palette.primary.main
    },
    newGameButton: {
        top: 300,
        width: 300,
        height: 80,
        fontSize: 35,
        position: "absolute",
        fontFamily: "Monoton",
        backgroundColor: theme.palette.secondary.main,
        textShadow: theme.palette.textShadow,
        color: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        },
        zIndex: 1
    },
    timer: {
        width: "100%",
        height: 20,
        margin: "8px 0",
        backgroundColor: theme.palette.primary.main,
        animationDuration: "25s",
        animationFillMode: "forwards",
        animationTimingFunction: "linear",
        filter: theme.palette.iconShadow
    },
    target: {
        height: 80
    },
    choice: {
        cursor: "pointer"
    },
    endGameButtons: {
        maxWidth: 250,
        marginTop: 50
    },
    gameOver: {
        fontSize: 52,
        textShadow: theme.palette.textShadow,
        color: theme.palette.primary.main
    },
    flicker: {
        animation: "$flicker 6s infinite step-end"
    },
    buttonWrapper: {
        width: 100,
        height: 100
    },
    restart: {
        width: 64,
        height: 64,
        cursor: "pointer",
        filter: theme.palette.iconShadow
    },
    exit: {
        width: 64,
        height: 64,
        cursor: "pointer",
        filter: theme.palette.iconShadow
    },
    "@global": {
        "@keyframes timer": {
            "0%": {
                width: "100%"
            },
            "50%": {
                backgroundColor: theme.palette.primary.main
            },
            "100%": {
                width: 0,
                backgroundColor: theme.palette.error.main
            }
        }
    },
    "@keyframes flicker": {
        "0%": { opacity: 1 },
        "3%": { opacity: 0.4 },
        "6%": { opacity: 1 },
        "7%": { opacity: 0.4 },
        "8%": { opacity: 1 },
        "9%": { opacity: 0.4 },
        "10%": { opacity: 1 },
        "89%": { opacity: 1 },
        "90%": { opacity: 0.4 },
        "100%": { opacity: 0.4 }
    }
});


class AlienPage extends Component {

    constructor(props) {
        super(props);
        this.timerNode = React.createRef();
        const hardness = 4;
        this.state = {
            targetValue: parseInt((Math.random() * hardness)),
            level: 0,
            hardness,
            gameOver: false,
            currentDelay: 0,
            started: false
        };
    }
    // componentDidMount() {
    // }
    whichAnimationEvent = () => {
        const el = document.createElement("fakeelement");

        const animations = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd"
        };

        for (const t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
        return animations["animation"];
    }

    handleStartClick = () => {
        this.setState({ started: true }, () => {
            const animationEventEnd = this.whichAnimationEvent();
            if (this.timerNode.current) {
                this.timerNode.current.style.animationName = "timer";
                this.timerNode.current.addEventListener(animationEventEnd, () => {
                    this.setState({ gameOver: true });
                });
            }
        });
    }

    handleRestartClick = () => {
        const { hardness } = this.state;
        this.setState({
            targetValue: parseInt((Math.random() * hardness)),
            level: 0,
            gameOver: false
        }, () => this.handleStartClick());
    }
    handleChoisesClick = index => () => {
        const { targetValue, level, hardness } = this.state;
        const currentDelay = parseFloat(window.getComputedStyle(this.timerNode.current).animationDelay.slice(0, -1));

        if (index === targetValue) {
            this.timerNode.current.style.animationDelay = `${currentDelay + 1}s`;

            this.setState({
                targetValue: parseInt((Math.random() * hardness) + (hardness * (level + 1))),
                level: level + 1
            });
        } else {
            this.timerNode.current.style.animationDelay = `${currentDelay - 0.5}s`;
        }
    }
    render() {
        const { classes, theme } = this.props;
        const { targetValue, level, hardness, gameOver, started } = this.state;

        return (
            <Grid container spacing={0} justify={"center"} alignItems={"center"}>
                {!started &&
                    <Button
                        variant={"outlined"}
                        color="primary"
                        className={classes.newGameButton}
                        onClick={this.handleStartClick}
                    >
                        New Game
                    </Button>
                }
                <Grid container spacing={0} direction={"column"} justify={"flex-start"} alignItems={"center"} className={classNames(classes.root, { [classes.blur]: !started })}>
                    <Grid item className={classes.score}>
                        {level}
                    </Grid>
                    {gameOver
                        ? <Grid item container spacing={0} direction={"column"} justify={"space-between"} alignItems={"center"} className={classes.gameOver}>
                            <Grid item container spacing={0} justify={"center"} alignItems={"center"}>
                                G<span className={classes.flicker}>A</span>M<span className={classes.flicker}>E</span>&nbsp;&nbsp;OVE<span className={classes.flicker}>R</span>
                            </Grid>
                            <Grid item container spacing={0} justify={"space-evenly"} alignItems={"center"} className={classes.endGameButtons}>
                                <IconButton aria-label="Restart" onClick={this.handleRestartClick} className={classes.buttonWrapper}>
                                    <RestartIcon viewBox={"0 0 512 512"} className={classes.restart} fill={theme.palette.primary.main} />
                                </IconButton>
                                <IconButton component={Link} to={"/"} aria-label="Exit" onClick={this.handleExitClick} className={classes.buttonWrapper}>
                                    <ExitIcon viewBox={"0 0 512 512"} className={classes.exit} fill={theme.palette.primary.main}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        : <React.Fragment>
                            <Grid item className={classes.target}>
                                <RandomPattern seed={targetValue} />
                            </Grid>
                            <Grid item container spacing={0} direction={"column"} justify={"center"} alignItems={"center"} className={classes.board}>
                                <Grid item ref={this.timerNode} className={classes.timer} />
                                <Grid container item spacing={1} direction={"row"} justify={"center"} alignItems={"center"}>
                                    {[...new Array(hardness).keys()].map(index => (
                                        <Grid item key={index + level * hardness} onClick={this.handleChoisesClick(index + level * hardness)} className={classes.choice}>
                                            <RandomPattern seed={index + level * hardness} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    }
                </Grid>
            </Grid>
        );
    }
}
AlienPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AlienPage);
