$(document).ready(function() {
	//여기 아래 부분
	$('#summernote').summernote({
		  height: 480,                 // 에디터 높이
		  minHeight: null,             // 최소 높이
		  maxHeight: null,             // 최대 높이
		  focus: false,                  // 에디터 로딩후 포커스를 맞출지 여부
		  lang: "ko-KR",					// 한글 설정
		  placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정
          
	});
});


fetch("/getUserInfo", {
    method : "POST"
})
.then(res => res.json()
.then(data => {
    if (data.success) {
        const writer = data.info
        console.log(writer)
        const dashbordForm = document.querySelector("#dashbord_form");
        dashbordForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(dashbordForm);
            const req = {
                title : formData.get("title"),
                subtitle : formData.get("subtitle"),
                category : formData.get("category"),
                text : $('#summernote').summernote('code'),
                writer: writer.userId
            };
            console.log(req.text.length)
            fetch("/create/dashbord", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(req)
            })
            .then((res) => res.json()
            .then((res) => {
                if (res.success) {
                    alert("게시물이 성공적으로 게시되었습니다.");
                    location.href = "/main";
                } else {
                    alert(res.msg);
                };
            })
            .catch((error) => {
                console.error(new Error("게시물을 게시하는데 실패"))
                alert("게시물을 올리는데 실패 하였습니다.")
            }))

        });
    }
})
.catch(err => {
    console.Error(new Error("유저의 정보를 가져오는중 문제 발생"))
}))

