$(function () {
    $('#menu li').eq(0).children('a').on('click', function () {
        $('.membership').css('display', 'block');
    })
    $('.membership_container .exit_box').on('click', function () {
        $('.membership').css('display', 'none  ');
    })

    let loginCount = 0;
    let myId;
    let href = '';
    $(`.naver_container #login`).on(`click`, function () {
        loginCount++;
        myId = $(this).siblings(`#id`).val();
        console.log(myId);
        $(this).parents(`.naver_container`).css(`display`, `none`);
        $(`.membership`).css(`display`, `none`);
        $(`#menu li`).eq(0).html(myId);
        $(`#menu li:first`).css({
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
        });

        href = $(`#menu li`).eq(1).children(`a`).attr(`href`) + `#${myId}`;
        console.log(href);

        $(`#menu li`).eq(1).children(`a`).attr(`href`, href);
    })

    $(`.membership_container ul li`).on(`click`, function () {
        const idx = $(this).index();
        $(`.naver_container`).eq(idx).css(`display`, `flex`);
    })

    $(`.naver_exit`).on(`click`, function () {
        $(this).parent(`.naver`).closest(`.naver_container`).css(`display`, `none`);
    })


    $(`#menu li`).eq(1).on(`click`, function (e) {
        let txt = $(`#menu li`).eq(0).children(`a`)
        if (txt !== '로그인') {

        } else {
            alert(`로그인이 필요합니다`);
            e.preventDefault();
        }

    })

    if (window.location.href.indexOf(`#`) !== -1) {
        let href = window.location.href;
        let len = href.length - href.indexOf('#')
        if (len > 1) {
            console.log(len - 1)
            myId = href.slice(-len + 1);
            console.log(myId);
            $('#menu').children('li').eq(0).html(myId);
        }
    }

    $.ajax({
        url: `js/notice.xml`,
        type: `GET`,
        dataType: `xml`,
        success: function (data) {
            const notice = $(data).children();
            console.log(notice.children().length);
            /*  for (let i = 0; i < notice.children().length; i++) {
                  for (let j = 0; j < 6; j++) {
                      if (Math.floor(i / 10) == j) {
                          $(`section`).eq(j).append(`<div class="list"><div class="number"></div><div class="writer"></div><div class="detail"></div></div>`);
                      }
                  }
              }*/
            const noticeLength = 10;
            for (let i = 0; i < noticeLength; i++) {
                $(`section`).append(`<div class="list"><div class="number"></div><div class="writer"></div><div class="detail"></div></div>`);
            }
            $(`section`).children(`.list`).css({
                width: `90%`,
                height: `45px`,
                display: `flex`,
                justifyContent: `space - around`,
                alignItems: `center`
            })
            $(`section`).children().children(`.number`).css({
                width: `10%`,
                height: `100%`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`
            })
            $(`section`).children().children(`.writer`).css({
                width: `10%`,
                height: `100%`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`
            })
            $(`section`).children().children(`.detail`).css({
                width: `70%`,
                height: `100%`,
                display: `flex`,
                justifyContent: `flex-start`,
                alignItems: `center`
            })
            console.log(notice.children().eq(5))
            for (let i = 0; i < notice.children().length; i++) {
                for (let j = 0; j < 6; j++) {
                    $(`section`).eq(j).children(`.list`).eq(i - 10 * j).children(`.number`).text(notice.children().eq(i).children(`number`).text());
                    $(`section`).eq(j).children(`.list`).eq(i - 10 * j).children(`.writer`).text(notice.children().eq(i).children(`writer`).text());
                    $(`section`).eq(j).children(`.list`).eq(i - 10 * j).children(`.detail`).text(notice.children().eq(i).children(`detail`).text().slice(0, 45));
                }
            }

            let openCheck = [];


            $(`section`).children(`.list`).each(function () {
                openCheck.push(false);
            });
            console.log(openCheck);

            $(`section`).children(`.list`).on(`click`, function () {
                const idx = $(this).index();
                if (openCheck[idx] == false) { // 닫혀있다면
                    $(this).animate({
                        height: `200px`,
                    }, 300);
                    $(this).css({
                        alignItems: `flex-start`,
                    })
                    $(this).parent(`section`).animate({
                        height: `70vh`,
                    }, 300);
                    $(this).children(`div`).css(`align-items`, `flex-start`);
                    $(this).css(`padding-top`, `30px`);
                    $(this).siblings().css(`padding-top`, `0`);
                    $(this).children(`.detail`).text(notice.children().eq(idx).children(`detail`).text());
                    $(this).siblings().animate({
                        height: `45px`,
                    }, 300);
                    $(this).siblings().children(`.detail`).text(notice.children().eq(idx).children(`detail`).text().slice(0, 45))
                    openCheck[idx] = true;

                } else {
                    $(this).animate({
                        height: `45px`,
                    }, 300);
                    $(this).parent(`section`).animate({
                        height: `55vh`,
                    }, 300);
                    $(this).children(`div`).css(`align-items`, `center`);
                    $(this).css(`padding-top`, `0`);
                    $(this).siblings().css(`padding-top`, `0`);
                    $(this).children(`.detail`).text(notice.children().eq(idx).children(`detail`).text().slice(0, 45));
                    $(this).siblings().children(`detail`).text(notice.children().eq(idx).children(`detail`).text().slice(0, 45))
                    openCheck[idx] = false;
                }
            })
            $(`.list:even`).css(`background`, `#ccc`)
            $(`.noticeList`).children(`li`).on(`click`, function () {
                const idx = $(this).index();

                console.log($(notice).children())
                for (let i = 0; i < 10; i++) {
                    $(`section`).children(`.list`).eq(i).children(`.number`).text($(notice).children().eq(idx * 10 + i).children(`number`).text());
                    $(`section`).children(`.list`).children(`.writer`).text($(notice).children().eq(idx * 10 + i).children(`writer`).text());
                    $(`section`).children(`.list`).children(`.detail`).text($(notice).children().eq(idx * 10 + i).children(`detail`).text().slice(0, 45));
                }
            })

        }
    })


})
