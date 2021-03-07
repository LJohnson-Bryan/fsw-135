import {React, useState, useEffect, useContext} from 'react';
import { UserContext } from '../../context/UserProvider';
import IssueCard from '../IssueCard';
import {Link} from 'react-router-dom';

const Profile = props => {

    const { user: {username, _id, profileImg}, issues, getUserIssues, submitUserChanges } = useContext(UserContext);
    const [userData, setUserData] = useState({username: username, profileImg: profileImg})
    const [toggle, setToggle] = useState(false);
    const [profileIssues, setProfileIssues] = useState(issues);

    useEffect(() => {
        props.setPageHeader("Your Profile");
        getUserIssues();
    }, []);

    const submitChanges = () => {
        submitUserChanges(_id, {profileImg: userData.profileImg, username: userData.username})
        setToggle(false);
    }

    const issueMap = profileIssues.reverse().map(issue => {
            if(issue.user == _id) {
                return <Link to={`/issues/${issue._id}`}>
                    <IssueCard 
                    name={_id}
                    imgURL={profileImg}
                    content={issue.issue}
                    key={issue._id}
                    />
                </Link>
            }
        }
    )

    return ( 
        <div>
            <div className="flex items-center mb-5">
                <img className="inline-block h-14 w-14 rounded-full mr-5" src={profileImg} alt="" />
                {toggle ? 
                <form onSubmit={submitChanges}>
                    <label htmlFor="name" className="sr-only">username</label>
                    <p className="sm:block md:block lg:inline xl:inline">Username:</p> <input type="text" name="name" id="name" className="border-gray-300 mr-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ml-3" onChange={e => setUserData({...userData, username: e.target.value})} value={userData.username} placeholder="Your Name" />
                    <label htmlFor="profilelink" className="sr-only">profile image link</label>
                    <p className="sm:block md:block lg:inline xl:inline">Image Link:</p> <input type="text" name="profilelink" id="profilelink" className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ml-3" onChange={e => setUserData({...userData, profileImg: e.target.value})} value={userData.profileImg} placeholder="Profile Image" />
                </form>
                : 
                <span className="inline-block align-text-middle ml-3 text-xl">{userData.username}</span>}
                <div className="flex items-end flex-grow">
                <button type="button" onClick={() => {
                    toggle ? submitChanges() : setToggle(true);
                }} className="ml-auto items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {toggle ? "Save Profile" : "Edit Profile"}
                </button>
                </div>
            </div>
            <div>
                <h2 className="text-xl ml-3 py-4">Your Issues</h2>
                <hr className="mb-3" />

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {issueMap}
                </ul>

            </div>
        </div>
    );
}

export default Profile;
