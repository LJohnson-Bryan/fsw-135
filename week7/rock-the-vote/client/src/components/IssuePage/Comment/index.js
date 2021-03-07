import {React, useState, useContext, useEffect} from 'react';
import {UserContext} from '../../../context/UserProvider';

const Comment = (props) => {

    const {user: {username, isAdmin, _id}, updateComment, getCommentUsername, deleteComment } = useContext(UserContext);
    const [commentUsername, setCommentUsername] = useState('Loading...');
    const [data, setData] = useState(props);
    const [toggle, setToggle] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState(props.comment);
    const {setComments} = props;


    useEffect(() => {
        getCommentUsername(props.user, setCommentUsername)
    }, []);

    return ( 
        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div className="w-0 flex-1 flex items-center">
                {editing ? 
                <div>
                    <textarea type="text" name="comment" id="comment" className="border-gray-300 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2 sm:text-sm rounded-md ml-3" onChange={e => setEditForm(e.target.value)} value={editForm} placeholder="Enter Your Comment.." />
                    <button type="button" onClick={() => {
                        updateComment(data._id, {
                            comment: editForm
                        }, setData);
                        setEditing(false);
                    }} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Comment
                    </button>
                </div>:
                <p><b>{ commentUsername }</b><br /><span>
                {data.comment}</span></p>}
            </div>
            <div className="relative inline-block text-left">
                {_id === props.user || isAdmin ? <div>
                    <button onClick={() => setToggle(!toggle)} className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <span className="sr-only">Open options</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                    </button>
                </div> : <div></div>}

                <div className={`${toggle ? 'transition ease-out duration-100 transform opacity-100 scale-100' : 'transition ease-in duration-75 transform opacity-0 hidden scale-95'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a onClick={e => {
                        deleteComment(props._id, setComments);
                    }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete</a>
                    <a onClick={e => {
                        setEditing(true);
                        setToggle(false);
                    }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</a>
                    
                    </div>
                </div>
            </div>

        </li>
    );  
}

export default Comment;  
