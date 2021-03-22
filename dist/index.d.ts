import DiscordRPC from "discord-rpc";
declare class AutoClient extends DiscordRPC.Client {
    private closeinterval?;
    constructor(options: DiscordRPC.RPCClientOptions);
    private onClose;
    endlessLogin(options: DiscordRPC.RPCLoginOptions): Promise<this>;
}
declare const _default: {
    register(id: string): boolean;
    Client: typeof DiscordRPC.Client;
    AutoClient: typeof AutoClient;
};
export default _default;
