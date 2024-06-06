import React from "react";
import {
    Button,
    Grid,
    Container,
    Typography,
}  from "@material-ui/core";

import { delaccount } from "./service/ApiService";

class Del_account extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // 로그인된 사용자 정보는 이미 백엔드에서 관리하고 있다고 가정합니다.
        delaccount().then((response) => {
            if (response.data && response.data.length > 0) {
                console.log("회원 탈퇴 성공:", response);
                
                window.location.href = "/login";
            } else {
                alert("회원 탈퇴에 실패했습니다.");
            }
        }).catch((error) => {
            console.error("회원 탈퇴 실패:", error.toString);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        });
    }

    render(){
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                회원 탈퇴
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            회원 탈퇴
                        </Button>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default Del_account