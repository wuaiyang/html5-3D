(function () {
    //setLoding();
    anmt5();
    setPerc();
})();

function setPerc(){
    resetview();
    window.onresize = resetview;
    function resetview() {
        var view = document.querySelector('#view');
        var main = document.querySelector('#main');
        var deg = 53;
        var height = document.documentElement.clientHeight;
        var R = Math.round(Math.tan(deg/180*Math.PI)*height*.5);
        view.style.WebkitPerspective =view.style.perspective = R + 'px';
        css(main,'translateZ',R)
    }
}

document.addEventListener('touchstart', function(e){
   e.preventDefault();
});

//预加载
function setLoding() {
    var logoText = document.querySelector('.logoText');

    var data = [];
    var number = 0;
    for( s in imgData) {
       data = data.concat(imgData[s]);
    }
    for(var i=0; i<data.length; i++){
        var img = new Image();
        img.src = data[i];
        img.onload = function () {
            number++;
            logoText.innerHTML = '已加载 ' + Math.floor(number/data.length*100) + '%';
             if(number == data.length) {
                 //加载完成
                 anmt();
             }
        };
    }
}

function anmt() {
    var view = document.querySelector('#view');
    var logo1 = document.querySelector('#logo1');
    var logo2 = document.createElement('div');
    var logo3 = document.createElement('div');
    var img = new Image();
    var img2 = new Image();
    img.src = imgData.logo[0];
    logo2.id = 'logo2';
    logo2.className = 'logoImg';
    logo2.appendChild(img);
    css(logo2, 'opacity', 0);
    css(logo2, 'translateZ',-1000);
    img2.src = imgData.logo[1];
    logo3.id = 'logo3';
    logo3.className = 'logoImg';
    logo3.appendChild(img2);
    css(logo3, 'opacity', 0);
    css(logo3, 'translateZ',-1000);
    view.appendChild(logo2);
    view.appendChild(logo3);
    MTween({
        el: logo1,
        target: {opacity:0},
        time: 1000,
        type: 'easeOut',
        callBack: function () {
            view.removeChild(logo1);
            css(logo2, 'opacity', 100);
            MTween({
                el: logo2,
                target: {translateZ:0},
                time: 800,
                type: 'easeBoth',
                callBack: anmt2
            })
        }
    })
}

function anmt2() {
    var view = document.querySelector('#view');
    var logo2 = document.querySelector('#logo2');
    var logo3 = document.querySelector('#logo3');
    setTimeout(function () {
        MTween({
            el: logo2,
            target: {translateZ:-1000},
            time: 800,
            type: 'linear',
            callBack: function () {
                setTimeout(function () {
                    view.removeChild(logo2);
                    css(logo3, 'opacity', 100);
                    MTween({
                        el: logo3,
                        target: {translateZ:0},
                        time: 800,
                        type: 'easeBoth',
                        callBack: anmt3
                    })
                },300)
            }
        })
    },1000);
}

function anmt3() {
    var view = document.querySelector('#view');
    var logo3 = document.querySelector('#logo3');
    setTimeout(function () {
        MTween({
            el: logo3,
            target: {translateZ:-2000},
            time: 2000,
            type: 'easeIn',
            callBack: function () {
                setTimeout(function () {
                    view.removeChild(logo3);
                    anmt4()
                },800)
            }
        })
    },1000);
}

function anmt4() {
    var view = document.querySelector('#view');
    var logo4 = document.createElement('div');
    var logoIcons =  document.createElement('div');
    var logo4Img =  new Image();
    var iconsLength = 27;
    logo4.id = 'logo4';
    logo4Img.id = 'logo4Img';
    logoIcons.id = 'logoIcons';
    logo4Img.src = imgData.logo[2];
    css(logo4, 'scale',0);
    for(var i=0; i<iconsLength; i++){
        var span = document.createElement('span');
        var xR = Math.round(20 + Math.random()*190);
        var xDeg = Math.round(Math.random()*360); //(360/9)*(i%9);
        var yR = Math.round(10 + Math.random()*190);
        var yDeg = Math.round(Math.random()*360); //(360/9)*(i%9);
        css(span,'rotateX',yDeg);
        css(span,'rotateY',xDeg);
        css(span,'translateZ',xR);
        css(span,'translateY',yR);
        span.style.backgroundImage = 'url(' + imgData.logoIco[i%imgData.logoIco.length] + ')';
        logoIcons.appendChild(span);
    }
    logo4.appendChild(logoIcons);
    view.appendChild(logo4);
    logo4.appendChild(logo4Img);
    MTween({
        el: logo4,
        target: {scale: 100},
        time: 800,
        type: 'easeOutStrong',
        callBack: function () {
            setTimeout(function () {
                MTween({
                    el: logo4,
                    target: {scale: 0},
                    time: 2000,
                    type: 'linear',
                    callBack: function () {
                        view.removeChild(logo4);
                        anmt5();
                    }
                })
            },1000)
        }
    })
}

function anmt5() {
    var tz = document.querySelector('#tz');
    css(tz, 'translateZ', -2000);
    anmt7();
    anmt6();
    createPano();
    MTween({
        el:tz,
        target: {translateZ:-200},
        time: 3000,
        type: 'easeBoth'
    })
}

//背景圆柱
function anmt6(){
    var panoBg = document.querySelector('#panoBg');
    var width = 129;
    var deg = 360/imgData.bg.length;
    var R = parseInt(Math.tan((180-deg)/2*Math.PI/180)*(width/2)) - 1;
    var startDeg = 180;
    css(panoBg,"rotateX",0);
    css(panoBg,"rotateY",-695);
    for(var i = 0; i < imgData.bg.length; i++){
        var span = document.createElement("span");
        css(span,"rotateY",startDeg);
        css(span,"translateZ",-R);
        span.style.backgroundImage = "url("+imgData.bg[i]+")";
        span.style.display = "none";
        panoBg.appendChild(span);
        startDeg -= deg;
    }
    var nub = 0;
    var timer = setInterval(function(){
        panoBg.children[nub].style.display = "block";
        nub++;
        if(nub >= panoBg.children.length){
            clearInterval(timer);
        }
    },3600/2/20);
    MTween({
        el: panoBg,
        target: {rotateY:25},
        time: 3600,
        type: "linear",
        callBack:function(){
            setDarg();
            setTimeout(function () {
                setSensors();
            },1000);

        }
    });
}

function anmt7(){
    var cloud = document.querySelector('#cloud');
    css(cloud,"translateZ",-300);
    for(var i = 0; i < 9; i++){
        var span = document.createElement("span");
        span.style.backgroundImage = "url("+imgData.clound[i%3]+")";
        var R = 200+(Math.random()*150);
        var deg = (360/9)*i;
        var x = Math.sin(deg*Math.PI/180)*R;
        var z = Math.cos(deg*Math.PI/180)*R;
        var y = (Math.random()-.5)*300
        css(span,"translateX",x);
        css(span,"translateZ",z);
        css(span,"translateY",y);
        span.style.display = "none";
        cloud.appendChild(span);
    }
    var nub = 0;
    var timer = setInterval(function(){
        cloud.children[nub].style.display = "block";
        nub++;
        if(nub >= cloud.children.length){
            clearInterval(timer);
        }
    },300);
    MTween({
        el:cloud,
        target: {rotateY:540},
        time: 3500,
        type: "easeIn",
        callIn:function(){
            var deg = -css(cloud,"rotateY");
            for(var i = 0; i < cloud.children.length; i++){
                css(cloud.children[i],"rotateY",deg);
            }
        },
        callBack:function(){
            cloud.parentNode.removeChild(cloud);
            bgShow();
        }
    });
}

function setDarg() {
    var panoBg = document.querySelector('#panoBg');
    var pano = document.querySelector('#pano');
    var tz = document.querySelector('#tz');
    var startPoint = {x:0,y:0};
    var panoBgDeg = {x:0,y:0};
    var scale = {x:129/18, y:1170/80};
    var startZ = css(tz,'translateZ');
    var lastDeg = {x:0, y:0};
    var lastDis = {x:0, y:0};
    document.addEventListener('touchstart',function (e) {
        startPoint.x = e.changedTouches[0].pageX;
        startPoint.y = e.changedTouches[0].pageY;
        panoBgDeg.x = css(panoBg, 'rotateY');
        panoBgDeg.y = css(panoBg, 'rotateX');
    });
    document.addEventListener('touchmove', function (e) {
        var nowPoint = {};
        var nowDeg = {};
        var nowDeg2 = {};
        nowPoint.x = e.changedTouches[0].pageX;
        nowPoint.y = e.changedTouches[0].pageY;
        var dis = {};
        dis.x = nowPoint.x - startPoint.x;
        dis.y = nowPoint.y - startPoint.y;
        var disDeg = {};
        disDeg.x = -(dis.x/scale.x);
        disDeg.y = dis.y/scale.y;
        nowDeg.x = panoBgDeg.x + disDeg.x;
        nowDeg.y = panoBgDeg.y + disDeg.y;
        nowDeg2.x = panoBgDeg.x + disDeg.x*.9;
        nowDeg2.y = panoBgDeg.y + disDeg.y*.9;
        if(nowDeg.y > 40){
            nowDeg.y = 40;
        }else if(nowDeg.y < -40){
            nowDeg.y = -40;
        }
        if(nowDeg2.y > 40){
            nowDeg2.y = 40;
        }else if(nowDeg2.y < -40){
            nowDeg2.y = -40;
        }
        lastDis.x = nowDeg.x - lastDeg.x;
        lastDeg.x = nowDeg.x;
        lastDis.y = nowDeg.y - lastDeg.y;
        lastDeg.y = nowDeg.y;
        css(panoBg, 'rotate', nowDeg.y);
        css(panoBg, 'rotateY',nowDeg.x);
        css(pano, 'rotate', nowDeg2.y);
        css(pano, 'rotateY',nowDeg2.x);
        if(Math.abs(dis.x) > 300){
            dis.x = 300;
        }
        css(tz,"translateZ",startZ - Math.abs(dis.x));

    });
    document.addEventListener('touchend', function (e) {
        var nowDeg = {x:css(panoBg, 'rotateY'),y:css(panoBg, 'rotateX')};
        var disDeg = {x:lastDis.x*10,y:lastDis.y*10};
        MTween({
            el: tz,
            target: {translateZ:startZ},
            time: 800,
            type: 'easeOut'
        });
        MTween({
            el: panoBg,
            target: {rotateY:nowDeg.x + disDeg.x},
            time: 800,
            type: 'easeOut'
        });
        MTween({
            el: pano,
            target: {rotateY:nowDeg.x + disDeg.x},
            time: 800,
            type: 'easeOut'
        });
    })
}

/*function setSensors() {
    var pano = document.querySelector('#pano');
    var panoBg = document.querySelector('#panoBg');
    var last = {};
    window.addEventListener('deviceorientation',function (e) {
        var x = e.beta;
        var y = e.alpha;

        if(typeof(last.x) == 'undefined' ){
            last.x = x;
            last.y = y;
            return;
        }
        x = x-last.x;
        y = y-last.y;
        last.x = x;
        last.y = y;
        var degX = css(pano,'rotateX');
        var degY = css(pano,'rotateY');
        var nowdegY = degY + y;
        var nowdegX = degX + x;
        if(nowdegX > 40){
            nowdegX = 40;
        }else if(nowdegX < -40){
            nowdegX = -40;
        }

        css(pano,'rotateX',nowdegX);
        css(pano,'rotateY',nowdegY);
        css(panoBg,'rotateX',nowdegX);
        css(panoBg,'rotateY',nowdegY);
    })
}*/

function setSensors() {
    var pano = document.querySelector('#pano');
    var panoBg = document.querySelector('#panoBg');
    var last = {x:0,y:0};
    var isStart = false;
    var start = {};
    var now = {};
    var startEl = {};
    window.addEventListener('deviceorientation',function (e) {
        var x = e.beta;
        var y = e.alpha;

        if(Math.abs(x - last.x)>1 || Math.abs(y - last.y)>1){
            if(isStart){ //move
                now.x = x;
                now.y = y;
                var dis = {}
                dis.x = now.x - start.x;
                dis.y = now.y + start.y;
                var deg = {};
                deg.x = startEl.x - dis.x;
                deg.y = startEl.y - dis.y;
                if(deg.x > 40){
                    deg.x = 40;
                }else if(deg.x < -40){
                    deg.x = -40;
                }

                //css(pano,'rotateX',deg.x);
                //css(pano,'rotateY',deg.y);
                //css(panoBg,'rotateX',deg.x);
                //css(panoBg,'rotateY',deg.y);
                MTween({
                    el:pano,
                    target:{rotateX : deg.x, rotateY: deg.y},
                    time:1000,
                    type:'easeBoth'
                });
                MTween({
                    el:panoBg,
                    target:{rotateX : deg.x, rotateY: deg.y},
                    time:1000,
                    type:'easeBoth'
                })
            }else{
                isStart = true; //start
                start.x = x;
                start.y = y;
                startEl.x =  css(pano,'rotateX');
                startEl.y =  css(pano,'rotateY');
            }
            last.x = x;
            last.y = y;
        } else {
            if(isStart){
                isStart = false; //end
                now.x = x;
                now.y = y;
                var dis = {}
                dis.x = now.x - start.x;
                dis.y = now.y + start.y;
                var deg = {};
                deg.x = startEl.x - dis.x;
                deg.y = startEl.y - dis.y;
                if(deg.x > 40){
                    deg.x = 40;
                }else if(deg.x < -40){
                    deg.x = -40;
                }

                //css(pano,'rotateX',deg.x);
                //css(pano,'rotateY',deg.y);
                //css(panoBg,'rotateX',deg.x);
                //css(panoBg,'rotateY',deg.y);
                MTween({
                    el:pano,
                    target:{rotateX : deg.x, rotateY: deg.y},
                    time:1000,
                    type:'easeBoth'
                });
                MTween({
                    el:panoBg,
                    target:{rotateX : deg.x, rotateY: deg.y},
                    time:1000,
                    type:'easeBoth'
                })
            }
        }

    })
}

/*function setSensors() {
    var pano = document.querySelector('#pano');
    var panoBg = document.querySelector('#panoBg');
    var degX = css(pano,'rotateX');
    var degY = css(pano,'rotateY');
    var start =
    window.addEventListener('deviceorientation',function (e) {
        var x = e.beta;
        var y = e.gamma;

        css(pano,'rotateX',degX + x);
        css(pano,'rotateY',degY + y);
        css(panoBg,'rotateX',degX + x);
        css(panoBg,'rotateY',degY + y);
    })
}*/

function bgShow(){
    var pageBg = document.querySelector('#pageBg');
    MTween({
        el:pageBg,
        target:{opacity:100},
        time: 1000,
        type:"easeBoth"
    });
}

function createPano(){
   var pano = document.querySelector('#pano');
   var deg = 18;
   var R = 406;
   var nub = 0;
   var startDeg = 180;
   css(pano,'rotateX',0);
   css(pano,'rotateY',-180);
    css(pano,'scale',0);
   var pano1 = document.createElement('div');
   pano1.className = 'pano';
   css(pano1,'translateX',1.564);
   css(pano1,'translateZ',-9.877);
   for(var i=0; i<2; i++){
       var span = document.createElement('span');
       span.style.cssText = 'height:344px; margin-top:-172px;';
       span.style.backgroundImage = 'url('+imgData.pano[nub]+')';
       css(span,'translateY',-163);
       css(span,'rotateY',startDeg);
       css(span,'translateZ',-R);
       nub++;
       startDeg -= deg;
       pano1.appendChild(span);
   }
   pano.appendChild(pano1);

    var pano2 = document.createElement('div');
    pano2.className = 'pano';
    css(pano2,'translateX',20.225);
    css(pano2,'translateZ',-14.695);
    for(var i=0; i<3; i++){
        var span = document.createElement('span');
        span.style.cssText = 'height:326px; margin-top:-163px;';
        span.style.backgroundImage = 'url('+imgData.pano[nub]+')';
        css(span,'translateY',278);
        css(span,'rotateY',startDeg);
        css(span,'translateZ',-R);
        nub++;
        startDeg -= deg;
        pano2.appendChild(span);
    }
    pano.appendChild(pano2);

    var pano3 = document.createElement('div');
    pano3.className = 'pano';
    css(pano3,'translateX',22.175);
    css(pano3,'translateZ',-11.35);
    for(var i=0; i<4; i++){
        var span = document.createElement('span');
        span.style.cssText = 'height:195px; margin-top:-97.5px;';
        span.style.backgroundImage = 'url('+imgData.pano[nub]+')';
        css(span,'translateY',192.5);
        css(span,'rotateY',startDeg);
        css(span,'translateZ',-R);
        nub++;
        startDeg -= deg;
        pano3.appendChild(span);
    }
    pano.appendChild(pano3);

    var pano4 = document.createElement('div');
    pano4.className = 'pano';
    css(pano4,'translateX',20.225);
    css(pano4,'translateZ',14.695);
    startDeg = 90;
    for(var i=0; i<5; i++){
        var span = document.createElement('span');
        span.style.cssText = 'height:468px; margin-top:-234px;';
        span.style.backgroundImage = 'url('+imgData.pano[nub]+')';
        css(span,'translateY',129);
        css(span,'rotateY',startDeg);
        css(span,'translateZ',-R);
        nub++;
        startDeg -= deg;
        pano4.appendChild(span);
    }
    pano.appendChild(pano4);

    var pano5 = document.createElement('div');
    pano5.className = 'pano';
    css(pano5,'translateX',-11.35);
    css(pano5,'translateZ',22.275);
    startDeg = 18;
    for(var i=0; i<6; i++){
        var span = document.createElement('span');
        span.style.cssText = 'height:482px; margin-top:-291px;';
        span.style.backgroundImage = 'url('+imgData.pano[nub]+')';
        css(span,'translateY',256);
        css(span,'rotateY',startDeg);
        css(span,'translateZ',-R);
        nub++;
        startDeg -= deg;
        pano5.appendChild(span);
    }
    pano.appendChild(pano5);

    var pano6 = document.createElement('div');
    pano6.className = 'pano';
    css(pano6,'translateX',-4.54);
    css(pano6,'translateZ',8.91);
    startDeg = 18;
    for(var i=0; i<6; i++){
        var span = document.createElement('span');
        span.style.cssText = 'height:444px; margin-top:-222px;';
        span.style.backgroundImage = 'url('+imgData.pano[nub]+')';
        css(span,'translateY',-13);
        css(span,'rotateY',startDeg);
        css(span,'translateZ',-R);
        nub++;
        startDeg -= deg;
        pano6.appendChild(span);
    }
    pano.appendChild(pano6);

    setTimeout(function () {
        MTween({
            el:pano,
            target:{rotateY:25,scale:100},
            time:2000,
            type:'easeBoth'
        })
    },2800)

}
