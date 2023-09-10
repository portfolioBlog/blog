fetch("/read/dashbord", {
    method:"post"
})
  .then((res) => res.json())
  .then(res => {
    if (!res.success) {
        alert(res.msg)
        location.href = "/main"
    }
  })
  .catch(error => {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  });
