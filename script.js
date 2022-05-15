const box = document.querySelector(".box");
const tab = document.querySelectorAll(".tab");
const content = document.querySelectorAll(".content");
const list = document.querySelector("section.list");
const submitTodo = document.querySelector(".subTodo");

window.onload = () => {
    console.log("window");
    let title = list.children[0];
    let storedList = localStorage.getItem("theList");
    if (storedList == null || storedList.length == 2) {
        arrayList = [{ "priority": "1", "task": "Break down your goal into the to-do list", "date": "2021-11-26", "time": "08:00", "check": "false" }, { "priority": "2", "task": "Prioritize your urgent tasks", "date": "2021-11-26", "time": "08:05", "check": "false" }, { "priority": "", "task": "Put a deadline helps you to do better time management.", "date": "2021-11-26", "time": "08:10", "check": "false" }, { "priority": "4", "task": "Don't forget those small but essential chores", "date": "2021-11-26", "time": "08:15", "check": "false" }, { "priority": "5", "task": "✔️ Tick the done button to finish the task", "date": "2021-11-26", "time": "08:20", "check": "true" }, { "priority": "6", "task": "Try out the sorting function, the easiest way to see your progress", "date": "2021-11-26", "time": "08:25", "check": "false" }, { "priority": "7", "task": "Use the 🗑️ trash can to remove everything and start your new chapter from here!!", "date": "2021-11-26", "time": "08:30", "check": "false" }];
        let i = 0;
        while (i < arrayList.length) {
            console.log(i);
            let wrap = document.createElement("div");
            let textDiv = document.createElement("div");
            let priArea = document.createElement("p");
            let taskArea = document.createElement("p");
            let dateArea = document.createElement("p");
            let dueTime = document.createElement("p");
            let done = document.createElement("button");
            let trash = document.createElement("button");

            //action after submit
            list.appendChild(wrap);
            wrap.classList.add("wrap");
            textDiv.classList.add("textDiv");
            wrap.appendChild(textDiv);
            textDiv.appendChild(priArea);
            priArea.classList.add("priArea");
            textDiv.appendChild(taskArea);
            taskArea.classList.add("taskArea");
            textDiv.appendChild(dateArea);
            dateArea.classList.add("dateArea");
            textDiv.appendChild(dueTime);
            dueTime.classList.add("dueTime")
            wrap.appendChild(done);
            done.classList.add("doneButton");
            wrap.appendChild(trash);
            trash.classList.add("trashButton");

            priArea.innerHTML = arrayList[i].priority;
            console.log(i + "inner Pri ");
            taskArea.innerHTML = arrayList[i].task;
            dateArea.innerHTML = arrayList[i].date;
            dueTime.innerHTML = arrayList[i].time;
            done.innerHTML = '<i class="fas fa-check"></i>';
            trash.innerHTML = '<i class="fas fa-trash-alt"></i>';


            //to show title
            if (list.children.length == 2) {
                title.classList.add("showTitle");
                console.log(i + "show title ");
            }

            wrapGiveNum();

            if (arrayList[i].check == "true") {
                textDiv.classList.add("doneEffect");
                done.classList.add("doneEffect");
            } else if (arrayList[i].check == "false") {
                textDiv.classList.remove("doneEffect");
                done.classList.remove("doneEffect");
            }

            // emergency style 
            if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                textDiv.style = " background-color: rgb(255, 202, 202);color:#be0000; font-weight: 900;text-decoration-color:#be0000;";
            }
            i++
            localStorage.setItem("theList", JSON.stringify(arrayList));

            //done button
            done.addEventListener("click", () => {
                textDiv.classList.toggle("doneEffect");
                done.classList.toggle("doneEffect");
                let kk = list.children;
                let arrayList = JSON.parse(localStorage.getItem("theList"));
                for (i = 1; i <= arrayList.length; i++) {
                    if (kk[i].children[0].classList.length > 1) {
                        arrayList[i - 1].check = "true";
                        if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                            done.style = " background-color: rgb(255, 202, 202);color:#be0000; font-weight: 900;text-decoration-color:#be0000;";
                            textDiv.style.color = "red";

                        }
                    } else if (kk[i].children[0].classList.length == 1) {
                        arrayList[i - 1].check = "false";
                        if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                            done.style = "";
                        }
                    }
                    localStorage.setItem("theList", JSON.stringify(arrayList));
                }
            })

            //trash button
            trash.addEventListener("click", e => {
                e.preventDefault()
                wrap.style.animation = "scaleDown .2s";
                wrap.addEventListener("animationend", () => {
                    //remove storage item
                    var deleteItem = e.target.parentElement.dataset.number;
                    let arrayList = JSON.parse(localStorage.getItem("theList"));
                    arrayList.splice(deleteItem - 1, 1);
                    localStorage.setItem("theList", JSON.stringify(arrayList));
                    wrap.remove();
                    wrapGiveNum();
                    if (list.children.length <= 1) {
                        title.classList.remove("showTitle");
                    }
                })
            })
        }
    }
}


function wrapGiveNum() {
    let wrapNum = document.createAttribute("data-number");
    let kk = list.children;
    for (i = 0; i < list.children.length; i++) {
        let kkk = kk[i];
        wrapNum = i;
        kkk.setAttribute("data-number", wrapNum);
    }
}

// action after submit todo list
submitTodo.addEventListener("click", e => {
    e.preventDefault();
    console.log("sub");
    let gg = list.children;
    let finish = document.querySelector(".finish");
    if (finish != null) {
        finish.remove();
    }

    // declare variable
    const form = e.target.parentElement;
    let title = list.children[0];
    let priority = form.children[0].value;
    let taskForm = form.children[1];
    let task = taskForm.value;
    let date = form.children[2].value;
    let time = form.children[3].value;

    //create elements
    let wrap = document.createElement("div");
    let textDiv = document.createElement("div");
    let priArea = document.createElement("p");
    let taskArea = document.createElement("p");
    let dateArea = document.createElement("p");
    let dueTime = document.createElement("p");
    let done = document.createElement("button");
    let trash = document.createElement("button");

    let objList = {
        priority: priority,
        task: task,
        date: date,
        time: time,
        check: "false",
    }

    //action after submit
    list.appendChild(wrap);
    wrap.classList.add("wrap");
    textDiv.classList.add("textDiv");
    wrap.appendChild(textDiv);
    textDiv.appendChild(priArea);
    priArea.classList.add("priArea");
    textDiv.appendChild(taskArea);
    taskArea.classList.add("taskArea");
    textDiv.appendChild(dateArea);
    dateArea.classList.add("dateArea");
    textDiv.appendChild(dueTime);
    dueTime.classList.add("dueTime")
    wrap.appendChild(done);
    done.classList.add("doneButton");
    wrap.appendChild(trash);
    trash.classList.add("trashButton");

    //actions condition
    if (task.length == 0) {
        wrap.remove();
        taskForm.classList.add("fail");
        return;
    } else {
        priArea.innerHTML = priority;
        taskArea.innerHTML = task;
        dateArea.innerHTML = date;
        dueTime.innerHTML = time;
        done.innerHTML = '<i class="fas fa-check"></i>';
        trash.innerHTML = '<i class="fas fa-trash-alt"></i>';
        wrapGiveNum();
    }


    //to show title
    if (list.children.length == 2) {
        title.classList.add("showTitle");
        taskForm.classList.remove("fail");
    } else if (priority.length == 0 && date.length == 0) {
        dueTime.innerHTML = " ";
    }

    // emergency style 
    if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
        textDiv.style = " background-color: rgb(255, 202, 202);color:#be0000; font-weight: 900;text-decoration-color:#be0000;";
    }

    //done button
    done.addEventListener("click", () => {
        textDiv.classList.toggle("doneEffect");
        done.classList.toggle("doneEffect");

        let kk = list.children;
        let arrayList = JSON.parse(localStorage.getItem("theList"));
        for (i = 1; i <= arrayList.length; i++) {
            if (kk[i].children[0].classList.length > 1) {
                arrayList[i - 1].check = "true";
                if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                    textDiv.style.color = "red";
                }
            } else if (kk[i].children[0].classList.length == 1) {
                arrayList[i - 1].check = "false";
                if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                    done.style = "";
                }
            }
            localStorage.setItem("theList", JSON.stringify(arrayList));
        }
    })

    //trash button
    trash.addEventListener("click", e => {
        let theWrap = e.target.parentElement;
        theWrap.style.animation = "scaleDown .2s";
        theWrap.addEventListener("animationend", () => {
            //remove storage item
            var deleteItem = e.target.parentElement.dataset.number;
            let arrayList = JSON.parse(localStorage.getItem("theList"));
            arrayList.splice(deleteItem - 1, 1);
            localStorage.setItem("theList", JSON.stringify(arrayList));
            wrap.remove();
            wrapGiveNum();
            if (list.children.length <= 1) {
                title.classList.remove("showTitle");
                let finish = document.createElement("div");
                finish.classList.add("finish");
                let finishText = document.createElement("p");
                let finishImg = document.createElement("img");
                list.appendChild(finish);
                finish.appendChild(finishText);
                finish.appendChild(finishImg);
                finish.style = "display:flex; flex-direction: column; align-items: center; margin-top: 5%; "
                finishText.innerHTML = "✔️ Well done!! Don't forget to take a break before staring your new chapter!"
                finishImg.src = "./done.jpg";
                finishImg.style = "width: 40%; max-width: 900px; min-width: 250px; margin-top: 2%";
            }
            console.log(list.children.length)
        })
    })


    //set storage
    let storedList = localStorage.getItem("theList");
    if (storedList == null) {
        localStorage.setItem("theList", JSON.stringify([objList]));
    } else {
        let arrayList = JSON.parse(storedList);
        arrayList.push(objList);
        localStorage.setItem("theList", JSON.stringify(arrayList));
    }
    form.children[0].value = "";
    form.children[1].value = "";
    form.children[2].value = "";
    form.children[3].value = "";

})

loadData();

//use storage
function loadData() {
    let storedList = localStorage.getItem("theList");
    let cc = list.children;

    if (storedList !== null) {
        if (storedList === "[]") {
            console.log("onload" + "window");
            window.onload();
        } else {
            console.log("reload");

            let arrayList = JSON.parse(storedList);
            arrayList.forEach(item => {

                //create elements
                let title = list.children[0];
                let wrap = document.createElement("div");
                let textDiv = document.createElement("div");
                let priArea = document.createElement("p");
                let taskArea = document.createElement("p");
                let dateArea = document.createElement("p");
                let dueTime = document.createElement("p");
                let done = document.createElement("button");
                let trash = document.createElement("button");

                //action after submit
                list.appendChild(wrap);
                textDiv.appendChild(priArea);
                textDiv.appendChild(taskArea);
                textDiv.appendChild(dateArea);
                textDiv.appendChild(dueTime);
                wrap.classList.add("wrap");
                textDiv.classList.add("textDiv");
                priArea.classList.add("priArea");
                taskArea.classList.add("taskArea");
                wrap.appendChild(textDiv);
                dateArea.classList.add("dateArea");
                dueTime.classList.add("dueTime")
                done.classList.add("doneButton");
                trash.classList.add("trashButton");
                wrap.appendChild(done);
                wrap.appendChild(trash);
                priArea.innerHTML = item.priority;
                taskArea.innerHTML = item.task;
                dateArea.innerHTML = item.date;
                dueTime.innerHTML = item.time;
                done.innerHTML = '<i class="fas fa-check"></i>';
                trash.innerHTML = '<i class="fas fa-trash-alt"></i>';

                wrapGiveNum();
                if (task.length == 0) {
                    wrap.remove();
                }

                for (i = 1; i < cc.length; i++) {
                    if (item.check == "true") {
                        textDiv.classList.add("doneEffect");
                        done.classList.add("doneEffect");
                        if (item.priority > 0 && item.priority < 4) {
                        }
                    } else if (item.check == "false") {
                        textDiv.classList.remove("doneEffect");
                        done.classList.remove("doneEffect");
                    }
                    //to show title
                    if (cc.length > 1) {
                        title.classList.add("showTitle");
                    }
                    localStorage.setItem("theList", JSON.stringify(arrayList));
                }

                //to show title
                if (list.children.length == 2) {
                    title.classList.add("showTitle");
                }

                // emergency style 
                if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                    textDiv.style = " background-color: rgb(255, 202, 202);color:#be0000; font-weight: 900;text-decoration-color:#be0000;";
                }
                //done button
                done.addEventListener("click", () => {
                    textDiv.classList.toggle("doneEffect");
                    done.classList.toggle("doneEffect");
                    let kk = list.children;
                    let arrayList = JSON.parse(localStorage.getItem("theList"));
                    for (i = 1; i <= arrayList.length; i++) {
                        if (kk[i].children[0].classList.length > 1) {
                            arrayList[i - 1].check = "true";
                            if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                                textDiv.style.color = "red";
                            }
                        } else if (kk[i].children[0].classList.length == 1) {
                            arrayList[i - 1].check = "false";
                            if (priArea.innerHTML > 0 && priArea.innerHTML < 4) {
                                done.style = "";
                            }
                        }
                        localStorage.setItem("theList", JSON.stringify(arrayList));
                    }
                })

                //trash button
                trash.addEventListener("click", e => {
                    e.preventDefault()
                    wrap.style.animation = "scaleDown .2s";
                    wrap.addEventListener("animationend", () => {
                        //remove storage item
                        var deleteItem = e.target.parentElement.dataset.number;
                        let arrayList = JSON.parse(localStorage.getItem("theList"));
                        arrayList.splice(deleteItem - 1, 1);
                        localStorage.setItem("theList", JSON.stringify(arrayList));
                        wrap.remove();
                        wrapGiveNum();
                        if (list.children.length <= 1) {
                            title.classList.remove("showTitle");
                            let finish = document.createElement("div");
                            finish.classList.add("finish");
                            let finishText = document.createElement("p");
                            let finishImg = document.createElement("img");
                            list.appendChild(finish);
                            finish.appendChild(finishText);
                            finish.appendChild(finishImg);
                            finish.style = "display:flex; flex-direction: column; align-items: center; margin-top: 5%; "
                            finishText.innerHTML = "✔️ Well done!! Don't forget to take a break before staring your new chapter!"
                            finishImg.src = "./done.jpg";
                            finishImg.style = "width: 40%; max-width: 900px; min-width: 300px; margin-top: 2%";
                        }
                    })
                })
            })
        }
    }
}


const priUp = document.querySelector(".priUp");
priUp.addEventListener("click", () => {
    priDown.style = "";
    priUp.style = "color: #333; background-color:#d4d9db;";
    dateUp.style = "";
    dateDown.style = "";
    taskDone.style = "";
    taskUndone.style = "";

    let arrayList = JSON.parse(localStorage.getItem("theList"));

    arrayList.sort(function (a, b) {
        let aPri = a.priority;
        let bPri = b.priority;

        if (aPri == "") {
            aPri = Infinity;
        } else if (bPri == "") {
            bPri = Infinity;
        }

        if (aPri < bPri) {
            return -1;
        } else if (aPri > bPri) {
            return 1;
        } else if (aPri == bPri) {
            return 0;
        }
    })

    localStorage.setItem("theList", JSON.stringify(arrayList));

    // remove data
    let len = list.children.length;
    for (let i = 1; i < len; i++) {
        list.children[1].remove();
    }

    // load data
    loadData();
})

const priDown = document.querySelector(".priDown");
priDown.addEventListener("click", () => {
    priUp.style = "";
    priDown.style = "color: #333; background-color:#d4d9db;";
    dateUp.style = "";
    dateDown.style = "";
    taskDone.style = "";
    taskUndone.style = "";

    let arrayList = JSON.parse(localStorage.getItem("theList"));
    arrayList.sort(function (a, b) {

        let aPri = a.priority;
        let bPri = b.priority;

        if (aPri == "") {
            aPri = null;
        } else if (bPri == "") {
            bPri = null;
        }

        if (aPri < bPri) {
            return 1;
        } else if (aPri > bPri) {
            return -1;
        } else if (aPri == bPri) {
            return 0;
        }
    })

    localStorage.setItem("theList", JSON.stringify(arrayList));

    // remove data
    let len = list.children.length;
    for (let i = 1; i < len; i++) {
        list.children[1].remove();
    }

    // load data
    loadData();

})


// date sorting

const dateUp = document.querySelector(".dateUp");
dateUp.addEventListener("click", () => {
    priUp.style = "";
    priDown.style = "";
    dateUp.style = "color: #333; background-color:#d4d9db;";
    dateDown.style = "";
    taskDone.style = "";
    taskUndone.style = "";

    let arrayList = JSON.parse(localStorage.getItem("theList"));
    arrayList.sort(function (a, b) {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);

        if (!a.date) {
            return 1;
        } else if (!b.date) {
            return -1;
        } else if (aDate < bDate) {
            return -1;
        } else if (aDate > bDate) {
            return 1;
        } else if (Number(aDate) === Number(bDate)) {
            if (a.time < b.time) {
                return -1;
            } else if (a.time > b.time) {
                return 1;
            } else {
                return 0;
            }
        }
    })

    localStorage.setItem("theList", JSON.stringify(arrayList));

    // remove data
    let len = list.children.length;
    for (let i = 1; i < len; i++) {
        list.children[1].remove();
    }

    // load data
    loadData();

})

const dateDown = document.querySelector(".dateDown");
dateDown.addEventListener("click", () => {
    priDown.style = "";
    priUp.style = "";
    dateUp.style = "";
    dateDown.style = "color: #333; background-color:#d4d9db;";
    taskDone.style = "";
    taskUndone.style = "";


    let arrayList = JSON.parse(localStorage.getItem("theList"));
    arrayList.sort(function (a, b) {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);


        if (!a.date) {
            return 1;
        } else if (!b.date) {
            return -1;
        }

        if (aDate < bDate) {
            return 1;
        } else if (aDate > bDate) {
            return -1;
        } else if (Number(aDate) === Number(bDate)) {
            if (a.time < b.time) {
                return 1;
            } else if (a.time > b.time) {

                return -1;
            } else {
                return 0;
            }
        }
    })

    localStorage.setItem("theList", JSON.stringify(arrayList));

    // remove data
    let len = list.children.length;
    for (let i = 1; i < len; i++) {
        list.children[1].remove();
    }

    // load data
    loadData();

})


//task sort
function checkDone(arr) {

    if (arr.length == 1) {
        return arr;
    } else {
        let result = [];
        let rest = [];
        let i = 0;
        let j = 0;

        while (i < arr.length) {
            if (arr[i].check == "true") {
                result.push(arr[i]);
                i++;
            } else if (arr[i].check == "false") {
                rest.push(arr[i])
                i++;
            }
        }
        while (j < rest.length) {
            result.push(rest[j]);
            j++;
        }
        return result;
    }

}

const taskDone = document.querySelector(".taskDone");
taskDone.addEventListener("click", () => {
    priDown.style = "";
    priUp.style = "";
    dateUp.style = "";
    priDown.style = "";
    taskDone.style = "color: #333; background-color:#d4d9db;";
    taskUndone.style = "";

    let arrayList = checkDone(JSON.parse(localStorage.getItem("theList")));
    localStorage.setItem("theList", JSON.stringify(arrayList));


    // remove data
    let len = list.children.length;
    for (let i = 1; i < len; i++) {
        list.children[1].remove();
    }

    // load data
    loadData();

})

function checkUndone(arr) {

    if (arr.length == 1) {
        return arr;
    } else {
        let result = [];
        let rest = [];
        let i = 0;
        let j = 0;

        while (i < arr.length) {
            if (arr[i].check == "false") {
                result.push(arr[i]);
                i++;
            } else if (arr[i].check == "true") {
                rest.push(arr[i])
                i++;
            }
        }
        while (j < rest.length) {
            result.push(rest[j]);
            j++;
        }
        return result;
    }

}

const taskUndone = document.querySelector(".taskUndone");
taskUndone.addEventListener("click", () => {
    priDown.style = "";
    priUp.style = "";
    dateUp.style = "";
    priDown.style = "";
    taskDone.style = "";
    taskUndone.style = "color: #333; background-color:#d4d9db;";

    let arrayList = checkUndone(JSON.parse(localStorage.getItem("theList")));
    localStorage.setItem("theList", JSON.stringify(arrayList));


    // remove data
    let len = list.children.length;
    for (let i = 1; i < len; i++) {
        list.children[1].remove();
    }

    // load data
    loadData();

})