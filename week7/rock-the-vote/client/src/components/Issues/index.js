import {React, useEffect, useContext, useState} from 'react';
import IssueCard from '../IssueCard';
import {UserContext} from '../../context/UserProvider';
import { Link } from 'react-router-dom';

const Issues = props => {

    const { issues, getUserIssues } = useContext(UserContext);

    useEffect(() => {
        props.setPageHeader("Current Issues");
        getUserIssues();
    }, []);

    return ( 
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                issues ? 
                issues.reverse().map(item => (
                    <Link to={`/issues/${item._id}`}>
                    <IssueCard 
                        name={item.user}
                        content={item.issue}
                        imgURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
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
