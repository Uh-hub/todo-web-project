//아래는 비번 확인 코드
// import React, { useState } from "react";
// import {
//     Button,
//     TextField,
//     Link,
//     Grid,
//     Container,
//     Typography,
// } from "@material-ui/core"

// import { signup } from "./service/ApiService";

// const SignUp = () => {
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [passwordError, setPasswordError] = useState(false);

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleConfirmPasswordChange = (event) => {
//         setConfirmPassword(event.target.value);
//         setPasswordError(event.target.value !== password);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (password !== confirmPassword) {
//             setPasswordError(true);
//             return;
//         }

//         const data = new FormData(event.target);
//         const username = data.get("username");
//         const email = data.get("email");

//         signup({ email: email, username: username, password: password }).then(
//             (response) => {
//                 window.location.href = "/login";
//             }
//         );
//     };

//     return (
//         <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
//             <form noValidate onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <Typography component="h1" variant="h5">
//                             계정 생성
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             autoComplete="username"
//                             name="username"
//                             variant="outlined"
//                             required
//                             fullWidth
//                             id="username"
//                             label="사용자 이름"
//                             autoFocus
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             autoComplete="email"
//                             name="email"
//                             variant="outlined"
//                             required
//                             fullWidth
//                             id="email"
//                             label="이메일 주소"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             type="password"
//                             autoComplete="current-password"
//                             name="password"
//                             variant="outlined"
//                             required
//                             fullWidth
//                             id="password"
//                             label="패스워드"
//                             value={password}
//                             onChange={handlePasswordChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             type="password"
//                             autoComplete="current-password"
//                             name="confirmPassword"
//                             variant="outlined"
//                             required
//                             fullWidth
//                             id="confirmPassword"
//                             label="패스워드 확인"
//                             value={confirmPassword}
//                             onChange={handleConfirmPasswordChange}
//                             error={passwordError}
//                             helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                         >
//                             계정 생성
//                         </Button>
//                     </Grid>
//                 </Grid>
//                 <Grid container justifyContent="flex-end">
//                     <Grid item>
//                         <Link href="/login" variant="body2">
//                             이미 계정이 있습니까? 로그인 하세요.
//                         </Link>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Container>
//     );
// };

// export default SignUp;

import React from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
} from "@mui/material";

import { signup } from "./service/ApiService";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({ email: email, username: username, password: password }).then(
            (response) => {
                window.location.href = "/login";
            }
        );
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="사용자 이름"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                계정 생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default SignUp;