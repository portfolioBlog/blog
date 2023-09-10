fetch("/read/dashbord", {
    method: "POST"
})
  .then((res) => res.json())
  .then(res => {
    if (!res.success) {
        alert(res.msg)
        location.href = "/main"
    } else {
        console.log("aaa")
    }
  })
  .catch(error => {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  });

const deleteBtn = document.querySelector(".del_btn");
const title = document.querySelector(".title");
const writer = document.querySelector(".writer");
deleteBtn.addEventListener("click", () => {
    console.log("clicked")
    const req = {
        title: title.textContent.trim(),
        writer: writer.textContent.trim()
    }
    fetch("/delete/dashbord", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(req)
    })
    .then((res) => res.json())
    .then(res => {
        if (res.success) {
            alert("게시물이 성공적으로 삭제 되었습니다.");
            location.href = "/main";
        }
    })
    .catch(error => {
        console.error("게시물을 삭제하는데 실패하였습니다. : ", error);
    })
})