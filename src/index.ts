import DiscordRPC from "discord-rpc";

class AutoClient extends DiscordRPC.Client {
  private closeinterval?: NodeJS.Timeout;
  constructor(options: DiscordRPC.RPCClientOptions) {
    super(options);

    if (options.transport == "ipc") {
      (this as any).transport.on("close", this.onClose.bind(this));
    }
  }

  private onClose() {
    if (!this.closeinterval) {
      this.closeinterval = setInterval(() => {
        (this as any).transport
          .connect()
          .then(() => {
            this.closeinterval && clearInterval(this.closeinterval);
            this.closeinterval = undefined;
          })
          .catch(() => {});
      }, 15e3);
      this.closeinterval.unref();
    }
  }

  public async endlessLogin(options: DiscordRPC.RPCLoginOptions): Promise<this> {
    await new Promise<void>((res) => {
      const fn = () => {
        this.connect(options.clientId)
          .then(() => {
            clearInterval(interval);
            res();
          })
          .catch(() => {});
      };
      const interval = setInterval(fn, 10e3);
      interval.unref();
      fn();
    });

    if (!options.scopes) {
      this.emit("ready");
      return this;
    }
    if (!options.accessToken) {
      options.accessToken = await (this as any).authorize(options);
    }
    return (this as any).authenticate(options.accessToken);
  }
}

export default {
  AutoClient,
  ...DiscordRPC,
};
