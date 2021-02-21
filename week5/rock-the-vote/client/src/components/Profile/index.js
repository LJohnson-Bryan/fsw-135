import {React, useState, useEffect, useContext} from 'react';
import { UserContext } from '../../context/UserProvider';
import IssueCard from '../IssueCard';

const Profile = props => {

    const { user: {username} } = useContext(UserContext);
    const [userData, setUserData] = useState({username: username, profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=NoqdqpxjtB&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"})
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        props.setPageHeader("Your Profile")
    }, []);

    const submitChanges = () => {
        // Submit to API
        setToggle(false);
    }

    return ( 
        <div>
            <div className="flex items-center mb-5">
                <img className="inline-block h-14 w-14 rounded-full" src={userData.profileImg} alt="" />
                {toggle ? 
                <form onSubmit={submitChanges}>
                    <label htmlFor="name" className="sr-only">Email</label>
                    <input type="text" name="name" id="name" className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md ml-3" onChange={e => setUserData({...userData, username: e.target.value})} value={userData.username} placeholder="Your Name" />
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
                <IssueCard 
                name={userData.name}
                content="I do not like politics"
                imgURL={userData.profileImg}
                />

                <IssueCard 
                name={userData.name}
                content="I do not like politics"
                imgURL={userData.profileImg}
                />

                <IssueCard 
                name={userData.name}
                content="I do not like politics"
                imgURL={userData.profileImg}
                />

                <IssueCard 
                name={userData.name}
                content="I do not like politics"
                imgURL={userData.profileImg}
                />

                <IssueCard 
                name={userData.name}
                content="I do not like politics"
                imgURL={userData.profileImg}
                />
                </ul>

            </div>
        </div>
    );
}

export default Profile;
