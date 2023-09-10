fetch("/read/dashbordList", {
    method : "POST"
})
.then(res => res.json()
.then(data => {
    console.log(data)
    if (data.length !== 0) {
        let dashbordList = data;
        dashbordList = dashbordList.sort((a, b) => {
            return new Date(a.m__date) - new Date(b.m__date)
        })
        for (let i = 0; dashbordList.length > i; i++) {
            dashbordList[i].m__date = dashbordList[i].m__date.slice(0, 10);
            const dashbordArea = document.querySelector(".dashbord_area");

            const dashbord = document.createElement("div");
            dashbord.className = "dashbords";
            const titles = document.createElement("div");
            titles.className = "titles";
            const title = document.createElement("div");
            title.className = "title";
            const subtitle = document.createElement("div");
            subtitle.className = "subtitle";
            const writer_date = document.createElement("div");
            writer_date.className = "writer_date";
            const writer = document.createElement("div");
            writer.className = "writer";
            const date = document.createElement("div");
            date.className = "date";

            title.textContent = dashbordList[i].title;
            subtitle.textContent = dashbordList[i].subtitle;
            writer.textContent = dashbordList[i].writer;
            date.textContent = dashbordList[i].m__date;

            titles.appendChild(title);
            titles.appendChild(subtitle);
            writer_date.appendChild(writer);
            writer_date.appendChild(date);
            dashbord.appendChild(titles);
            dashbord.appendChild(writer_date);
            dashbordArea.appendChild(dashbord);

            titles.addEventListener("click", () => {
                location.href = `/dashbord/main/${dashbordList[i].title}`
            });
        };
    } else {
        const writeDashbord = document.createElement("a");
        writeDashbord.setAttribute("href", "/dashbord")
        writeDashbord.className = "write_dashbord";
        writeDashbord.textContent = "게시물 쓰기"
        
        const dashbordArea = document.querySelector(".dashbord_area");
        dashbordArea.appendChild(writeDashbord);
    }
}));