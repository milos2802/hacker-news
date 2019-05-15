import React from 'react';
import classes from './Header.module.css';

const header = (props) => {
    return (
        <header className={classes.Header}>
            <h2 className={classes.Title}>HackerNews</h2>
            <button className={classes.RfrshBtn} onClick={props.refresh}><i className="fa fa-refresh"></i></button>
        </header>
    )
}

export default header;