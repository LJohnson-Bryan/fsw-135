import {React, useState, useEffect, useContext} from 'react';
import {UserContext} from '../../context/UserProvider';
import {useHistory} from 'react-router-dom';
import Comment from './Comment';
import './styles.css';

const IssuePage = props => {

    const [issue, setIssue] = useState();
    const [byName, setByName] = useState('');
    const [toggle, setToggle] = useState(false);
    const [comments, setComments] = useState();
    const [commentForm, setCommentForm] = useState('');
    const [inputs, setInputs] = useState({
        issue: 'issue'
    })
    const { getOneIssue, user: {username, isAdmin, _id}, deleteIssue, updateIssue, postComment, updateVote } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        props.setPageHeader("Viewing Issue ID#" + props.match.params.issue_id);
        getOneIssue(props.match.params.issue_id, setIssue, setByName, setInputs, setComments);
    }, []);

    const sendUpdate = (obj) => {
        updateIssue(props.match.params.issue_id, obj, setIssue);
    }

    const deleteItem = () => {
        deleteIssue(props.match.params.issue_id, history);
    }

    const actionButtons = 
        username === byName || isAdmin ?
            <div>
                <button type="button" onClick={() => {
                    deleteItem();
                }} class="inline-flex items-center px-3 py-2 mr-2 mt-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Delete Issue
                </button>
                <button type="button" onClick={() => {
                    if(toggle) {
                        setToggle(false);
                        sendUpdate(inputs);
                    } else {
                        setToggle(true);
                    }
                }} class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {toggle ? 'Save Issue' : 'Edit Issue'}
                </button>
            </div> : <div></div>

    return ( 
        <div>
            {issue && byName ? 
            <div className="bg-white shadow min-h-screen overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Issue
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {props.match.params.issue_id}
                    </p>
                    {actionButtons}
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                        Username
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {byName}
                        </dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                        Likes
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {issue.votes.length} likes. <br />
                        <i onClick={() => {
                            updateVote(_id, issue._id, setIssue);
                        }} class={`fa fa-heart reaction ${issue.votes.includes(_id) ? 'active' : ''}`}></i>
                        </dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                        Issue Content
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {toggle ? <textarea id="about" value={inputs.issue} onChange={e => setInputs({issue: e.target.value})} rows="3" className="w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"></textarea> : issue.issue}
                        </dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                        Leave a comment:
                        </dt>
                        <div className="mt-1 mb-6 sm:mt-0 sm:col-span-2">
                            <textarea value={commentForm} onChange={e => setCommentForm(e.target.value)} id="about" name="about" rows="3" className="w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"></textarea>
                            <button type="button" onClick={() => {
                                postComment(props.match.params.issue_id, commentForm, setComments);
                                setCommentForm('');
                            }} class="inline-flex items-center px-3 py-2 mr-2 mt-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit Comment
                            </button>
                        </div>

                        <dt className="text-sm font-medium text-gray-500">
                        Recent Comments:
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        <ul className="divide-y divide-gray-100">
                            
                        {comments ? 
                            comments.map(comment => {
                                return <Comment {...comment} setComments={setComments} />
                            })
                        :
                        'There Are No comments yet! Be the first to make one.'
                        }

                        


                        </ul>
                        </dd>
                    </div>
                    </dl>
                </div>
            </div>
            
            : <h2>Loading...</h2>}
        </div>
    );
}

export default IssuePage;
