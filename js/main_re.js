function init() {
    const login = document.getElementById(`menu`).children[0];
    const membership = document.getElementsByClassName(`membership`)[0];
    const membershipExit = document.getElementsByClassName(`exit_box`)[0];
    const loginSelect = document.querySelectorAll(`.membership_container ul li`);
    const loginPage = document.querySelectorAll(`.naver_container`);
    const loginPageExit = document.querySelectorAll(`.naver_exit`);
    const mypage = login.parentNode.children[1];



    const loginButton = document.querySelectorAll(`#login`);
    console.log(loginButton);
    loginSelect.forEach(function (i, idx) {
        i.addEventListener(`click`, function () {
            loginPage[idx].style.display = `flex`;
        })
    })
    loginPageExit.forEach(function (i, idx) {
        i.addEventListener(`click`, function () {
            loginPage[idx].style.display = `none`;
        })
    })

    login.addEventListener(`click`, function () {
        membership.style.display = `flex`;
    });
    membershipExit.addEventListener(`click`, function () {
        membership.style.display = `none`;
    });

    let loginId;
    let logBoolean = false;

    loginButton.forEach(function (elem, i) {
        elem.addEventListener(`click`, function () {
            loginPage[i].style.display = `none`;
            membership.style.display = `none`;
            loginId = this.previousElementSibling.previousElementSibling.value;
            login.children[0].innerHTML = loginId;
            logBoolean = true;
            mypage.children[0].href += `#${loginId}`;
            document.querySelector(`#menu`).children[2].children[0].attributes[0].value += `#${loginId}`;
        });
    });

    mypage.addEventListener(`click`, function (e) {
        if (!logBoolean) {
            alert(`로그인이 필요합니다 `);
            e.stopPropagation();
            e.preventDefault();
        }
    });

    let xhq = new XMLHttpRequest();
    xhq.open(`get`, `js/data.xml`);
    xhq.send();
    xhq.onreadystatechange = setting;

    function setting() {
        const data = xhq.responseXML.children[0].children;
        const photoSection = document.querySelector(`.photoSection `);
        console.log(photoSection);
        Array.from(data).forEach(function (elem, i) {
            photoSection.innerHTML += `<div class="photo"></div>`;
            const src = elem.children[0].attributes[0].value;
            document.getElementsByClassName(`photo`)[i].style.backgroundImage = `url(${src})`;
        });

        let idx = 0;
        let turningCount = 0;
        setInterval(function () {
            photoSection.animate([{
                left: `${-100* idx}vw`
            }, {
                left: `${-100*(idx+1)}vw`
            }], {
                duration: 2000,
                fill: `forwards`,
            })
            turningCount === 0 ? idx++ : idx--;


            if (idx === 60) {
                turningCount++;
            }
            if (idx === 0) {
                turningCount--;
            }
        }, 4000);
    }


    const search = document.querySelector(`.main_search`).children[0];
    const href = search.attributes[0].value;
    console.log(href);
    const checklist = document.querySelectorAll(`.checklist`);
    let prevIndex;
    checklist.forEach(function (elem, i) {
        elem.addEventListener(`click`, function () {
            if (prevIndex !== undefined) {
                checklist[prevIndex].classList.remove('checkOn');
                console.log(i);
            }
            prevIndex = i;
            const search = document.querySelector(`.main_search`).children[0];
            search.attributes[0].value = href;
            checklist[i].classList.add(`checkOn`);

            search.attributes[0].value += i;

        })
    })


}

window.onload = init;
