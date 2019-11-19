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

    const categoryNumber = window.location.href.charAt(window.location.href.length - 1); // 메인페이지에서 넘어올 때 선택된 값


    const xhq = new XMLHttpRequest();
    xhq.open(`get`, `js/data.xml`);
    xhq.send();

    xhq.onreadystatechange = setPhotos;

    function setPhotos() {
        const data = xhq.responseXML.children[0]; // items
        const length = data.children.length;
        const photos = document.querySelector(`.photos`);

        for (let i = 0; i < length; i++) {
            photos.innerHTML += `<div class="photo"><div class="cover"><div class="loc"></div><div class="area"></div></div></div>`;
        }
        const photo = document.querySelectorAll(`.photo`);
        photo.forEach(function (elem, i) {

            const url = data.children[i].children[0].attributes.src.value;
            const category = data.children[i].children[1].children[2].innerHTML;
            const area = data.children[i].children[1].children[1].innerHTML;
            const location = data.children[i].children[1].children[0].innerHTML;
            elem.style.backgroundImage = `url(${url})`;
            elem.children[0].children[0].innerHTML = location;
            elem.children[0].children[1].innerHTML = area;
            const photoPopup = document.querySelector(`.photo_popup_background`);
            const photoLoc = document.querySelector(`#icon_location`);
            const photoBackground = document.querySelector(`.pic_area`);

            elem.addEventListener(`click`, function () {
                photoPopup.style.display = `flex`;
                photoLoc.innerHTML = location;
                photoBackground.style.backgroundImage = `url(${url})`;
            });
            if (categoryNumber == 0) {
                if (category != '자연') {
                    elem.style.display = `none`;
                }
            } else if (categoryNumber == 1) {
                if (category != '건축') {
                    elem.style.display = `none`;
                }
            } else if (categoryNumber == 2) {
                if (category != '인물') {
                    elem.style.display = `none`;
                }
            } else if (categoryNumber == 3) {
                if (category != '음식') {
                    elem.style.display = `none`;
                }
            }

        });
        photo.forEach(function (elem) {
            if (elem.style.display === 'none') {
                elem.remove();
            }
        })
        document.querySelector(`.lists`).children[(categoryNumber === `#` ? -1 : categoryNumber) * 1 + 1].classList.add(`listOn`);


        const chosenMenu = document.querySelector(`.lists`).children;
        let prevMenu = categoryNumber === '#' ? 0 : categoryNumber;
        console.log(prevMenu);
        Array.from(chosenMenu).forEach(function (elem, i) {
            elem.addEventListener(`click`, function () {
                let href = window.location.href.slice(0, window.location.href.length - 1);
                if (i === 0) {
                    window.location.href = href + `#`;
                    window.location.reload();
                    return false;
                }
                href = href.concat(i - 1);
                console.log(href);
                window.location.href = href;
                window.location.reload();



            });
        });

        const areas = document.querySelectorAll(`.area_list .area`);
        console.log(areas)
        let areaToggle = []; // false off , true on
        for (let i = 0; i < 7; i++) {
            areaToggle.push('');
        }

        areas.forEach(function (elem, i) {
            elem.addEventListener(`click`, function () {
                const photo = document.querySelectorAll(`.photo`);


                if (areaToggle[i] === '') {
                    elem.children[1].classList.add(`listOn`);
                    areaToggle[i] = elem.children[0].innerHTML;
                } else {
                    elem.children[1].classList.remove(`listOn`)
                    areaToggle[i] = '';
                }
                const areaText = elem.children[0].innerHTML;
                photo.forEach(function (ph, i) {
                    ph.style.display = `none`;
                    const thisArea = ph.children[0].children[1].innerHTML;
                    areaToggle.forEach(function (ar, i) {
                        if (ar === thisArea) {
                            ph.style.display = `inline-block`
                        }
                    })

                })
                if (i === 7) {
                    areaToggle.forEach(function (elem1, i) {
                        areaToggle[i] = '';
                        areas[i].children[1].classList.remove(`listOn`);
                    });
                    photo.forEach(function (elem) {
                        elem.style.display = `inline-block`;
                    });
                    console.log(areaToggle);
                }


                let checkedCount = 0;
                for (let i = 0; i < areaToggle.length - 1; i++) {
                    if (areaToggle[i] !== '') {
                        checkedCount++;
                    } else {}
                }
                if (checkedCount === 0) {
                    photo.forEach(function (elem, i) {
                        elem.style.display = `inline-block`;
                    })
                }
                console.log(checkedCount);
                if (checkedCount === 0) {
                    photo.forEach(function (elem) {
                        elem.style.display = `inline-block`;
                    })
                }

            })
        })

    }

    document.querySelector(`.photo_popup_exit_button`).addEventListener(`click`, function () {
        this.parentNode.style.display = `none`;
    })
    document.querySelector(`footer`).addEventListener(`click`, function () {
        console.log(document.querySelectorAll(`.photo`).length)
    })

}

window.onload = init;
