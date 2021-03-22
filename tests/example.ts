import DiscordRPC from "../src";

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
