import React from 'react';
import classes from './PostsList.module.css';
import moment from 'moment';

const postsList = (props) => {
    return (
			<div className={classes.List}>
				{props.stories.map((str, i) => {
					return(
						<span key={str.id}>    
							<div className={classes.SingleStory}>
								<div className={classes.No}>{i+1+props.page}.</div>
								<div>
									<div className={classes.Title}>{str.title}</div>
									<div className={classes.Info}>
										{str.score} points <span className={classes.Muted}>by </span> 
										{str.by} <span className={classes.Muted}>{moment.unix(str.time).startOf('day').fromNow()} | </span>{str.kids ? str.kids.length : '0'} comments
									</div>
								</div>
							</div>
							<hr className={classes.Hr}/>
						</span>
					)
				})}
			</div>

    )
}

export default postsList;