import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/top"
import Card from "../components/Card";
 
 
 
 
const Profile = () => {
    return (
        <div class="bg-gray-100 dark:bg-gray-700">
            <Navbar />
            <Sidebar />
            <Card />
        </div>
    )
}
 
export default Profile
