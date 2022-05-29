document.querySelectorAll(".toolbox div").forEach((ele) => {
  ele.style.display = "none";
});

document.querySelectorAll(".pop").forEach((ele) => {
  ele.style.display = "none";
});

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let get = (element) => {
  return document.querySelector(element);
};

let isDrawing;

const main_canvas = get("#main_canvas");
window.addEventListener("resize", () => {
  main_canvas.height = window.innerHeight;
  main_canvas.width = window.innerWidth;
  main_ctx.beginPath();
  main_ctx.fillStyle = "rgb(247 245 245)";
  main_ctx.rect(0, 0, main_canvas.width, main_canvas.height);
  main_ctx.fill();});
main_canvas.height = window.innerHeight;
main_canvas.width = window.innerWidth;
const main_ctx = main_canvas.getContext("2d");

main_ctx.beginPath();
main_ctx.fillStyle = "rgb(247 245 245)";
main_ctx.rect(0, 0, main_canvas.width, main_canvas.height);
main_ctx.fill();

ct = "none";

let pencil = (el, ctx, color, width) => {
  el.onpointerdown = function (e) {
    ctx.beginPath();
    isDrawing = true;
    ctx.lineWidth = width;
    ctx.moveTo(e.clientX, e.clientY);
  };
  el.onpointermove = function (e) {
    if (isDrawing) {
      console.log(width, color);
      ctx.strokeStyle = color;
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  };
  el.onpointerup = function () {
    isDrawing = false;
  };
};

let Clay = (el, ctx, color, width, blur = 0) => {
  el.onpointerdown = function (e) {
    isDrawing = true;
    ctx.lineWidth = width;
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
    ctx.moveTo(e.clientX, e.clientY);
  };
  el.onpointermove = function (e) {
    if (isDrawing) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  };
  el.onpointerup = function () {
    isDrawing = false;
  };
};

let Circle = (el, ctx, color, width, spread) => {
  el.onpointerdown = function (e) {
    isDrawing = true;
  };
  el.onpointermove = function (e) {
    if (isDrawing) {
      for (i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.random();
        ctx.arc(
          getRandomInt(e.clientX, e.clientX),
          getRandomInt(e.clientY, e.clientY + spread),
          getRandomInt(width, width + 2),
          0 * Math.PI,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  };
  el.onpointerup = function () {
    isDrawing = false;
  };
};

let click = (btn, box) => {
  document.getElementById(btn).addEventListener("click", () => {
    if (document.getElementById(box).style.display != "none") {
      document.getElementById(box).style.display = "none";
    } else {
      document.getElementById(box).style.display = "block";
    }
  });
};

click("brush_btn", "brush_tool");
click("b_bt", "brush_tool");

var defaultPicker = new iro.ColorPicker("#color_picker", {
  width: 280,
  color: "#fff",
});

defaultPicker.on("color:change", (color) => {
  document.getElementById("color_text").value = color.hexString;
});

get("#get_color").addEventListener("click", () => {
  pencil(
    main_canvas,
    main_ctx,
    document.getElementById("color_text").value,
    get("#width_p").value
  );
});
get("#get_colorc").addEventListener("click", () => {
  Clay(
    main_canvas,
    main_ctx,
    document.getElementById("color_text").value,
    get("#width_cl").value,
    get("#blur_cl").value
  );
});
get("#get_colorcr").addEventListener("click", () => {
  Circle(
    main_canvas,
    main_ctx,
    document.getElementById("color_text").value,
    get("#width_cr").value,
    get("#spread_cr").value
  );
});

get("#width_p").addEventListener("input", () => {
  pencil(
    main_canvas,
    main_ctx,
    document.getElementById("color_text").value,
    get("#width_p").value
  );
});
click("get_color", "color_picker");
click("get_colorc", "color_picker");
click("get_colorcr", "color_picker");

document.getElementById("color_text").addEventListener("input", () => {
  document.getElementById("color_text").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      defaultPicker.color.hexString =
        document.getElementById("color_text").value;
    }
  });
  get("#color_picker").addEventListener("click", () => {
    defaultPicker.color.hexString = document.getElementById("color_text").value;
  });
});

r = [
  document.getElementById("width_cl"),
  document.getElementById("blur_cl"),
].forEach((ele) => {
  ele.addEventListener("input", () => {
    Clay(
      main_canvas,
      main_ctx,
      document.getElementById("color_text").value,
      get("#width_cl").value,
      get("#blur_cl").value
    );
  });
});

m = [get("#width_cr"), get("#spread_cr")].forEach((ele) => {
  ele.addEventListener("input", () => {
    Circle(
      main_canvas,
      main_ctx,
      document.getElementById("color_text").value,
      parseInt(get("#width_cr").value),
      parseInt(get("#spread_cr").value)
    );
  });
});

document.getElementById("width_e").addEventListener("input", () => {
  main_canvas.onmousedown = function (e) {
    isDrawing = true;
  };
  main_canvas.onmousemove = function (e) {
    if (isDrawing) {
      main_ctx.clearRect(
        e.clientX,
        e.clientY,
        get("#width_e").value,
        get("#width_e").value
      );
    }
  };
  main_canvas.onmouseup = function (e) {
    main_ctx.clearRect(
      e.clientX,
      e.clientY,
      get("#width_e").value,
      get("#width_e").value
    );
    isDrawing = false;
  };
  main_canvas.addEventListener("touchmove", function (e) {
    const rect = main_canvas.getBoundingClientRect();
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
    console.log("Hai");
    main_ctx.clearRect(x, y, get("#width_e").value, get("#width_e").value);
  });
});
