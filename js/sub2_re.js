function init() {



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
