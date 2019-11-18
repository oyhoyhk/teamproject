<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>찍자 - 찍자랑 사진 찍자</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script>
        function init() {
            const nav1 = document.getElementsByClassName('membership')[0];
            const nav1Exit = document.querySelector('.membership .exit_box');
            document.querySelector('header li').addEventListener('click', function() {
                nav1.style.display = 'block';
            })
            nav1Exit.addEventListener('click', function() {
                nav1.style.display = 'none';
            })


        }
        window.onload = init;

    </script>
</head>

<body>
    <!-- 공통영역 header -->
    <? include_once 'header.html' ?>
    <!-- nav 1 login 팝업-->

    <div class="membership">
        <div class="exit_box">X</div>
        <div class="membership_container">
            <div class="membership_title">회원가입</div>
            <ul>
                <li><span>icon</span><span>네이버</span></li>
                <li><span>icon</span><span>카카오톡</span></li>
                <li><span>icon</span><span>페이스북</span></li>
                <li><span>icon</span><span>인스타그램</span></li>
            </ul>
            <div class="noMember">비회원으로 이용하기</div>
        </div>
    </div>


    <!-- main 영역 -->
    <section>
        <div class="main_container">
            <div class="checklist">자연</div>
            <div class="checklist">건축</div>
            <div class="checklist">인물</div>
            <div class="checklist">음식</div>
            <div class="main_search">검색</div>
        </div>
    </section>
    <? include 'footer.html' ?>

</body>

</html>
