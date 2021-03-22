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
import DiscordRPC from "discord-auto-rpc";

const client = new DiscordRPC.AutoClient({ transport: "ipc" });

const setActivity = () => {
  client.setActivity({
    details: "Hello",
    state: ":)",
    startTimestamp: new Date(),
    buttons: [{ label: "Example", url: "https://example.com" }],
  });
};

client.on("ready", () => {
  setActivity();
  setInterval(setActivity, 15e3);
});

client.endlessLogin({ clientId: "797173289616801862" });

```

Note that the auto reconnecting feature is only present when using `IPC` as the transport