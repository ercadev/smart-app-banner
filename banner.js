// Creating a div element for the banner
let element = document.createElement("div");

// Gets all arguments from the script tag
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
let dynamic_path = document
  .getElementById("smart-banner-script")
  .getAttribute("dynamic_path");
let icon = document.querySelector('meta[property="og:image"]').content;

// Checks if user is using Android or iPhone
function detectMob() {
  const toMatch = [/Android/i, /iPhone/i];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

const url = `${dynamic_root}${post_id}&${dynamic_path}`;

// Checks if cookie has value true. Takes string as argument
function isAppBannerHidden(cookieName) {
  let res =
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          "(?:(?:^|.*;)\\s*" +
            encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"
        ),
        "$1"
      )
    ) || null;
  if (res) {
    return true;
  } else {
    return false;
  }
}

// If User is using Android or iPhone AND has no cookie hideAppBanner. Show app banner
if (detectMob() && !isAppBannerHidden("hideAppBanner")) {
  element.innerHTML = `
  <div
        id="app-banner"
        class="banner"
        style="
        font-family: Roboto;
          background-color: #eaeaea;
          height: 70px;
          margin: 0px 0px 10px 0px;
          display: flex;
          padding: 0 12px;
          justify-content: space-between;
          align-items: center;
        "
      >
      
        <div style="display: flex; justify-content: start;align-items: center; max-width: 60%;">
        <div style="display:"><span onClick="hideBanner()" style="margin-right: 12px;margin-top:-4px;color: #a0a0a0">x</span></div>

          <img
            src="${icon}"
            alt=""
            style="height: 40px;border: 1px solid #ccc;padding: 6px; margin-right: 12px; border-radius: 12px;background-color:white;"
          />
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              
            "
          >
            <span style="font-size: 16px; font-weight: 500;">${app_name}</span>
            <span style="font-size: 10px;">${app_slogan}</span>
          </div>
        </div>
        <div style="margin:0px;">
          <a
            style="
              background-color: #37a737;
              color: white;
              padding: 10px 8px;
              text-decoration: none;
              font-size: 12px;
              
              border-radius: 4px;
            "
            target="_blank"
            href="${encodeURI(url)}"
            >Öppna i appen</a
          >
        </div>
      </div>
  `;
  document.body.prepend(element);
}

// Hides banner
// Shows again in 30 days
function hideBanner() {
  let banner = document.getElementById("app-banner");
  banner.remove();
  let expireTime = new Date();
  expireTime.setMonth(expireTime.getMonth() + 1);
  document.cookie = `hideAppBanner=true; expires= ${expireTime};path=/;`;
}
