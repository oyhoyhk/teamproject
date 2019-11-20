  function init() {
      $('#menu li').eq(0).children('a').on('click', function () {
          $('.membership').css('display', 'block');
      })
      let a = $('.membership_container .exit_box');

      a.on('click', function () {
          $('.membership').css('display', 'none  ');
      });


      //문서 로딩 시 ajax로 photo 생성 후 배치
      $.ajax({
          url: 'js/data.xml',
          type: 'GET',
          dataType: 'xml',
          success: function (data) {

              // data.xml 정보들
              // b : 위치, small : 지역, filter : 카테고리

              const item = $(data).children();
              const figures = item.children('figure');
              const bs = figures.children('figcaption').children('b');
              const smalls = figures.children('figcaption').children('small');
              const filters = figures.children('figcaption').children('filter');
              const imgs = figures.children('img');

              // data.xml을 토대로 photo 생성 및 배치
              const loc = window.location.href;
              const parsedNumber = loc[loc.length - 1];


              if (parsedNumber != '#') {
                  //선택된 카테고리 0 자연 1 건축 2 인물 3 음식
                  const chosenText = $('.lists').children('div').eq(parsedNumber * 1 + 1).text();
                  const chosenList = filters.map(function (i) {
                      if ($(this).text() === chosenText) {
                          return figures.eq(i);
                      }
                  });

                  for (let i = 0; i < chosenList.length; i++) {
                      $('.photos').append('<div class="photo"><div class="cover"></div></div>');
                  }
                  $('.photo').each(function (i) {
                      let src = chosenList[i].children('img').attr('src');

                      $(this).css({
                          width: `200px`,
                          height: `200px`,
                          display: `inline-block`,
                          border: `1px solid black`,
                          marginRight: `18px`,
                          marginBottom: `20px`,
                          background: `url(${src})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: `relative`,
                          color: `white`,
                      });
                      if ((i + 1) % 7 == 0) {
                          $(this).css({
                              marginRight: 0
                          })
                      }

                  })
                  $('.photo .cover').each(function (i) {
                      $(this).css({
                          width: `100%`,
                          height: `100%`,
                          background: `black`,
                          opacity: 0,
                          position: `absolute`,
                          left: 0,
                          top: 0,
                          zIndex: 0
                      })
                      $(this).append(`<div class="b">${chosenList[i].children(`figcaption`).children(`b`).text()}</div>`)
                      $(this).append(`<div class="small">${chosenList[i].children(`figcaption`).children(`small`).text()}</div>`)
                      $(this).append(`<div class="filter">${chosenList[i].children(`figcaption`).children(`filter`).text()}</div>`)
                  })
                  $(`.photo`).on(`mouseenter`, function () {
                      $(this).children(`.cover`).animate({
                          opacity: `.8`,
                      }, 500)
                  })
                  $(`.photo`).on(`mouseleave`, function () {
                      $(this).children(`.cover`).animate({
                          opacity: 0,
                      }, 500)
                  })
                  $(`.lists div`).eq(parsedNumber * 1 + 1).addClass('listOn');
                  $(`.photo`).on(`click`, function () {
                      let idx = $(this).index();
                      console.log(idx);
                      $(`.photo_popup_background`).css('display', 'flex');
                      let iText = chosenList[idx].children(`figcaption`).children(`b`).text();
                      console.log(iText);
                      let iSrc = chosenList[idx].children(`img`).attr(`src`);
                      console.log(iSrc);
                      $(`#icon_location`).text(iText);
                      $(`.pic_area`).css({
                          backgroundImage: `url(${iSrc})`,
                          backgroundSize: `100% 100%`,
                      })
                  })

              } else {
                  for (let i = 0; i < figures.length; i++) {
                      $('.photos').append('<div class="photo"><div class="cover"></div></div>');
                  }
                  $('.photo').each(function (i) {
                      let src = imgs.eq(i).attr('src');

                      $(this).css({
                          width: `200px`,
                          height: `200px`,
                          display: `inline-block`,
                          border: `1px solid black`,
                          marginRight: `18px`,
                          marginBottom: `20px`,
                          background: `url(${src})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: `relative`,
                          color: `white`,
                      });
                      if ((i + 1) % 7 == 0) {
                          $(this).css({
                              marginRight: 0
                          })
                      }

                  })
                  $('.photo .cover').each(function (i) {
                      $(this).css({
                          width: `100%`,
                          height: `100%`,
                          background: `black`,
                          opacity: 0,
                          position: `absolute`,
                          left: 0,
                          top: 0,
                          zIndex: 0
                      })
                      $(this).append(`<div class="b">${bs.eq(i).text()}</div>`)
                      $(this).append(`<div class="small">${smalls.eq(i).text()}</div>`)
                      $(this).append(`<div class="filter">${filters.eq(i).text()}</div>`)
                  })
                  $(`.photo`).on(`mouseenter`, function () {
                      $(this).children(`.cover`).animate({
                          opacity: `.8`,
                      }, 500)
                  })
                  $(`.photo`).on(`mouseleave`, function () {
                      $(this).children(`.cover`).animate({
                          opacity: 0,
                      }, 500)
                  })

                  $(`.photo`).on(`click`, function () {
                      let idx = $(this).index();
                      $(`.photo_popup_background`).css('display', 'flex');
                      let iText = bs.eq(idx).text();
                      let iSrc = imgs.eq(idx).attr(`src`);
                      $(`#icon_location`).text(iText);
                      $(`.pic_area`).css({
                          backgroundImage: `url(${iSrc})`,
                          backgroundSize: `100% 100%`,
                      })
                  })
              }


          } // sub1 페이지 로딩 완료
      })
      // header search 버튼 클릭
      let inputText = '';
      let inputHref = 'sub1.html#';

      $('#main_search').on('change', function (e) {
          inputText = e.target.value;
          console.log(inputText);
          if (inputText === '자연') {
              console.log(inputText);
              inputHref += '0';
          } else if (inputText === '건축') {
              console.log(inputText);
              inputHref += '1';
          } else if (inputText === '인물') {
              console.log(inputText);
              inputHref += '2';
          } else if (inputText === '음식') {
              console.log(inputText);
              inputHref += '3';
          } else {

          }
      });

      $('#main_search').on('keydown', function (e) {
          if (e.key === 'Enter' && (inputText === '자연' || inputText === '건축' || inputText === '인물' || inputText === '음식')) {
              window.location.href = inputHref;
          }
      })


      $('.search').on('click', function () {
          // window.location.href = 'sub1.html';
          if (inputText === '자연' || inputText === '건축' || inputText === '인물' || inputText === '음식' || inputText == '') {
              window.location.href = inputHref;
          } else {
              alert('자연, 건축, 인물, 음식 중에서 입력해주세요!')
          }

      })



      $(`.membership_container ul li`).on(`click`, function () {
          const idx = $(this).index();
          $(`.naver_container`).eq(idx).css(`display`, `flex`);
      })
      $(`.naver_exit`).on(`click`, function () {
          $(this).parent(`.naver`).closest(`.naver_container`).css(`display`, `none`);
      })


      // 왼쪽 카테고리 리스트 선택시
      $('.lists div').on('click', function () {
          $(`.photos`).html('');
          $(this).addClass('listOn').siblings().removeClass('listOn');
          let idx = $(this).index();
          $.ajax({
              url: 'js/data.xml',
              type: 'GET',
              success: function (data) {
                  const item = $(data).children();
                  const figures = item.children('figure');
                  const bs = figures.children('figcaption').children('b');
                  const smalls = figures.children('figcaption').children('small');
                  const filters = figures.children('figcaption').children('filter');
                  const imgs = figures.children('img');

                  // data.xml을 토대로 photo 생성 및 배치


                  if (idx !== 0) {
                      //선택된 카테고리 0 자연 1 건축 2 인물 3 음식
                      const chosenText = $('.lists').children('div').eq(idx).text();
                      const chosenList = filters.map(function (i) {
                          if ($(this).text() === chosenText) {
                              return figures.eq(i);
                          }
                      });
                      console.log(chosenList);
                      for (let i = 0; i < chosenList.length; i++) {
                          $('.photos').append('<div class="photo"><div class="cover"></div></div>');
                      }
                      $('.photo').each(function (i) {
                          let src = chosenList[i].children('img').attr('src');

                          $(this).css({
                              width: `200px`,
                              height: `200px`,
                              display: `inline-block`,
                              border: `1px solid black`,
                              marginRight: `18px`,
                              marginBottom: `20px`,
                              background: `url(${src})`,
                              backgroundSize: `150% 100%`,
                              backgroundPosition: `50% 0`,
                              position: `relative`,
                              color: `white`,
                          });
                          if ((i + 1) % 7 == 0) {
                              $(this).css({
                                  marginRight: 0
                              })
                          }

                      })
                      $('.photo .cover').each(function (i) {
                          $(this).css({
                              width: `100%`,
                              height: `100%`,
                              background: `black`,
                              opacity: 0,
                              position: `absolute`,
                              left: 0,
                              top: 0,
                              zIndex: 0
                          })
                          $(this).append(`<div class="b">${chosenList[i].children(`figcaption`).children(`b`).text()}</div>`)
                          $(this).append(`<div class="small">${chosenList[i].children(`figcaption`).children(`small`).text()}</div>`)
                          $(this).append(`<div class="filter">${chosenList[i].children(`figcaption`).children(`filter`).text()}</div>`)
                      })
                      $(`.photo`).on(`mouseenter`, function () {
                          $(this).children(`.cover`).animate({
                              opacity: `.8`,
                          }, 500)
                      })
                      $(`.photo`).on(`mouseleave`, function () {
                          $(this).children(`.cover`).animate({
                              opacity: 0,
                          }, 500)
                      })
                      $(`.lists div`).eq(idx).addClass('listOn');
                      $(`.photo`).on(`click`, function () {
                          let idx = $(this).index();
                          console.log(idx);
                          $(`.photo_popup_background`).css('display', 'flex');
                          let iText = chosenList[idx].children(`figcaption`).children(`b`).text();
                          console.log(iText);
                          let iSrc = chosenList[idx].children(`img`).attr(`src`);
                          console.log(iSrc);
                          $(`#icon_location`).text(iText);
                          $(`.pic_area`).css({
                              backgroundImage: `url(${iSrc})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                      $(`.area .checkbox`).removeClass(`areaOn`);

                  } else {
                      for (let i = 0; i < figures.length; i++) {
                          $('.photos').append('<div class="photo"><div class="cover"></div></div>');
                      }
                      $('.photo').each(function (i) {
                          let src = imgs.eq(i).attr('src');

                          $(this).css({
                              width: `200px`,
                              height: `200px`,
                              display: `inline-block`,
                              border: `1px solid black`,
                              marginRight: `18px`,
                              marginBottom: `20px`,
                              background: `url(${src})`,
                              backgroundSize: `150% 100%`,
                              backgroundPosition: `50% 0`,
                              position: `relative`,
                              color: `white`,
                          });
                          if ((i + 1) % 7 == 0) {
                              $(this).css({
                                  marginRight: 0
                              })
                          }

                      })
                      $('.photo .cover').each(function (i) {
                          $(this).css({
                              width: `100%`,
                              height: `100%`,
                              background: `black`,
                              opacity: 0,
                              position: `absolute`,
                              left: 0,
                              top: 0,
                              zIndex: 0
                          })
                          $(this).append(`<div class="b">${bs.eq(i).text()}</div>`)
                          $(this).append(`<div class="small">${smalls.eq(i).text()}</div>`)
                          $(this).append(`<div class="filter">${filters.eq(i).text()}</div>`)
                      })
                      $(`.photo`).on(`mouseenter`, function () {
                          $(this).children(`.cover`).animate({
                              opacity: `.8`,
                          }, 500)
                      })
                      $(`.photo`).on(`mouseleave`, function () {
                          $(this).children(`.cover`).animate({
                              opacity: 0,
                          }, 500)
                      })
                      $(`.photo`).on(`click`, function () {
                          let idx = $(this).index();
                          $(`.photo_popup_background`).css('display', 'flex');
                          let iText = bs.eq(idx).text();
                          let iSrc = imgs.eq(idx).attr(`src`);
                          $(`#icon_location`).text(iText);
                          $(`.pic_area`).css({
                              backgroundImage: `url(${iSrc})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                      $(`.area .checkbox`).removeClass(`areaOn`);
                  }
              }
          })
      })

      $(`.photo_popup_exit_button`).on(`click`, function () {
          $(`.photo_popup_background`).css(`display`, `none`);
          $(`#icon_like`).css(`backgroundImage`, `url(img/icon_like.png)`);
          $(`#icon_favorite`).css(`backgroundImage`, `url(img/icon_bookmark.png)`);
      });

      let toggleArray = [];
      for (let i = 0; i < 7; i++) {
          toggleArray.push(false);
      }
      $(`.area`).children(`span`).on(`click`, function () {
          $(`.photo`).each(function () {
              $(this).css(`display`, `none`);
          });
          let idx = $(this).parent().index();
          if (idx < 7) {
              toggleArray[idx] = !toggleArray[idx];
              toggleArray.forEach(function (elem, i) {
                  if (elem) {
                      const text = $(`.area`).eq(i).children(`span:first`).text();
                      $(`.photo`).each(function (i) {
                          if (text === $(this).children(`.cover`).children(`.small`).text()) {
                              $(this).css(`display`, `inline-block`);
                          }
                      })
                  }
              })

              if (toggleArray[idx]) {
                  $(this).parent().children('span:last').addClass('areaOn');

              } else {
                  $(this).parent().children('span:last').removeClass('areaOn');
              }
              const sortArray = $(`.photo`).map(function (i) {
                  if ($(this).css(`display`) === `inline-block`) {
                      return $(this);
                  }
              })
              sortArray.each(function (i) {
                  $(this).css(`marginRight`, `18px`);
                  if ((i + 1) % 7 == 0) {
                      $(this).css(`marginRight`, 0);

                  }
              })
          }
          if (idx === 7) {
              for (let i = 0; i < toggleArray.length; i++) {
                  toggleArray[i] = false;
              }
              $(`.photo`).each(function (i) {
                  $(this).css(`display`, `inline-block`);
                  $(this).css(`marginRight`, `18px`);
                  if ((i + 1) % 7 === 0) {
                      $(this).css(`marginRight`, 0);
                  }
              });
              $(`.area .checkbox`).removeClass(`areaOn`);
          }
          console.log(toggleArray);

          let toggleCount = 0;
          for (let i = 0; i < 7; i++) {
              if (!toggleArray[i]) {
                  toggleCount++;
              }
          }
          if (toggleCount == 7) {
              $(`.photo`).each(function (i) {
                  $(this).css(`display`, `inline-block`);
                  $(this).css(`marginRight`, `18px`);
                  if ((i + 1) % 7 === 0) {
                      $(this).css(`marginRight`, 0);
                  }
              });
              $(`.area .checkbox`).removeClass(`areaOn`);
          }
      });

      $(`.membership_container ul li`).on(`click`, function () {
          const idx = $(this).index();
          $(`.naver_container`).eq(idx).css(`display`, `flex`);
      })
      $(`.naver_exit`).on(`click`, function () {
          $(this).parent(`.naver`).closest(`.naver_container`).css(`display`, `none`);
      })




      // 임시 로그인 ㅎㅎ..

      let loginCount = 0;
      let myId = '';



      $(`#menu li`).eq(1).on(`click`, function (e) {
          if (loginCount == 0) {
              alert(`로그인이 필요합니다`);
              e.preventDefault();
          }
      })

      if (loginCount != 0) {}


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
          })

          let href = $(`#menu li`).eq(1).children(`a`).attr(`href`) + `#${myId}`;
          $(`#menu li`).eq(1).children(`a`).attr(`href`, href);
      })
      let favoriteCount = 0;
      $(`#icon_favorite`).on(`click`, function () {
          if (loginCount == 0) {
              alert(`로그인이 필요합니다.`);
          } else {
              if (favoriteCount != 0) {
                  $(this).css(`backgroundImage`, `url(img/icon_bookmarkOn.png)`);
                  favoriteCount++;
              } else {
                  $(this).css(`backgroundImage`, `url(img/icon_bookmark.png)`);
                  favoriteCount--;
              }
          }
      })
      let likeCount = 0;
      $(`#icon_like`).on(`click`, function () {
          if (loginCount == 0) {
              alert(`로그인이 필요합니다.`);
          } else {
              if (likeCount != 0) {
                  $(this).css(`backgroundImage`, `url(img/icon_likeOn.png)`);
                  likeCount++;
              } else {
                  $(this).css(`backgroundImage`, `url(img/icon_like.png)`);
                  likeCount--;
              }
          }
      })


  }
  window.onload = init;
