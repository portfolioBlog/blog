const loginTab = document.querySelector("#login_tab");
const registerTab = document.querySelector("#register_tab");
const loginForm = document.querySelector("#login_form");
const registerForm = document.querySelector("#register_form");

loginTab.addEventListener("click", (e) => {
    if (e.target.checked) {
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
    }
});
registerTab.addEventListener("change", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const req = {
        id : formData.get("id"),
        password : formData.get("password")
    }

    fetch("/login", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json()
    .then((res) => {
        if (res.success) {
            location.href = "/main";
        } else {
            console.log(res)
            alert(res.msg)
        }
    })
    .catch((error) => {
        console.error(new Error("로그인중 에러발생"))
    }));

});

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log("submit register")
    const formData = new FormData(registerForm);
    if (formData.get("password") === formData.get("check_password")) {
        const req = {
            id: formData.get("id"),
            password: formData.get("password"),
            email : formData.get("email"),
            name : "guest",
        }
        console.log(req)
        fetch("/register", {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(req),
        })
        .then((res) => res.json()
        .then((res) => {
            if (res.success) {
                location.reload()
                alert("회원가입이 완료 되었습니다.")
            } else {
                alert(res.msg)
            }
        })
        .catch((err) => {
            console.error(new Error("회원가입 도중 문제 발생"))
        }))
    }else {
        alert("비밀번호 확인이 일치하지 않습니다.")
    }
})