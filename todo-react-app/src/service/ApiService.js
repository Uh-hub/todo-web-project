import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken){
        headers.append("Authorization","Bearer " + accessToken);
    }
    
    let options = {
        headers: headers,
        url:API_BASE_URL + api,
        method: method,
    };
    if(request){
        options.body = JSON.stringify(request, getCircularReplacer());
    }
    return fetch(options.url, options)
    .then((response) => 
    response.json().then((json) => {
        if(!response.ok) {
            return Promise.reject(json);
        }
        return json;
    })
    )
    .catch((error) => {
        console.log("Oops!");
        console.log(error.status);
        if(error.status === 403){
            window.location.href = "/login";
        }
        return Promise.reject(error);
    });
}

export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
    .then((response) => {
        if(response.token){
            localStorage.setItem("ACCESS_TOKEN", response.token);
            localStorage.setItem("USER_ID", response.id);
            window.location.href="/";
        }
    });
}

export function signup(userDTO){
    return call("/auth/signup", "POST", userDTO)
    .then((response) => {
        if(response.id) {
            window.location.href="/";
        }
    })
    .catch((error) => {
        console.log("Oops!");
        console.log(error.status);
        console.log("Ooops!")
        if(error.status === 403){
            window.location.href = "/auth/signup";
        }
        return Promise.reject(error);
    });
}

export function signout(){
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href="/";
}
////
// export function delaccount(userDTO){
//     return call("/auth/delaccount", "POST", userDTO)
//     .then((response) => {
//         if(response.data && response.data.length > 0 && response.data[0].id) {
//             window.location.href="/";
//         }
//     })
//     .catch((error) => {
//         console.log("[del_acc]Oops!");
//         console.log(error.status);
//         console.log("[del_acc]Ooops!")
//         if(error.status === 403){
//             window.location.href = "/auth/delaccount";
//         }
//         return Promise.reject(error);
//     });
// }

export function delaccount() {
    const userId = localStorage.getItem("USER_ID"); // 사용자 ID를 로컬 스토리지나 다른 방법으로 가져옴
    if (!userId) {
        console.error("User ID not found");
        return Promise.reject("User ID not found");
    }

    const userDTO = { id: userId }; // ID만 포함하는 객체 생성
    return call("/auth/delaccount", "POST", userDTO)
    // return call("/auth/delaccount", "POST", { id: userId })
    .then((response) => {
        if (response.message === "User deleted successfully") {
            // return response;
            localStorage.removeItem(ACCESS_TOKEN);//
            localStorage.removeItem("USER_ID");//
            window.location.href = "/login";//
        }
        return response;//
    })
    .catch((error) => {
        console.log("[del_acc]Oops!");
        console.log(error.status);
        if (error.status === 403) {
            window.location.href = "/auth/delaccount";
        }
        return Promise.reject(error);
    });
}

function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}