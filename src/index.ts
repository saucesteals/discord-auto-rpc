import DiscordRPC from "discord-rpc";

class AutoClient extends DiscordRPC.Client {
  private closeinterval?: NodeJS.Timeout;
  private clientId?: string;
  private transport: any;
  private authenticate: any;
  private authorize: any;

  constructor(readonly options: DiscordRPC.RPCClientOptions) {
    super(options);

    if (options.transport == "ipc") {
      this.transport.on("close", this.onClose.bind(this));
    }
  }

  private onClose() {
    if (!this.closeinterval) {
      this.closeinterval = setInterval(() => {
        this.transport
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

  private endlessConnect(clientId: string): Promise<void> {
    return new Promise((res) => {
      this.clientId = clientId;
      const fn = () => {
        this.transport
          .connect(this.clientId)
          .then(() => {
            clearInterval(interval);
          })
          .catch(() => {});
      };
      const interval = setInterval(fn, 15e3);
      interval.unref();
      fn();

      this.once("connected", () => {
        res();
      });
    });
  }

  public async endlessLogin(options: DiscordRPC.RPCLoginOptions): Promise<this> {
    if (this.options.transport != "ipc")
      throw new Error("Endless login is currently only supported on the IPC transport");

    await this.endlessConnect(options.clientId);

    if (!options.scopes) {
      this.emit("ready");
      return this;
    }
    if (!options.accessToken) {
      options.accessToken = await this.authorize(options);
    }
    return this.authenticate(options.accessToken);
  }
}

export default {
  AutoClient,
  ...DiscordRPC,
};
