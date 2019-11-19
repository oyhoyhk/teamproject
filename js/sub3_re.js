function init() {
    const login = document.getElementById(`menu`).children[0];
    const membership = document.getElementsByClassName(`membership`)[0];
    const membershipExit = document.getElementsByClassName(`exit_box`)[0];
    const loginSelect = document.querySelectorAll(`.membership_container ul li`);
    const loginPage = document.querySelectorAll(`.naver_container`);
    const loginPageExit = document.querySelectorAll(`.naver_exit`);
    const mypage = login.parentNode.children[1];

    const href = window.location.href;
    const len = href.length;
    let myId;
    if (href.indexOf(`#`) > 0) {
        myId = href.slice(href.indexOf(`#`) + 1, len);
        login.children[0].innerHTML = myId;
        document.querySelector(`#logo`).children[0].attributes.href.value += `#${myId}`;
        console.log(document.querySelector(`#logo`).children[0].attributes.href)
    }

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
    const sectionOrigin = document.querySelector(`section`).innerHTML;

    let xhq = new XMLHttpRequest();
    xhq.open(`get`, `js/notice.xml`);
    xhq.send();
    console.log(xhq);
    xhq.onreadystatechange = function () {
        const notice = xhq.responseXML.children[0];
        const section = document.querySelector(`section`);
        initNoticeList(notice, 0);


        let pageNumber = 0;
        const pageList = document.querySelector(`.noticeList`);

        Array.from(pageList.children).forEach(function (elem, i) {
            elem.addEventListener(`click`, function () {
                initNoticeList(notice, i);
                console.log(elem);
            })
        })

    }



    function initNoticeList(notice, idx) {
        const section = document.querySelector(`section`);
        section.innerHTML = sectionOrigin;
        let prevIndex;
        for (let i = 0; i < 10; i++) {
            section.innerHTML += `<div class="notice"><div class="number"></div><div class="write"></div><div class="detail"></div></div>`;
            let noticeList = section.children[i];
            let inputList = notice.children[idx * 10 + i];
            noticeList.children[0].innerHTML = inputList.children[0].innerHTML;
            noticeList.children[1].innerHTML = inputList.children[1].innerHTML;
            noticeList.children[2].innerHTML = inputList.children[2].innerHTML.slice(0, 30);

        }
        for (let i = 0; i < 10; i++) {
            section.children[i].addEventListener(`click`, function () {
                if (prevIndex !== undefined) {
                    section.children[prevIndex].style.height = `45px`;
                    section.children[prevIndex].style.paddingTop = 0;
                    section.children[prevIndex].children[2].innerHTML = section.children[prevIndex].children[2].innerHTML.slice(0, 30);
                }
                section.children[i].style.height = `250px`;
                section.children[i].style.paddingTop = '20px';
                prevIndex = i;
                section.children[i].children[2].innerHTML = notice.children[i].children[2].innerHTML.slice(0, 300);
            })
        }
    }


    // header 가운데 검색 기능 

    let inputValue;
    const input = document.getElementById(`main_search`);
    input.addEventListener(`change`, function (e) {
        inputValue = e.target.value;
    });
    const nextPageHref = `sub1.html#`;

    input.addEventListener(`keydown`, function (e) {
        if (e.key === `Enter`) {
            if (inputValue === `자연`) {
                window.location.href = nextPageHref + '0';
            } else if (inputValue === `건축`) {
                window.location.href = nextPageHref + '1';
            } else if (inputValue === `인물`) {
                window.location.href = nextPageHref + '2';
            } else if (inputValue === `음식`) {
                window.location.href = nextPageHref + '3';
            } else {
                alert(`자연, 건축, 인물, 음식 중에서 입력해주세요`);
            }
        }
    });
    const searchButton = document.querySelector(`.searchBox .search`);
    searchButton.addEventListener(`click`, function () {
        if (inputValue === `자연`) {
            window.location.href = nextPageHref + '0';
        } else if (inputValue === `건축`) {
            window.location.href = nextPageHref + '1';
        } else if (inputValue === `인물`) {
            window.location.href = nextPageHref + '2';
        } else if (inputValue === `음식`) {
            window.location.href = nextPageHref + '3';
        } else {
            alert(`자연, 건축, 인물, 음식 중에서 입력해주세요`);
        }
    })
}
window.onload = init;
