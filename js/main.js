  function init() {
      /*$('.intro').fadeOut(15000);*/

      const nav1 = document.getElementsByClassName('membership')[0];
      const nav1Exit = document.querySelector('.membership .exit_box');
      document.querySelector('header li').addEventListener('click', function () {
          nav1.style.display = 'block';
      })
      nav1Exit.addEventListener('click', function () {
          nav1.style.display = 'none';
      })
      const photoPopup = document.querySelector('.photo_popup_background');
      const photo = document.querySelectorAll('.photo');
      photo.forEach(function (i) {
          i.addEventListener('click', function () {
              photoPopup.style.display = 'flex';
          })
      })


      $.ajax({
          url: 'js/data.xml',
          type: "GET",
          success: function (result) {
              const length = $(result).children().children().length;
              const urls = [];
              $(result).children().children().children(`img`).each(function (i) {
                  urls.push($(this).attr('src'));
              });

              console.log(urls);
              for (let i = 0; i < length; i++) {
                  $('section .photoSection').append('<div class="secBackground"></div>');
              }
              $('section .photoSection').children('.secBackground').each(function (i) {
                  $(this).css({
                      width: `100vw`,
                      height: `100%`,
                      backgroundImage: `url(${urls[i]})`,
                      backgroundSize: `100% 100%`,
                      display: 'flex'
                  })
              })
              let pageCount = 0;
              let turningPoint = 0;
              setInterval(function () {
                  if (turningPoint === 0) {
                      $('section .photoSection').animate({
                          left: `${-100*pageCount}vw`
                      }, 2000)
                      pageCount++;
                      if (pageCount === length) {
                          turningPoint++;
                      }
                  } else {
                      pageCount--;
                      $('section .photoSection').animate({
                          left: `${-100*pageCount}vw`
                      }, 2000)

                      if (pageCount === 0) {
                          turningPoint--;
                      }
                  }
              }, 5000)
          }
      });
      let checkedCount = 0;
      let aHref = $('.main_search a').attr('href');
      $('.checklist').on('click', function () {
          if (checkedCount == 0) {
              $(this).addClass('checkOn');
              let idx = $(this).index();
              let temp = aHref.concat(idx.toString());
              $('.main_search a').attr('href', temp);
              checkedCount++;
          } else {

              $('.checklist').removeClass('checkOn');
              if ($(this).index() == $('.main_search a').attr('href')[$('.main_search a').attr('href').length - 1]) {
                  $(this).removeClass('checkOn');
                  $('.main_search a').attr('href', aHref);
              } else {
                  $(this).addClass('checkOn');
                  let idx = $(this).index();
                  let temp = aHref.concat(idx.toString());
                  $('.main_search a').attr('href', temp);

              }
          }
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
          myId = $(this).siblings(`.id`).val();
          console.log(this);
          $(this).parents(`.naver_container`).css(`display`, `none`);
          $(`.membership`).css(`display`, `none`);
          $(`#menu li`).eq(0).html(myId);
          $(`#menu li:first`).css({
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
          });

          let href1 = $(`#menu li`).eq(1).children(`a`).attr(`href`) + `#${myId}`;
          let href2 = $(`#menu li`).eq(2).children(`a`).attr(`href`) + `#${myId}`;

          $(`#menu li`).eq(1).children(`a`).attr(`href`, href1);
          $(`#menu li`).eq(2).children(`a`).attr(`href`, href2);

      })

  }
  window.onload = init;
