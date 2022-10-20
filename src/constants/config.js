/** @format */

const isAccessedFromWorker = typeof window === "undefined";

const isDevModeOn = () => {
  if (isAccessedFromWorker) {
    return false;
  } else {
    return true; // Always show
  }
};

export const getCustomIcxServer = () => {
  const initialCustomServer = {
    customNetName: "icx",
    customWalletURL: "https://wallet.icon.foundation/api/v3",
    customTrackerURL: "",
    customNid: "0x1",
  };
  if (isAccessedFromWorker) {
    return initialCustomServer;
  } else {
    return localStorage.getItem("customIcxServer")
      ? JSON.parse(localStorage.getItem("customIcxServer"))
      : initialCustomServer;
  }
};

export const INITIAL_API_VERSION_ICX = "v3";
export const INITIAL_SERVER_ICX = prodDev("icx", "icx");

export const HIDE_SERVER = isDevModeOn() ? false : true;
export const LEDGER_SERVER = prodDev(
  "https://hardwallet.icon.foundation/index_jw.html",
  "https://hardwallet.icon.foundation/index_jw.html"
);

export const getCurrentServer = (coinType) => {
  let server;
  const initialServer = INITIAL_SERVER_ICX;

  if (!isAccessedFromWorker) {
    server = localStorage.getItem(`icxServer`);
  } else {
    server = initialServer;
  }
  return server;
};

export const ICX_WALLET_SERVER = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    icx: "https://wallet.icon.foundation/api/v3",
    custom: getCustomIcxServer().customWalletURL
  };
  if(obj[icxServer] === (null || undefined)) {
    return getCustomIcxServer().customWalletURL;
  } else {
    return obj[icxServer];
  }
};

export const ICX_CPS_SCORE = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    icx: "cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f",
  };
  if(obj[icxServer] === (null || undefined)) {
    return "";
  } else {
    return obj[icxServer];
  }
};

export const ICX_NID = () => {
  const icxServer = getCurrentServer("icx");
  const obj = {
    icx: "0x1",
    custom: getCustomIcxServer().customNid
  };
  if(obj[icxServer] === (null || undefined)) {
    return getCustomIcxServer().customNid;
  } else {
    return obj[icxServer];
  }
};

export const icxServerList = {
  custom: "custom"
};

export const icxApiVersionList = {
  v2: "v2",
  v3: "v3",
};

function prodDev(prod, dev) {
  return process.env.NODE_ENV === "production" ? prod : dev;
}