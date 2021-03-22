<div align="center">
  <br />
  <p>
    <a href="https://www.npmjs.com/package/discord-auto-rpc"><img src="https://img.shields.io/npm/v/discord-auto-rpc.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-auto-rpc"><img src="https://img.shields.io/npm/dt/discord-auto-rpc.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/devsnek/discord-auto-rpc"><img src="https://img.shields.io/david/devsnek/discord-auto-rpc.svg?maxAge=3600" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/discord-auto-rpc/"><img src="https://nodei.co/npm/discord-auto-rpc.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

# Discord Auth RPC

Extends the [discord-rpc](https://npmjs.org/discord-rpc) library to automatically reconnect on disconnect/error

### Example

```typescript
import DiscordRPC from "../src";

const client = new DiscordRPC.AutoClient({ transport: "ipc" }); // Reconnection only available on IPC transport

const setActivity = () => {
  client.setActivity({
    details: "Hello",
    state: ":)",
    startTimestamp: new Date(),
    buttons: [{ label: "Example", url: "https://example.com" }],
  });
};

client.once("ready", () => {
  setActivity();
  setInterval(setActivity, 15e3);
});

client.endlessLogin({ clientId: "797173289616801862" });


// client.endlessLogin() will keep retrying to login until it is successful (ex. wait until discord is open if its not)

// if you want to attempt to login once - client.login() 
// client.login() is still able to reconnect on disconnects
```

Note that the auto reconnecting feature is only present when using `IPC` as the transport