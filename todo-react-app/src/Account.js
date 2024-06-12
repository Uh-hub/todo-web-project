// import React from "react";
// import { getUserInfo, delaccount } from "./service/ApiService"; // 사용자 정보를 가져오는 API 추가
// import { Button, Grid, Container, Typography } from "@material-ui/core";

// class Account extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             name: ""
//         };
//         this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
//     }

//     componentDidMount() {
//         // 컴포넌트가 마운트되었을 때 사용자 정보를 가져옵니다.
//         getUserInfo().then(response => {
//             this.setState({
//                 email: response.data.email,
//                 name: response.data.name
//             });
//         }).catch(error => {
//             console.error("사용자 정보를 가져오는데 실패했습니다:", error);
//             alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
//         });
//     }

//     handleDeleteAccount() {
//         delaccount().then(response => {
//             console.log(response); // 응답 데이터 확인
//             if (response.data && response.data.success) { // success 플래그 확인
//                 console.log("회원 탈퇴 성공:", response);
//                 window.location.href = "/login";
//             } else {
//                 alert("회원 탈퇴에 실패했습니다. 서버 응답: " + JSON.stringify(response.data));
//             }
//         }).catch(error => {
//             console.error("회원 탈퇴 실패:", error);
//             alert("회원 탈퇴 중 오류가 발생했습니다. 오류: " + error.toString());
//         });
//     }

//     render() {
//         const { email, name } = this.state;

//         return (
//             <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
//                 <Grid container spacing={2}>
//                     <Typography component="h1" variant="h5">
//                         회원 정보
//                     </Typography>
//                 </Grid>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <Typography variant="body1">
//                             이메일: {email}
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography variant="body1">
//                             이름: {name}
//                         </Typography>
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={2} style={{ marginTop: "16px" }}>
//                     <Grid item xs={12}>
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             color="secondary"
//                             onClick={this.handleDeleteAccount}
//                         >
//                             회원 탈퇴
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Container>
//         );
//     }
// }

// export default Account;

import React from "react";
import { getUserInfo, delaccount } from "./service/ApiService";
import { Button, Grid, Container, Typography } from "@material-ui/core";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: ""
        };
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    componentDidMount() {
        getUserInfo().then(response => {
            this.setState({
                email: response.email,
                username: response.username
            });
        }).catch(error => {
            console.error("사용자 정보를 가져오는데 실패했습니다:", error);
            alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }

    handleDeleteAccount() {
        delaccount().then(response => {
            if (response.message === "User deleted successfully") {
                console.log("회원 탈퇴 성공:", response);
                window.location.href = "/login";
            } else {
                alert("회원 탈퇴에 실패했습니다. 서버 응답: " + JSON.stringify(response));
            }
        }).catch(error => {
            console.error("회원 탈퇴 실패:", error);
            alert("회원 탈퇴 중 오류가 발생했습니다. 오류: " + error.toString());
        });
    }

    render() {
        const { email, username } = this.state;

        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <Grid container spacing={2}>
                    <Typography component="h1" variant="h5">
                        회원 정보
                    </Typography>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "60px" }}>
                    <Grid item xs={12} style={{ marginBottom: "15px" }}>
                        <Typography variant="body1">
                            이메일: {email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            이름: {username}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "16px" }}>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.handleDeleteAccount}
                        >
                            회원 탈퇴
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Account;
