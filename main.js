let element = document.getElementById("my-character");
let ctx = element.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight / 1.7;
let heightofmarshal = ctx.canvas.height;
let widthofmarshal = ctx.canvas.width / 2;
let aud = document.getElementById("audio");
function play() {
  document.getElementById("audio").play();
  document.getElementById("audio").volume = 0.05;
}
function play1() {
  document.getElementById("audio1").play();
}
function play2() {
  document.getElementById("audio2").play();
}
function play3() {
  document.getElementById("audio4").play();
}
let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let array1 = ["idle", "kick", "punch", "block", "backward", "forward"];
let imagepath = (flag, animation, frameno) => {
  if (flag == 1)
    return "./images/enemy" + animation + "/" + frameno + ".png";
  else return "./images/" + animation + "/" + frameno + ".png";
};
let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
};
let loadimages = (flag, callback) => {
  //callback with an array loaded images.
  let images = {
    idle: [],
    kick: [],
    punch: [],
    block: [],
    backward: [],
    forward: [],
  };
  let imageToLoad = 0;
  array1.forEach((animation) => {
    let animationFrames = frames[animation];
    imageToLoad = imageToLoad + animationFrames.length;
    animationFrames.forEach((frameno) => {
      let path = imagepath(flag, animation, frameno);
      loadImage(path, (image) => {
        //do something with images.
        images[animation][frameno - 1] = image;
        imageToLoad = imageToLoad - 1;
        if (imageToLoad == 0) {
          callback(images);
        }
      });
    });
  });
};
let pos = 0;
let pos1 = ctx.canvas.width / 2;
let friendanimate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      if (animation === "forward" && pos < pos1 - widthofmarshal / 2.5)
        pos = pos + 10;
      else if (animation === "backward" && pos >= 0) pos = pos - 10;
      ctx.clearRect(
        pos,
        0,
        widthofmarshal - widthofmarshal / 20,
        heightofmarshal
      );
      ctx.drawImage(image, pos, 0, widthofmarshal, heightofmarshal);
    }, index * 100);
  });
  // requestAnimationFrame(callback);
  setTimeout(function () {
    requestAnimationFrame(callback);
  }, images[animation].length * 100);
  //setTimeout(callback, images[animation].length * 100);
};
let enemyanimate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      if (animation === "forward" && pos1 > pos + widthofmarshal / 2.5)
        pos1 = pos1 - 10;
      else if (animation === "backward" && pos1 < ctx.canvas.width / 1.8)
        pos1 = pos1 + 10;
      ctx.clearRect(
        pos1 + widthofmarshal / 20,
        0,
        widthofmarshal,
        heightofmarshal
      );
      ctx.drawImage(image, pos1, 0, widthofmarshal, heightofmarshal);
    }, index * 100);
  });
  setTimeout(function () {
    requestAnimationFrame(callback);
  }, images[animation].length * 100);
  // requestAnimationFrame(callback);
  //setTimeout(callback, images[animation].length * 100);
};
let framesPerSecond = 10;
loadimages(0, (images) => {
  let queuedAnimation = [];
  let aux = () => {
    let selectedAnimation;
    if (queuedAnimation.length == 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimation.shift();
    }
    friendanimate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimation.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimation.push("punch");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimation.push("block");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimation.push("backward");
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimation.push("forward");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key == "ArrowLeft") {
      queuedAnimation.push("backward");
    } else if (key == "ArrowRight") {
      queuedAnimation.push("forward");
    } else if (key == "ArrowUp") {
      queuedAnimation.push("kick");
    } else if (key == "ArrowDown") {
      queuedAnimation.push("block");
    } else if (key == "L" || key == "l") {
      queuedAnimation.push("punch");
    }
  });
});

//calling of fxn for enemy marshal
loadimages(1, (images) => {
  let queuedAnimation = [];
  let aux = () => {
    let selectedAnimation;
    if (queuedAnimation.length == 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimation.shift();
    }
    enemyanimate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("enemy_kick").onclick = () => {
    queuedAnimation.push("kick");
  };
  document.getElementById("enemy_punch").onclick = () => {
    queuedAnimation.push("punch");
  };
  document.getElementById("enemy_block").onclick = () => {
    queuedAnimation.push("block");
  };
  document.getElementById("enemy_backward").onclick = () => {
    queuedAnimation.push("backward");
  };
  document.getElementById("enemy_forward").onclick = () => {
    queuedAnimation.push("forward");
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key == "a" || key == "A") {
      queuedAnimation.push("backward");
    } else if (key == "s" || key == "S") {
      queuedAnimation.push("forward");
    } else if (key == "w" || key == "W") {
      queuedAnimation.push("kick");
    } else if (key == "z" || key == "Z") {
      queuedAnimation.push("block");
    } else if (key == "d" || key == "D") {
      queuedAnimation.push("punch");
    }
  });
});
// friendmarshal(array1, 0, 0);
// friendmarshal(array2, 400, 0);
//other method
// let img=new Image()//same as create element
// img.onload=()=>{
//     ctx.drawImage(myImg,0,0);
// }
// img.src="./idle/1.png";
let btn = document.getElementsByClassName("punch1");
Array.from(btn).forEach(function (element) {
  element.addEventListener("click", play);
});
let btn1 = document.getElementsByClassName("kick1");
Array.from(btn1).forEach(function (element) {
  element.addEventListener("click", play1);
});
let btn2 = document.getElementsByClassName("block1");
Array.from(btn2).forEach(function (element) {
  element.addEventListener("click", play2);
});
let btn3 = document.getElementsByClassName("move");
Array.from(btn3).forEach(function (element) {
  element.addEventListener("click", play3);
});

let vol = document.getElementById("audio3");
vol.volume = 0.05;
window.onload = function () {
  document.getElementById("audio3").play();
};
