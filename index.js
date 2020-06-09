let element = document.createElement("div");
let post_id = document
  .getElementById("smart-banner-script")
  .getAttribute("post_id");
let app_name = document
  .getElementById("smart-banner-script")
  .getAttribute("name");
let app_slogan = document
  .getElementById("smart-banner-script")
  .getAttribute("subtitle");
let dynamic_root = document
  .getElementById("smart-banner-script")
  .getAttribute("dynamic_root");
let icon = document.querySelector('link[rel="icon"]').href;
console.log(icon);

function detectMob() {
  const toMatch = [/Android/i, /iPhone/i];

  return toMatch.some((toMatchItem) => {
    console.log(toMatchItem);
    return navigator.userAgent.match(toMatchItem);
  });
}
console.log(detectMob());
if (detectMob()) {
  element.innerHTML = `
  <div
        class="banner"
        style="
          background-color: #eaeaea;
          height: 70px;
          margin: 0px 0px 10px 0px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        "
      >
      
        <div style="display: flex; justify-content: center;align-items: center">
        <span style="background-color: #999;color:#222; padding: 0px 6px 2px 6px;border-radius: 10px">x</span>
          <img
            height="40"
            src="${icon}"
            alt=""
            style="padding: 6px; margin: 6px 12px; border-radius: 12px;background-color:white;"
          />
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              max-width: 160px;
            "
          >
            <span style="font-size: 16px; font-weight: bold;">${app_name}</span>
            <span style="font-size: 10px;">${app_slogan}</span>
          </div>
        </div>
        <div style="margin:0px;">
          <a
            style="
              background-color: #37a737;
              color: white;
              padding: 8px 8px;
              text-decoration: none;
              font-size: 12px;
              border-radius: 4px;
            "
            href="${dynamic_root}?link=https://fotbollsthlm.se/${post_id}&ibi=se.capolista.fotbollsthlm&isi=1509053914&efr=1&d=1"
            >Öppna i appen</a
          >
        </div>
      </div>
  `;
  document.body.prepend(element);
}
