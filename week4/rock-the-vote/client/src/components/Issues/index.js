import {React, useEffect} from 'react';
import IssueCard from '../IssueCard';

const Issues = props => {

    useEffect(() => {
        props.setPageHeader("Current Issues");
    }, []);

    return ( 
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <IssueCard 
            name="Jane Doe"
            content="John doe does not like politics!"
            imgURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
            />
            <IssueCard 
            name="Jane Doe"
            content="John doe does not like politics!"
            imgURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
            />
            <IssueCard 
            name="Jane Doe"
            content="John doe does not like politics!"
            imgURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
            />
            <IssueCard 
            name="Jane Doe"
            content="John doe does not like politics!"
            imgURL="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
            />
        </ul>
    );
}

export default Issues;
