$(function () {
    const photoPopup = document.querySelector('.photo_popup_background');
    const photo = document.querySelectorAll('.photo');
    photo.forEach(function (i) {
        i.addEventListener('click', function () {
            photoPopup.style.display = 'flex';
        })
    })
    const photoExitButton = document.querySelector('.photo_popup_exit_button');
    photoExitButton.addEventListener('click', function () {
        photoPopup.style.display = 'none';
    });

    const idInfo = window.location.hash.slice(1);
    $(`#menu li:first`).html(idInfo);
    const tempHref = $(`#menu li`).eq(1).children(`a`).attr(`href`);
    $(`#menu li`).eq(1).children(`a`).attr(`href`, tempHref + `#${idInfo}`);
    $(`.myinfo .myinfo_name`).text(idInfo);
    $(`.myinfo_write_button`).on(`click`, function () {
        let a = prompt(`닉네임을 입력해주세요`);
        $(`.myinfo_name`).text(a);
    })

    $.ajax({
        url: 'js/person.xml',
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            const a = $($(data)[2]);
            const backImg = a.children(`profile`).children(`backImg`).text();
            $(`.myinfo .myinfo_upper`).css({
                backgroundImage: `url(${backImg})`,
                backgroundSize: `500% 100%`,
                backgroundPosition: `100% 0`
            })
            const mainImg = a.children(`profile`).children(`mainImg`).text();
            $(`.myinfo .myinfo_myphoto`).css({
                backgroundImage: `url(${mainImg})`,
                backgroundSize: `100% 150%`,
            })

            const favoriteLength = a.children(`favorite`).children(`figure`).length;
            const likeLength = a.children(`like`).children(`figure`).length;

            for (let i = 0; i < favoriteLength; i++) {
                $('.favorite').append('<div class="favoritePhoto"><div class="cover"></div></div>');
            }
            for (let i = 0; i < likeLength; i++) {
                $('.like').append('<div class="likePhoto"><div class="cover"></div></div>');
            }
            console.log();

            $(`.favoritePhoto`).each(function (i) {
                let src = a.children(`favorite`).children(`figure`).eq(i).children(`img`).attr(`src`);
                $(this).css({
                    backgroundImage: 'url(' + src + ')',
                    backgroundSize: `150% 150%`,
                    width: `230px`,
                    height: `230px`,
                    display: `inline-block`,
                    marginRight: `42px`,
                    marginBottom: `25px`,
                    position: `relative`,
                })
                if ((i + 1) % 4 == 0) {
                    $(this).css(`marginRight`, 0);
                }

                $(this).children(`.cover`).append(`<div class="b">${a.children(`favorite`).children(`figure`).eq(i).children(`figcaption`).children(`b`).text()}</div>`);
                $(this).children(`.cover`).append(`<div class="small">${a.children(`favorite`).children(`figure`).eq(i).children(`figcaption`).children(`small`).text()}</div>`);
                $(this).children(`.cover`).append(`<div class="filter">${a.children(`favorite`).children(`figure`).eq(i).children(`figcaption`).children(`filter`).text()}</div>`);

                $(this).children(`.cover`).css({
                    width: `100%`,
                    height: `100%`,
                    background: `black`,
                    opacity: 0,
                    position: `absolute`,
                    color: `white`,
                    left: 0,
                    top: 0,
                    zIndex: 0
                });

            })
            $(`.favoritePhoto`).on(`mouseenter`, function () {
                $(this).children(`.cover`).animate({
                    opacity: `.8`,
                }, 500)
            })
            $(`.favoritePhoto`).on(`mouseleave`, function () {
                $(this).children(`.cover`).animate({
                    opacity: 0,
                }, 500)
            })

            $(`.favoritePhoto`).on(`click`, function () {
                let idx = $(this).index();
                $(`.photo_popup_background`).css('display', 'flex');
                let iText = a.children(`favorite`).children(`figure`).eq(idx).children(`figcaption`).children(`b`).text();
                let iSrc = a.children(`favorite`).children(`figure`).eq(idx).children(`img`).attr(`src`);
                $(`#icon_location`).text(iText);
                $(`.pic_area`).css({
                    backgroundImage: `url(${iSrc})`,
                    backgroundSize: `100% 100%`,
                })
            })

            $(`.likePhoto`).each(function (i) {
                let src = a.children(`like`).children(`figure`).eq(i).children(`img`).attr(`src`);
                $(this).css({
                    backgroundImage: 'url(' + src + ')',
                    backgroundSize: `150% 150%`,
                    width: `230px`,
                    height: `230px`,
                    display: `inline-block`,
                    marginRight: `42px`,
                    marginBottom: `25px`,
                    position: `relative`,
                })
                if ((i + 1) % 4 == 0) {
                    $(this).css(`marginRight`, 0);
                }

                $(this).children(`.cover`).append(`<div class="b">${a.children(`like`).children(`figure`).eq(i).children(`figcaption`).children(`b`).text()}</div>`);
                $(this).children(`.cover`).append(`<div class="small">${a.children(`like`).children(`figure`).eq(i).children(`figcaption`).children(`small`).text()}</div>`);
                $(this).children(`.cover`).append(`<div class="filter">${a.children(`like`).children(`figure`).eq(i).children(`figcaption`).children(`filter`).text()}</div>`);

                $(this).children(`.cover`).css({
                    width: `100%`,
                    height: `100%`,
                    background: `black`,
                    opacity: 0,
                    position: `absolute`,
                    color: `white`,
                    left: 0,
                    top: 0,
                    zIndex: 0
                });

            })
            $(`.likePhoto`).on(`mouseenter`, function () {
                $(this).children(`.cover`).animate({
                    opacity: `.8`,
                }, 500)
            })
            $(`.likePhoto`).on(`mouseleave`, function () {
                $(this).children(`.cover`).animate({
                    opacity: 0,
                }, 500)
            })

            $(`.likePhoto`).on(`click`, function () {
                let idx = $(this).index();
                $(`.photo_popup_background`).css('display', 'flex');
                let iText = a.children(`favorite`).children(`figure`).eq(idx).children(`figcaption`).children(`b`).text();
                let iSrc = a.children(`favorite`).children(`figure`).eq(idx).children(`img`).attr(`src`);
                $(`#icon_location`).text(iText);
                $(`.pic_area`).css({
                    backgroundImage: `url(${iSrc})`,
                    backgroundSize: `100% 100%`,
                })
            })

            const talkLength = a.children(`comments`).children(`talk`).length;
            const talk = a.children(`comments`).children(`talk`);
            const when = a.children(`comments`).children(`when`);

            for (let j = 0; j < talkLength; j++) {
                $(`.comment`).append(`<div class="talkBox"></div>`);
                $(`.comment`).children(`.talkBox`).eq(j).css({
                    display: `flex`,
                    width: `95%`,
                    height: `50px`,
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    lineHeight: `50px`
                });
                $(`.comment`).children(`.talkBox`).eq(j).append(`<div class='when'></div><div class="talk"></div>`);
                $(`.comment`).children(`.talkBox`).eq(j).children(`.when`).css({
                    width: `20%`,
                    height: `100%`,
                    textAlign: `center`,
                    lineHeight: `50px`,
                });
                $(`.comment`).children(`.talkBox`).eq(j).children(`.talk`).css({
                    width: `75%`,
                    height: `100%`,
                    textAlign: `left`,
                })
                $(`.comment`).children(`.talkBox`).eq(j).children(`.when`).text(when.eq(j).text());
                $(`.comment`).children(`.talkBox`).eq(j).children(`.talk`).text(talk.eq(j).text().slice(0, 40));
            }

            let talkCount = [];
            for (let i = 0; i < talkLength; i++) {
                talkCount.push(0);
            }
            $(`.talkBox`).on(`click`, function () {
                const idx = $(this).index();
                if (talkCount[idx] == 0) {
                    $(this).animate({
                        height: `290px`
                    }, 300);
                    setTimeout(function () {
                        console.log($(this))
                        $(`.talkBox`).eq(idx).children(`.talk`).html(talk.eq(idx).text());
                        $(`.talkBox`).eq(idx).css(`line-height`, `30px`);
                        $(`.talkBox`).eq(idx).css(`padding-top`, `30px`);
                    }, 100)
                    talkCount[idx]++;
                } else {
                    $(this).animate({
                        height: `60px`
                    }, 300);
                    setTimeout(function () {
                        $(`.talkBox`).eq(idx).children(`.talk`).html(talk.eq(idx).text().slice(0, 40));
                        $(`.talkBox`).eq(idx).css(`line-height`, `60px`);
                        $(`.talkBox`).eq(idx).css(`padding-top`, `0px`);
                    }, 100)
                    talkCount[idx]--;
                }
            })
        }

    });

    let pageCount = 0;
    $(`.tap_menu div`).on(`click`, function () {
        let idx = $(this).index();
        $(`.photos`).eq(idx).siblings(`.photos`).animate({
            opacity: 0
        }, 500)
        setTimeout(function () {
            $(`.photos`).eq(idx).animate({
                opacity: 1
            }, 500);
            $(`.photos`).eq(idx).css(`zIndex`, 5);
            $(`.photos`).eq(idx).siblings(`.photos`).css(`zIndex`, 1);
        }, 500)
    })

})
