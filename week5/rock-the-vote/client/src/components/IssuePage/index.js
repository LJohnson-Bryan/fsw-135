import {React, useState, useEffect} from 'react';
import axios from 'axios';

const IssuePage = props => {

    const [issue, setIssue] = useState({});

    useEffect(() => {
        props.setPageHeader("Viewing Issue ID#" + props.match.params.issue_id);
        axios.get(`/api/issue/${props.match.params.issue_id}`)
        .then(res => {
            setIssue(res.data);
            console.log(res)
        })
        .catch(
            err => {
                setIssue({errMsg: "404: Not Found."})
            }
        )
    }, []);

    return ( 
        <div>
            {issue.errMsg ? issue.errMsg : "Data is shown."}
        </div>
    );
}

export default IssuePage;
