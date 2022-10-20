import ICON from "app/image/icon/icon_01.png";
import ETH from "app/image/icon/icon_02.png";

export const coinLabel = {
  icx: "ICON (ICX)",
  eth: "Ethereum (ETH)",
};

export const languageConstants = {
  kr: "Korean",
  en: "English",
};

export const popupType = {
  createWallet: "_01_createWallet",
};

export const v3_options_pdkdf2 = {
  kdf: "pbkdf2",
  c: 16384,
  cipher: "aes-128-ctr",
  prf: "hmac-sha256",
};

export const v3_options = {
  kdf: "scrypt",
  n: 16384,
  cipher: "aes-128-ctr",
};

export const routeConstants = {
  home: "/",
  mywallet: "/mywallet",
  exchange: "/exchange",
  transaction: "/transaction",
  contract: "/contract",
  mypage: "/mypage",
  lock: "/lock",
  send: "/send",
  check: "/check",
  complete: "/complete",
};

export const dateFormat = "YYYY-MM-DD HH:mm:ss";

export const blockSearchNum = 300;

export const copyState = {
  off: "",
  on: "복사완료",
};

export const coinImage = {
  icx: ICON,
  eth: ETH,
};

export const coinName = {
  icx: "ICON",
  eth: "Ethereum",
};

export const coinNameKorean = {
  icx: "아이콘",
  eth: "이더리움",
};

export const coinRound = {
  icx: 8,
  eth: 8,
};

export const ZERO_ADDRESS = "cx0000000000000000000000000000000000000000";

export const L_MAX = 20;

export const L_MIN = 5;

export const R_POINT = 0.7;

export const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    type: "function",
  },
];
