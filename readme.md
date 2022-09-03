# Community

Official Website: https://slm.games

Telegram: https://t.me/slm_games

# Installation

- Using npm:

```shell
  npm i api.slm.games
```

- Using yarn

```shell
  yarn add api.slm.games
```

# Get Start

```javascript
import api from "api.slm.games";

const token = "GET YOUR TOKEN FROM PROFILE PAGE";

async function main() {
  const ins = new api("https://api.slm.games", token);
  const info = await ins.userGetInfo();
  console.log(info);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

- API Token
  You can get API Token from https://slm.games/profile

  And `Don't` show it to anyone

- Token Expiration
  By default, the token for API is valid for 86400 seconds (24 hours).

  We recommend that you refresh token expiration by call `userGetInfo` API every minute;

# API

- userGetInfo
  Get current user's information

  ```javascript
  const info = await ins.userGetInfo();
  ```

- walletGetBalance
  Get balance of symbol

  ```javascript
  const balance = await ins.walletGetBalance("SLM");
  ```

- diceBet
  Bet on dice game

  ```javascript
  const rsp = await ins.diceBet("over", 50, "SLM", 100);
  ```
