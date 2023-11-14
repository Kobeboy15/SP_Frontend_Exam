// Dynamically sets the buttons for menu items //
var paddleTemplate = (index) => `
  <div class="paddles">
  <button
    class="left-paddle paddle hidden"
    onclick="handleLeftScroll(${index})"
  >
    <
  </button>
  <button
    class="right-paddle paddle hidden"
    onclick="handleRightScroll(${index})"
  >
    >
  </button>
  </div>
`;

var menuItems = document.getElementsByClassName("menu-wrapper");
var paddleSize = 5;

for (i = 0; i < menuItems.length; i++) {
  createMenu(i);
}

// initializes the existing menu items with their respective buttons that handle scrolling //
function createMenu(index) {
  menuItems[index].innerHTML += paddleTemplate(index);
}

// initializes the menu size for the passed button id - index //
function getMenuDetails(index) {
  let currentMenu = menuItems[index].children[0];
  let leftPaddle = menuItems[index].children[1].children[0];
  let rightPaddle = menuItems[index].children[1].children[1];

  let menuWrapperSize = menuItems[index].clientWidth;
  let menuSize = currentMenu.scrollWidth;
  let menuInvisibleSize = menuSize - menuWrapperSize;
  let menuPosition = currentMenu.scrollLeft;
  let menuEndOffset = menuInvisibleSize - paddleSize;

  if (menuPosition < menuEndOffset) {
    if (menuPosition <= 1) {
      leftPaddle.classList.add("hidden");
    } else {
      leftPaddle.classList.remove("hidden");
    }
    rightPaddle.classList.remove("hidden");
  } else if (menuPosition >= menuEndOffset) {
    if (menuPosition <= 1) {
      leftPaddle.classList.add("hidden");
    }
    rightPaddle.classList.add("hidden");
  }
}

// initializes the menu button visibility //
function handlePaddleDisplay(index) {
  let currentMenu = menuItems[index].children[0];
  let leftPaddle = menuItems[index].children[1].children[0];
  let rightPaddle = menuItems[index].children[1].children[1];

  currentMenu.addEventListener("scroll", () => {
    let menuInvisibleSize =
      currentMenu.scrollWidth - menuItems[index].clientWidth;
    let menuPosition = currentMenu.scrollLeft;
    let menuEndOffset = menuInvisibleSize - paddleSize;
    if (menuPosition <= paddleSize) {
      leftPaddle.classList.add("hidden");
      rightPaddle.classList.remove("hidden");
    } else if (menuPosition < menuEndOffset) {
      leftPaddle.classList.remove("hidden");
      rightPaddle.classList.remove("hidden");
    } else if (menuPosition >= menuEndOffset) {
      leftPaddle.classList.remove("hidden");
      rightPaddle.classList.add("hidden");
    }
  });
}

// calls the functions that initializes the coordinates for the buttons //
for (i = 0; i < menuItems.length; i++) {
  if (menuItems.length) {
    getMenuDetails(i);
    handlePaddleDisplay(i);
  }
}

// handles the dynamic window adjustments //
window.addEventListener("resize", function () {
  for (i = 0; i < menuItems.length; i++) {
    getMenuDetails(i);
    handlePaddleDisplay(i);
  }
});

// handles the LEFT arrow button - which scrolls left //
function handleLeftScroll(index) {
  let currentMenu = document.getElementsByClassName("menu");
  let sl = currentMenu[index].scrollLeft;

  if (sl - 200 <= 0) {
    currentMenu[index].scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } else {
    currentMenu[index].scrollTo({ top: 0, left: sl - 200, behavior: "smooth" });
  }
}

// handles the RIGHT arrow button - which scrolls right //
function handleRightScroll(index) {
  let currentMenu = document.getElementsByClassName("menu");
  let sl = currentMenu[index].scrollLeft,
    cw = currentMenu[index].scrollWidth;

  if (sl + 200 >= cw) {
    currentMenu[index].scrollTo({ top: 0, left: cw, behavior: "smooth" });
  } else {
    currentMenu[index].scrollTo({ top: 0, left: sl + 200, behavior: "smooth" });
  }
}
