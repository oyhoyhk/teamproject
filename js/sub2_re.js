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


    function loadPhoto(category, number) {
        const data = xhq.responseXML.children[0];
        let chosen;
        Array.from(data.children).forEach(function (elem, i) {
            elem.tagName === category ? chosen = elem : 0;
        })


        const urls = Array.from(chosen.children).map(function (elem, i) {
            return elem.children[0].attributes[0].value;
        });
        const locs = Array.from(chosen.children).map(function (elem, i) {
            return elem.children[1].children[0].innerHTML;
        });
        const areas = Array.from(chosen.children).map(function (elem, i) {
            return elem.children[1].children[1].innerHTML;
        });

        console.log(chosen.children.length);

        const tap_area = document.querySelectorAll(`.tap_area`)[number];
        console.log(tap_area);

        for (let i = 0; i < chosen.children.length; i++) {
            tap_area.innerHTML += `<div class="photo"><div class="cover"><div class="loc"></div><div class="area"></div></div></div>`;
        }
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
