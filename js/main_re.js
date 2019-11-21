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

    let loginId = myId;
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
        }, 5000);
    }


    const search = document.querySelector(`.main_search`).children[0];
    const ahref = search.attributes[0].value;
    console.log(ahref);
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
            search.attributes[0].value = ahref;
            checklist[i].classList.add(`checkOn`);

            search.attributes[0].value += i;

        })
    })
    // header 가운데 검색 기능 

    let inputValue;
    const input = document.getElementById(`main_search`);
    input.addEventListener(`change`, function (e) {
        inputValue = e.target.value;
    });
    const nextPageHref = document.querySelector(`.main_search a`).attributes[0].value;

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
