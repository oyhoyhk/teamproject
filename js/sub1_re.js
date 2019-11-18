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
        });
    });

    mypage.addEventListener(`click`, function (e) {
        if (!logBoolean) {
            alert(`로그인이 필요합니다`);
            e.stopPropagation();
            e.preventDefault();
        }
    });
}

window.onload = init;
