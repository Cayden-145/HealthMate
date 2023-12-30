import React from 'react';
import AuthDetails from "../details/AuthDetails";
import Header from "../../../components/Header/header";

const ManageAccount = () => {
    return (
        <div className={"main"}>
            <Header />

            <div className={"title__container"}>
                <AuthDetails loginType={"manage"}/>
            </div>
        </div>
    );
};

export default ManageAccount;