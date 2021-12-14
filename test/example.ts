import DiscordRPC from "../dist";

const client = new DiscordRPC.AutoClient({ transport: "ipc" });

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
// client.login() is still able to reconnect
