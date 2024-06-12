import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import Del_account from "./Del_account";///추가
import Account from "./Account";//추가
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright c "}
            fsoftwareenginner, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/" element={<App />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/delaccount" element={<Del_account />} />
                    </Routes>
                </div>
                <div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;