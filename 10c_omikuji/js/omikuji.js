"use strict";
let n = "";
let nBefore = "";


window.addEventListener("DOMContentLoaded",
    function () {
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
                effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
                delayScale: 1.5, // 遅延時間の指数
                delay: 50, // 文字ごとの遅延時間
                sync: false, // trueはアニメーションをすべての文字に同時に適用
                shuffle: true // trueは文字を順番にではなく、ランダムに
            }
        });

        $(function () {
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

        this.setTimeout(
            function () {

                let popMessage = "いらっしゃい！おみくじ引いてって!";
                this.window.alert(popMessage)
            },
            "5000"
        );
    }, false
);
let soundEndflag = "0";

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");
btn1.addEventListener("click",
    function () {
        if(soundEndflag === "1"){
            soundControl("end","");
        }
        
        // btn1.style.opacity = 0;
       // let n = Math.floor(Math.random() * 3);
        // switch (n) {
        //     case 0:
        //         btn1.textContent = "Very Happy!!";
        //         btn1.style.color = "#ff0000";
        //         btn1.style.fontSize = "40px";
        //         break;
        //     case 1:
        //         btn1.textContent = "Happy";
        //         btn1.style.color = "#FFF001";
        //         btn1.style.fontSize = "33px";
        //         break;
        //     case 2:
        //         btn1.textContent = "UnHappy";
        //         btn1.style.color = "#261e1c";
        //         btn1.style.fontSize = "27px";
        //         break;
        // }
        let resultText =[
          "img/daikichi.png",
          "img/chukichi.png",
          "img/syokichi.png",
          "img/suekichi.png",
          "img/daikyo.png"  
        ];
       
        let resultMaxspeed = [10, 10, 8, 5, 5];
        let resultMaxsize = [30, 30, 20, 40, 30];
        let resultImg = [
            "img/star.png",
            "img/sakura_hanabira.png",
            "img/water1.png",
            "img/redLeaves4.png",
            "img/snowflakes.png",
            "img/leaf.png"

        ];
        let resultSound = [
            "sound/omikuji_sound1.mp3",
            "sound/omikuji_sound2.mp3",
            "sound/omikuji_sound3.mp3",
            "sound/omikuji_sound4.mp3",
            "sound/omikuji_sound5.mp3",
        ];
        // let n = Math.floor(Math.random() * resultText.length);
        while (n === nBefore) {
            n = Math.floor(Math.random() * resultText.length);
        }
        
        nBefore = n;
        omikujiTextImage.src= resultText[n];
        omikujiTextImage.classList.add("omikujiPaper");
        omikujiTextImage.addEventListener("animationend",
        function(){
            omikujiTextImage.classList.remove("omikujiPaper");
        }, false
        );
        w_sound = resultSound[n];
        soundControl("start", w_sound);
        soundEndflag = "1";
        // omikujiText.style.opacity = 1;

        $(document).snowfall("clear");
        $(document).ready(function () {
            $(document).snowfall({
                maxSpeed: resultMaxspeed[n],
                minSpeed: 1, // 最小速度
                maxSize: resultMaxsize[n], // 最大サイズ
                minSize: 1, // 最小サイズ
                image: resultImg[n]
            });
        });
        // btn1.style.opacity = 1;

    }, false
);
let w_sound;
let music;
function soundControl(status, w_sound){
    if(status === "start"){
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    }else if(status === "end"){
        music.pause();
        music.currentTime = 0;
    }
}