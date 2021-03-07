import {React, useEffect, useContext, useState} from 'react';
import IssueCard from '../IssueCard';
import {UserContext} from '../../context/UserProvider';
import { Link } from 'react-router-dom';

const Issues = props => {

    const { issues, getUserIssues, getProfilePicture } = useContext(UserContext);

    useEffect(() => {
        props.setPageHeader("Current Issues");
        getUserIssues();
    }, []);

    return ( 
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                issues ? 
                issues.sort((a, b) => b.votes.length - a.votes.length).map(item => (
                    <Link to={`/issues/${item._id}`}>
                    <IssueCard 
                        name={item.user}
                        content={item.issue}
                        key={item._id}
                        />  
                    </Link>
                ))
                :
                <h3>Loading...</h3> 
            }
        </ul>
    );
}

export default Issues;
