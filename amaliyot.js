let ul = document.querySelector(".list");
let you = document.querySelector("#you");
let com = document.querySelector("#com");
let listen = new webkitSpeechRecognition();
listen.lang = "uz-UZ";

micBtn.onclick = () => {
  listen.start();
};

let words = window.localStorage.getItem("words") || "[]";
let shot = window.localStorage.getItem("shot") || "[]";
words = JSON.parse(words);
shot = JSON.parse(shot);

you.textContent = shot[0];
com.textContent = shot[1];

let used = [];
listen.onresult = (event) => {
  let arg = event.results[0][0].transcript;
  search.textContent = arg;
  if (!words.includes(arg)) words.push(arg.toLowerCase());
  if (used.includes(arg.toLowerCase())) {
    alert("foydalanilgan so'z!");
    shot[1] += 1;
    window.localStorage.setItem("words", JSON.stringify(words));
    window.localStorage.setItem("shot", JSON.stringify(shot));
    return window.location.reload();
  } else if (
    used.length &&
    used[used?.length - 1][used[used?.length - 1].length - 1].toLowerCase() !=
      arg[0].toLowerCase()
  ) {
    alert(
      `Sizning so'zingiz ${
        used[used.length - 1][used[used.length - 1].length - 1]
      } harfdan boshlanishi kerak edi!`
    );
    shot[1] += 1;
    window.localStorage.setItem("words", JSON.stringify(words));
    window.localStorage.setItem("shot", JSON.stringify(shot));
    return window.location.reload();
  } else {
    used.push(arg.toLowerCase());
    ul.innerHTML += `
    <li>${arg}<li/>
    `;

    let intervalId = null;

    let varName = () => {
      let c = 0;
      for (let i of words) {
        if (
          i[0].toLowerCase() == arg[arg.length - 1].toLowerCase() &&
          !used.includes(i.toLowerCase())
        ) {
          used.push(i);
          ul.innerHTML += `
          <li>${i}<li/>
          `;
          search.textContent = i;
          c = 1;
          clearInterval(intervalId);
          return;
        }
      }

      if (!c) {
        shot[0] += 1;
        window.localStorage.setItem("words", JSON.stringify(words));
        window.localStorage.setItem("shot", JSON.stringify(shot));
        window.location.reload();
        return alert('`\\("")/`');
      }
    };
    intervalId = setInterval(varName, 3000);
  }
};
