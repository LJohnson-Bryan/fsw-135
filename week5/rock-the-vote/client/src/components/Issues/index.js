import {React, useEffect, useContext} from 'react';
import IssueCard from '../IssueCard';
import {UserContext} from '../../context/UserProvider';
import axios from 'axios';

const Issues = props => {

    const { issues } = useContext(UserContext);

    useEffect(() => {
        props.setPageHeader("Current Issues");
    }, []);

    return ( 
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                issues ? 
                issues.map(item => {

                    let username;
                    axios.get(`/api/user/${item.user}`)
                    .then(res => {
                        username = res.data.username;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    return <IssueCard 
                    name={username}
                    content={item.issue}
                    imgURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                    key={item._id}
                />
                })
                :
                <h3>Loading...</h3> 
            }
        </ul>
    );
}

export default Issues;
