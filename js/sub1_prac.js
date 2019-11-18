  function init() {
      const categoryInfo = window.location.href[window.location.href.length - 1];
      const nav1 = document.getElementsByClassName('membership')[0];
      const nav1Exit = document.querySelector('.membership .exit_box');
      document.querySelector('header li').addEventListener('click', function () {
          nav1.style.display = 'block';
      })
      nav1Exit.addEventListener('click', function () {
          nav1.style.display = 'none';
      })

      //문서가 시작하면 ajax로 모든 사진 정보를 불러와 photo를 채운다

      $.ajax({
          url: 'js/data.xml',
          type: 'get',
          // ajax로 파일 불러온다면 아래 success function 실행
          success: function (result) {

              const length = $(result).children().children('figure').length;
              console.log(length);
              const urls = $(result).children().children('figure').children('img').map(function (i) {
                  return $(this).attr('src');
              })
              const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                  return $(this);
              });
              const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                  return $(this);
              });
              console.log(categoryInfo);
              const text = $('.lists').children('div').eq(categoryInfo * 1 + 1).text();
              $('.lists').children('div').eq(categoryInfo * 1 + 1).addClass('listOn');

              console.log(text);
              if (categoryInfo == 0) {
                  let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                  const urls = filters.map(function (filter, i) {
                      if ($(this).text() === text) {
                          return $(this).parent('figcaption').siblings('img').attr('src');
                      }
                  })
                  const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                      return $(this);
                  });
                  const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                      return $(this);
                  });


                  for (let i = 0; i < urls.length; i++) {
                      $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                      $('.photo').eq(i).css({
                          width: `200px`,
                          height: `200px`,
                          display: 'inline-block',
                          border: `1px solid black`,
                          marginRight: '18px',
                          marginBottom: `20px`,
                          overflow: `hidden`,
                          background: `url(${urls[i]})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: 'relative',
                      });
                      $('.photo').eq(i).children('div').eq(0).css({
                          position: 'absolute',
                          left: '5px',
                          top: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      });
                      $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                      $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                      $('.photo').eq(i).children('div').eq(1).css({
                          position: 'absolute',
                          left: '5px',
                          bottom: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      })
                      $('.photo').eq(i).children('div').eq(2).css({
                          width: '100%',
                          height: '100%',
                          background: `black`,
                          opacity: 0
                      })
                      if ((i + 1) % 7 == 0) {
                          $('.photo').eq(i).css('marginRight', 0);
                      }
                      $('.photo').eq(i).on('mouseenter', function () {
                          $(this).children('.cover').animate({
                              opacity: 0.7
                          }, 300)
                          $(this).children('div').css({
                              color: 'white'
                          })
                      })
                      $('.photo').eq(i).on('mouseleave', function () {
                          $(this).children('.cover').animate({
                              opacity: 0
                          }, 300)
                          $(this).children('div').css({
                              color: 'transparent'
                          })
                      })
                      $('.photo').eq(i).children('.cover').on('click', function () {
                          $(`.photo_popup_background`).css('display', 'flex')
                          $(`.pic_area`).css({
                              background: `url(${urls[i]})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                  }
              } else if (categoryInfo == 1) {
                  let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                  const urls = filters.map(function (filter, i) {
                      if ($(this).text() === text) {
                          return $(this).parent('figcaption').siblings('img').attr('src');
                      }
                  })
                  const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                      return $(this);
                  });
                  const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                      return $(this);
                  });
                  console.log(bs)

                  for (let i = 0; i < urls.length; i++) {
                      $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                      $('.photo').eq(i).css({
                          width: `200px`,
                          height: `200px`,
                          display: 'inline-block',
                          border: `1px solid black`,
                          marginRight: '18px',
                          marginBottom: `20px`,
                          overflow: `hidden`,
                          background: `url(${urls[i]})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: 'relative',
                      });
                      $('.photo').eq(i).children('div').eq(0).css({
                          position: 'absolute',
                          left: '5px',
                          top: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      });
                      $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                      $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                      $('.photo').eq(i).children('div').eq(1).css({
                          position: 'absolute',
                          left: '5px',
                          bottom: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      })
                      $('.photo').eq(i).children('div').eq(2).css({
                          width: '100%',
                          height: '100%',
                          background: `black`,
                          opacity: 0
                      })
                      if ((i + 1) % 7 == 0) {
                          $('.photo').eq(i).css('marginRight', 0);
                      }
                      $('.photo').eq(i).on('mouseenter', function () {
                          $(this).children('.cover').animate({
                              opacity: 0.7
                          }, 300)
                          $(this).children('div').css({
                              color: 'white'
                          })
                      })
                      $('.photo').eq(i).on('mouseleave', function () {
                          $(this).children('.cover').animate({
                              opacity: 0
                          }, 300)
                          $(this).children('div').css({
                              color: 'transparent'
                          })
                      })
                      $('.photo').eq(i).children('.cover').on('click', function () {
                          $(`.photo_popup_background`).css('display', 'flex')
                          $(`.pic_area`).css({
                              background: `url(${urls[i]})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                  }
              } else if (categoryInfo == 2) {
                  let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                  const urls = filters.map(function (filter, i) {
                      if ($(this).text() === text) {
                          return $(this).parent('figcaption').siblings('img').attr('src');
                      }
                  })
                  const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                      return $(this);
                  });
                  const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                      return $(this);
                  });


                  for (let i = 0; i < urls.length; i++) {
                      $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                      $('.photo').eq(i).css({
                          width: `200px`,
                          height: `200px`,
                          display: 'inline-block',
                          border: `1px solid black`,
                          marginRight: '18px',
                          marginBottom: `20px`,
                          overflow: `hidden`,
                          background: `url(${urls[i]})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: 'relative',
                      });
                      $('.photo').eq(i).children('div').eq(0).css({
                          position: 'absolute',
                          left: '5px',
                          top: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      });
                      $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                      $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                      $('.photo').eq(i).children('div').eq(1).css({
                          position: 'absolute',
                          left: '5px',
                          bottom: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      })
                      $('.photo').eq(i).children('div').eq(2).css({
                          width: '100%',
                          height: '100%',
                          background: `black`,
                          opacity: 0
                      })
                      if ((i + 1) % 7 == 0) {
                          $('.photo').eq(i).css('marginRight', 0);
                      }
                      $('.photo').eq(i).on('mouseenter', function () {
                          $(this).children('.cover').animate({
                              opacity: 0.7
                          }, 300)
                          $(this).children('div').css({
                              color: 'white'
                          })
                      })
                      $('.photo').eq(i).on('mouseleave', function () {
                          $(this).children('.cover').animate({
                              opacity: 0
                          }, 300)
                          $(this).children('div').css({
                              color: 'transparent'
                          })
                      })
                      $('.photo').eq(i).children('.cover').on('click', function () {
                          $(`.photo_popup_background`).css('display', 'flex')
                          $(`.pic_area`).css({
                              background: `url(${urls[i]})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                  }
              } else if (categoryInfo == 3) {
                  let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                  const urls = filters.map(function (filter, i) {
                      if ($(this).text() === text) {
                          return $(this).parent('figcaption').siblings('img').attr('src');
                      }
                  })
                  const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                      return $(this);
                  });
                  const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                      return $(this);
                  });


                  for (let i = 0; i < urls.length; i++) {
                      $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                      $('.photo').eq(i).css({
                          width: `200px`,
                          height: `200px`,
                          display: 'inline-block',
                          border: `1px solid black`,
                          marginRight: '18px',
                          marginBottom: `20px`,
                          overflow: `hidden`,
                          background: `url(${urls[i]})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: 'relative',
                      });
                      $('.photo').eq(i).children('div').eq(0).css({
                          position: 'absolute',
                          left: '5px',
                          top: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      });
                      $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                      $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                      $('.photo').eq(i).children('div').eq(1).css({
                          position: 'absolute',
                          left: '5px',
                          bottom: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      })
                      $('.photo').eq(i).children('div').eq(2).css({
                          width: '100%',
                          height: '100%',
                          background: `black`,
                          opacity: 0
                      })
                      if ((i + 1) % 7 == 0) {
                          $('.photo').eq(i).css('marginRight', 0);
                      }
                      $('.photo').eq(i).on('mouseenter', function () {
                          $(this).children('.cover').animate({
                              opacity: 0.7
                          }, 300)
                          $(this).children('div').css({
                              color: 'white'
                          })
                      })
                      $('.photo').eq(i).on('mouseleave', function () {
                          $(this).children('.cover').animate({
                              opacity: 0
                          }, 300)
                          $(this).children('div').css({
                              color: 'transparent'
                          })
                      })
                      $('.photo').eq(i).children('.cover').on('click', function () {
                          $(`.photo_popup_background`).css('display', 'flex')
                          $(`.pic_area`).css({
                              background: `url(${urls[i]})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                  }
              } else {
                  for (let i = 0; i < length; i++) {
                      $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                      $('.photo').eq(i).css({
                          width: `200px`,
                          height: `200px`,
                          display: 'inline-block',
                          border: `1px solid black`,
                          marginRight: '18px',
                          marginBottom: `20px`,
                          overflow: `hidden`,
                          background: `url(${urls[i]})`,
                          backgroundSize: `150% 100%`,
                          backgroundPosition: `50% 0`,
                          position: 'relative',
                      });
                      $('.photo').eq(i).children('div').eq(0).css({
                          position: 'absolute',
                          left: '5px',
                          top: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      });
                      $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                      $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                      $('.photo').eq(i).children('div').eq(1).css({
                          position: 'absolute',
                          left: '5px',
                          bottom: '5px',
                          color: 'transparent',
                          width: '100%',
                          height: '20px',
                          zIndex: 3
                      })
                      $('.photo').eq(i).children('div').eq(2).css({
                          width: '100%',
                          height: '100%',
                          background: `black`,
                          opacity: 0
                      })
                      if ((i + 1) % 7 == 0) {
                          $('.photo').eq(i).css('marginRight', 0);
                      }
                      $('.photo').eq(i).on('mouseenter', function () {
                          $(this).children('.cover').animate({
                              opacity: 0.7
                          }, 300)
                          $(this).children('div').css({
                              color: 'white'
                          })
                      })
                      $('.photo').eq(i).on('mouseleave', function () {
                          $(this).children('.cover').animate({
                              opacity: 0
                          }, 300)
                          $(this).children('div').css({
                              color: 'transparent'
                          })
                      })
                      $('.photo').eq(i).children('.cover').on('click', function () {
                          $(`.photo_popup_background`).css('display', 'flex')
                          $(`.pic_area`).css({
                              background: `url(${urls[i]})`,
                              backgroundSize: `100% 100%`,
                          })
                      })
                  }
              }

          }
      })

      // 사진 클릭시 나오는 팝업 제거 코드
      const photoPopup = document.querySelector('.photo_popup_background');
      const photoExitButton = document.querySelector('.photo_popup_exit_button');
      photoExitButton.addEventListener('click', function () {
          photoPopup.style.display = 'none';
      });

      // 자연, 건축 등 필터 선택 시 모든 photo를 지우고 다시 채워넣는다
      $('.lists').children('div').on('click', function () {
          let i = $(this).index();
          let text = $(this).text();
          $(this).addClass('listOn').siblings().removeClass('listOn');
          $('.photos').html('');

          if (i === 0) {
              $.ajax({
                  url: 'js/data.xml',
                  type: 'GET',
                  success: function (result) {
                      const length = $(result).children().children('figure').length;
                      const urls = $(result).children().children('figure').children('img').map(function (i) {
                          return $(this).attr('src');
                      })
                      const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                          return $(this);
                      });
                      const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                          return $(this);
                      });
                      console.log(bs);
                      console.log(smalls);
                      $('.area').removeClass('areaOn');
                      $('.area .checkbox').css('background', 'white');


                      for (let i = 0; i < length; i++) {
                          $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                          $('.photo').eq(i).css({
                              width: `200px`,
                              height: `200px`,
                              display: 'inline-block',
                              border: `1px solid black`,
                              marginRight: '18px',
                              marginBottom: `20px`,
                              overflow: `hidden`,
                              background: `url(${urls[i]})`,
                              backgroundSize: `150% 100%`,
                              backgroundPosition: `50% 0`,
                              position: 'relative',
                          });
                          $('.photo').eq(i).children('div').eq(0).css({
                              position: 'absolute',
                              left: '5px',
                              top: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          });
                          $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                          $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                          $('.photo').eq(i).children('div').eq(1).css({
                              position: 'absolute',
                              left: '5px',
                              bottom: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          })
                          $('.photo').eq(i).children('div').eq(2).css({
                              width: '100%',
                              height: '100%',
                              background: `black`,
                              opacity: 0
                          })
                          if ((i + 1) % 7 == 0) {
                              $('.photo').eq(i).css('marginRight', 0);
                          }
                          $('.photo').eq(i).on('mouseenter', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0.7
                              }, 300)
                              $(this).children('div').css({
                                  color: 'white'
                              })
                          })
                          $('.photo').eq(i).on('mouseleave', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0
                              }, 300)
                              $(this).children('div').css({
                                  color: 'transparent'
                              })
                          })
                          $('.photo').eq(i).children('.cover').on('click', function () {
                              $(`.photo_popup_background`).css('display', 'flex')
                              $(`.pic_area`).css({
                                  background: `url(${urls[i]})`,
                                  backgroundSize: `100% 100%`,
                              })
                          })
                      }
                  }
              })
          } else if (i === 1) {
              $.ajax({
                  url: 'js/data.xml',
                  type: 'GET',
                  success: function (result) {
                      const length = $(result).children().children('figure').length;
                      let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                      const urls = filters.map(function (filter, i) {
                          if ($(this).text() === text) {
                              return $(this).parent('figcaption').siblings('img').attr('src');
                          }
                      })
                      const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                          return $(this);
                      });
                      const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                          return $(this);
                      });
                      console.log(bs);
                      console.log(smalls);
                      $('.area').removeClass('areaOn');
                      $('.area .checkbox').css('background', 'white');


                      for (let i = 0; i < urls.length; i++) {
                          $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                          $('.photo').eq(i).css({
                              width: `200px`,
                              height: `200px`,
                              display: 'inline-block',
                              border: `1px solid black`,
                              marginRight: '18px',
                              marginBottom: `20px`,
                              overflow: `hidden`,
                              background: `url(${urls[i]})`,
                              backgroundSize: `150% 100%`,
                              backgroundPosition: `50% 0`,
                              position: 'relative',
                          });
                          $('.photo').eq(i).children('div').eq(0).css({
                              position: 'absolute',
                              left: '5px',
                              top: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          });
                          $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                          $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                          $('.photo').eq(i).children('div').eq(1).css({
                              position: 'absolute',
                              left: '5px',
                              bottom: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          })
                          $('.photo').eq(i).children('div').eq(2).css({
                              width: '100%',
                              height: '100%',
                              background: `black`,
                              opacity: 0
                          })
                          if ((i + 1) % 7 == 0) {
                              $('.photo').eq(i).css('marginRight', 0);
                          }
                          $('.photo').eq(i).on('mouseenter', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0.7
                              }, 300)
                              $(this).children('div').css({
                                  color: 'white'
                              })
                          })
                          $('.photo').eq(i).on('mouseleave', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0
                              }, 300)
                              $(this).children('div').css({
                                  color: 'transparent'
                              })
                          })
                          $('.photo').eq(i).children('.cover').on('click', function () {
                              $(`.photo_popup_background`).css('display', 'flex')
                              $(`.pic_area`).css({
                                  background: `url(${urls[i]})`,
                                  backgroundSize: `100% 100%`,
                              })
                          })
                      }
                  }
              })
          } else if (i === 2) {
              $.ajax({
                  url: 'js/data.xml',
                  type: 'GET',
                  success: function (result) {
                      const length = $(result).children().children('figure').length;
                      let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                      const urls = filters.map(function (filter, i) {
                          if ($(this).text() === text) {
                              return $(this).parent('figcaption').siblings('img').attr('src');
                          }
                      })
                      const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                          return $(this);
                      });
                      const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                          return $(this);
                      });
                      console.log(bs);
                      console.log(smalls);
                      $('.area').removeClass('areaOn');
                      $('.area .checkbox').css('background', 'white');


                      for (let i = 0; i < urls.length; i++) {
                          $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                          $('.photo').eq(i).css({
                              width: `200px`,
                              height: `200px`,
                              display: 'inline-block',
                              border: `1px solid black`,
                              marginRight: '18px',
                              marginBottom: `20px`,
                              overflow: `hidden`,
                              background: `url(${urls[i]})`,
                              backgroundSize: `150% 100%`,
                              backgroundPosition: `50% 0`,
                              position: 'relative',
                          });
                          $('.photo').eq(i).children('div').eq(0).css({
                              position: 'absolute',
                              left: '5px',
                              top: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          });
                          $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                          $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                          $('.photo').eq(i).children('div').eq(1).css({
                              position: 'absolute',
                              left: '5px',
                              bottom: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          })
                          $('.photo').eq(i).children('div').eq(2).css({
                              width: '100%',
                              height: '100%',
                              background: `black`,
                              opacity: 0
                          })
                          if ((i + 1) % 7 == 0) {
                              $('.photo').eq(i).css('marginRight', 0);
                          }
                          $('.photo').eq(i).on('mouseenter', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0.7
                              }, 300)
                              $(this).children('div').css({
                                  color: 'white'
                              })
                          })
                          $('.photo').eq(i).on('mouseleave', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0
                              }, 300)
                              $(this).children('div').css({
                                  color: 'transparent'
                              })
                          })
                          $('.photo').eq(i).children('.cover').on('click', function () {
                              $(`.photo_popup_background`).css('display', 'flex')
                              $(`.pic_area`).css({
                                  background: `url(${urls[i]})`,
                                  backgroundSize: `100% 100%`,
                              })
                          })
                      }

                  }
              })

          } else {
              $.ajax({
                  url: 'js/data.xml',
                  type: 'GET',
                  success: function (result) {
                      const length = $(result).children().children('figure').length;
                      let filters = $(result).children('items').children('figure').children('figcaption').children('filter');
                      const urls = filters.map(function (filter, i) {
                          if ($(this).text() === text) {
                              return $(this).parent('figcaption').siblings('img').attr('src');
                          }
                      })
                      const bs = $(result).children().children('figure').children('figcaption').children('b').map(function (i) {
                          return $(this);
                      });
                      const smalls = $(result).children().children('figure').children('figcaption').children('small').map(function (i) {
                          return $(this);
                      });
                      console.log(bs);
                      console.log(smalls);

                      $('.area').removeClass('areaOn');
                      $('.area .checkbox').css('background', 'white');
                      for (let i = 0; i < urls.length; i++) {
                          $('.photos').append('<div class="photo"><div></div><div></div><div class="cover"></div></div>');
                          $('.photo').eq(i).css({
                              width: `200px`,
                              height: `200px`,
                              display: 'inline-block',
                              border: `1px solid black`,
                              marginRight: '18px',
                              marginBottom: `20px`,
                              overflow: `hidden`,
                              background: `url(${urls[i]})`,
                              backgroundSize: `150% 100%`,
                              backgroundPosition: `50% 0`,
                              position: 'relative',
                          });
                          $('.photo').eq(i).children('div').eq(0).css({
                              position: 'absolute',
                              left: '5px',
                              top: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          });
                          $('.photo').eq(i).children('div').eq(0).text(bs[i].text());
                          $('.photo').eq(i).children('div').eq(1).text(smalls[i].text());
                          $('.photo').eq(i).children('div').eq(1).css({
                              position: 'absolute',
                              left: '5px',
                              bottom: '5px',
                              color: 'transparent',
                              width: '100%',
                              height: '20px',
                              zIndex: 3
                          })
                          $('.photo').eq(i).children('div').eq(2).css({
                              width: '100%',
                              height: '100%',
                              background: `black`,
                              opacity: 0
                          })
                          if ((i + 1) % 7 == 0) {
                              $('.photo').eq(i).css('marginRight', 0);
                          }
                          $('.photo').eq(i).on('mouseenter', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0.7
                              }, 300)
                              $(this).children('div').css({
                                  color: 'white'
                              })
                          })
                          $('.photo').eq(i).on('mouseleave', function () {
                              $(this).children('.cover').animate({
                                  opacity: 0
                              }, 300)
                              $(this).children('div').css({
                                  color: 'transparent'
                              })
                          })
                          $('.photo').eq(i).children('.cover').on('click', function () {
                              $(`.photo_popup_background`).css('display', 'flex')
                              $(`.pic_area`).css({
                                  background: `url(${urls[i]})`,
                                  backgroundSize: `100% 100%`,
                              })
                          })
                      }
                  }
              })
          }

      })
      // 메뉴 필터링 끝

      // 지역 선택시, 해당 되지 않는 photo display:none 처리
      let chosenText = [];
      $('.area_list .area').on('click', function () {
          console.log($(this).index());
          chosenText.push($(this).children('span:first').text());
          $(this).addClass('areaOn');
          $(this).children('span:last').css('background', '#ff504d');


          let chosen = $(this).children('span:first').text();
          let tempArr = [];
          if (checkText(chosenText, chosen) > 1) {
              console.log('hi');
              chosenText.forEach(function (elem, i) {
                  if (elem !== chosen) {
                      tempArr.push(elem);
                  }
              })
              chosenText = tempArr;
              $(this).removeClass('areaOn');
              $(this).children('span:last').css('background', 'white');
          }
          let leftCount = 0;
          $('.photo').each(function (i) {
              $(this).css('display', 'none');

              for (let j = 0; j < chosenText.length; j++) {
                  if ($(this).children('div').eq(1).text() === chosenText[j]) {
                      $(this).css('display', 'inline-block');
                      $(this).css('marginRight', '18px');
                      if ((leftCount + 1) % 7 === 0) {
                          $(this).css('marginRight', 0);
                      }
                      leftCount++;
                  }
              }
          })

          if (chosenText.length === 0) {
              $('.photo').each(function (i) {
                  $(this).css('display', 'inline-block');
                  $(this).css('marginRight', '18px');
                  if ((i + 1) % 7 === 0) {
                      $(this).css('marginRight', 0);
                  }

              })


          }
      })

      $('.area_list .area:last').on('click', function () {
          chosenText = [];
          $('.area_list .area').removeClass('areaOn');
          $('.area_list .area').children('span').css('background', 'white');
          $('.photo').each(function (i) {
              $(this).css('display', 'inline-block');
              $(this).css('marginRight', '18px');
              if ((i + 1) % 7 === 0) {
                  $(this).css('marginRight', 0);
              }
          })
      })

      function checkText(arr, txt) {
          let textCount = 0;
          for (let i = 0; i < arr.length; i++) {
              if (txt === arr[i]) {
                  textCount++;
              }
          }
          return textCount;
      }

  }
  window.onload = init;
