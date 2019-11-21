function init() {

    const favorite = document.querySelector(`.favorite_area`);
    const like = document.querySelector(`.like_area`);
    const comment = document.querySelector(`.comment_area`);

    favorite.classList.add(`tapOn`);

    let prevTap = 0;

    const tap = document.querySelector(`.tap_menu`).children;
    const tapArea = document.querySelectorAll(`.tap_area`);

    Array.from(tap).forEach(function (elem, i) {
        elem.addEventListener(`click`, function () {
            tapArea[prevTap].classList.remove(`tapOn`);
            tapArea[i].classList.add(`tapOn`);
            prevTap = i;
        });
    });

    const writeButton = document.querySelector(`.myinfo_write_button`);

    const myinfoName = document.querySelector(`.myinfo_name`);

    writeButton.addEventListener(`click`, function () {
        let text = prompt(`닉네임을 입력해주세요`);
        myinfoName.innerHTML = text;
    })

    const xhq = new XMLHttpRequest();
    const myinfoUpper = document.querySelector(`.myinfo_upper`);
    const myinfoMyphoto = document.querySelector(`.myinfo_myphoto`);
    xhq.open(`get`, `js/person.xml`);
    xhq.send();
    xhq.onreadystatechange = function () {
        const data = xhq.responseXML.childNodes[0];
        const myInfoBack = data.children[0].children[0].innerHTML;
        const myInfoMyphoto = data.children[0].children[1].innerHTML;

        myinfoUpper.style.backgroundImage = `url(${myInfoBack})`;
        myinfoMyphoto.style.backgroundImage = `url(${myInfoMyphoto})`;

        loadPhoto(`favorite`, 0);

    }

    const tapMenu = document.querySelectorAll(`.tap_menu div`);

    let prevTapCount = 0;
    tapMenu.forEach(function (elem, i) {
        elem.addEventListener(`click`, function () {
            if (i !== prevTapCount) {
                tapArea[prevTapCount].style.display = `none`;
                tapArea[i].style.display = `block`;
                if (i === 0) {
                    const xhq1 = new XMLHttpRequest();
                    xhq1.open(`get`, `js/person.xml`);
                    xhq1.send();
                    xhq1.onreadystatechange = function () {
                        console.log(xhq1);
                        loadPhoto(`favorite`, i);
                    }
                } else if (i === 1) {
                    const xhq1 = new XMLHttpRequest();
                    xhq1.open(`get`, `js/person.xml`);
                    xhq1.send();
                    xhq1.onreadystatechange = function () {
                        loadPhoto(`like`, i);
                        console.log(xhq1);
                    }
                } else {
                    const xhq1 = new XMLHttpRequest();
                    xhq1.open(`get`, `js/person.xml`);
                    xhq1.send();
                    xhq1.onreadystatechange = function () {
                        const lists = xhq1.responseXML.children[0].children[1].children;
                        console.log(lists);
                        const whens = Array.from(lists).filter(function (elem, i) {

                            if (i % 2 === 0) {
                                return elem;
                            }
                        });
                        console.log(whens)
                        const talks = Array.from(lists).filter(function (elem, i) {
                            if (i % 2 === 1) {
                                return elem;
                            }
                        });

                        const commentArea = document.querySelector(`.comment_area`);
                        let innerText = '';
                        for (let i = 0; i < whens.length; i++) {
                            innerText += `<div class="list"><div class="date"></div><div class="text"></div></div>`;
                        }
                        console.log(innerText);
                        console.log(commentArea);
                        commentArea.innerHTML = innerText;
                        const list = document.querySelectorAll(`.list`);
                        const date = document.querySelectorAll(`.date`);
                        const text = document.querySelectorAll(`.text`);

                        let listToggle = [];
                        for (let i = 0; i < whens.length; i++) {
                            listToggle.push(false);
                        }
                        list.forEach(function (elem, i) {
                            date[i].innerHTML = whens[i].innerHTML;
                            text[i].innerHTML = talks[i].innerHTML.slice(0, 50);
                            elem.addEventListener(`click`, function () {
                                if (listToggle[i] === false) {
                                    elem.animate([{
                                        height: `50px`
                                    }, {
                                        height: `250px`
                                    }], {
                                        duration: 300,
                                        fill: `forwards`
                                    });
                                    setTimeout(function () {
                                        text[i].innerHTML = talks[i].innerHTML;
                                    }, 150)
                                } else {
                                    elem.animate([{
                                        height: `250px`
                                    }, {
                                        height: `50px`
                                    }], {
                                        duration: 300,
                                        fill: `forwards`
                                    });

                                    text[i].innerHTML = talks[i].innerHTML.slice(0, 50);
                                }
                                listToggle[i] = !listToggle[i];
                            })
                        })

                    }
                }
                prevTapCount = i;
            }
        });
    });



    function loadPhoto(category, number) {
        const data = xhq.responseXML.children[0];
        let chosen;
        Array.from(data.children).forEach(function (elem, i) {
            elem.tagName === category ? chosen = elem : 0;
        })

        const urlsInfo = Array.from(chosen.children).map(function (elem, i) {
            return elem.children[0].attributes[0].value;
        });
        const locsInfo = Array.from(chosen.children).map(function (elem, i) {
            return elem.children[1].children[0].innerHTML;
        });
        const areasInfo = Array.from(chosen.children).map(function (elem, i) {
            return elem.children[1].children[1].innerHTML;
        });


        const tap_area = document.querySelectorAll(`.tap_area`)[number];

        let textContain = ''
        for (let i = 0; i < chosen.children.length; i++) {
            textContain += `<div class="photo"><div class="cover"><div class="loc"></div><div class="area"></div></div></div>`;
        }
        tap_area.innerHTML = textContain;
        const qsa = document.querySelectorAll
        const locs = document.querySelectorAll(`.${category}_area .loc`);
        locs.forEach(function (elem, i) {
            elem.innerHTML = locsInfo[i];
        });
        const areas = document.querySelectorAll(`.${category}_area .area`);
        areas.forEach(function (elem, i) {
            elem.innerHTML = areasInfo[i];
        })
        const photos = document.querySelectorAll(`.${category}_area .photo`);
        photos.forEach(function (elem, i) {
            elem.style.backgroundImage = `url(${urlsInfo[i]})`
        })
        const photoPopup = document.querySelector(`.photo_popup_background`);
        const photoPopupExit = document.querySelector(`.photo_popup_exit_button`);
        const photoArea = document.querySelector(`.pic_area`);
        const photoInfo = document.querySelector(`#icon_location .loc_info`);
        photoPopupExit.addEventListener(`click`, function () {
            photoPopup.style.display = `none`;
        })
        photos.forEach(function (elem, i) {
            elem.addEventListener(`click`, function () {
                photoPopup.style.display = `flex`;
                const url = elem.style.backgroundImage;
                photoArea.style.backgroundImage = url;
                const areaInfo = elem.children[0].children[0].innerHTML;
                console.log(photoInfo);
                photoInfo.innerHTML = areaInfo;
            })
        })


    }

    /*f
        const favoriteList = data.children[2].children;
        const favoriteArea = document.querySelector(`.favorite_area`);
        Array.from(favoriteList).forEach(function (elem, i) {
            favoriteArea.innerHTML += (`<div class="photo"><div class="cover"><div class="upper"></div><div class="lower"></div></div></div>`)
        });
    }*/
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
