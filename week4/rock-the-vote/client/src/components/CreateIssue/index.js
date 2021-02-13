import {React, useState, useEffect} from 'react';
import {
    useHistory
} from 'react-router-dom';

const CreateIssue = props => {

    const [issueField, setIssueField] = useState("");
    const history = useHistory();

    useEffect(() => {
        props.setPageHeader("Create an issue");
    }, []);

    const submitIssue = e => {
        e.preventDefault();
        history.push("/issues");
    }

    return ( 
        <form onSubmit={submitIssue}>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Describe your issue:</label>
            <div className="mt-1">
            <textarea name="issue" value={issueField} required onChange={e => setIssueField(e.target.value)} className="w-full min-h-30 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" placeholder="The moon is just a circle in the sky painted by artists.."></textarea>
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create issue
            </button>
        </form>
    );
}

export default CreateIssue;
