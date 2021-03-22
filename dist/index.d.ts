import DiscordRPC from "discord-rpc";
declare class AutoClient extends DiscordRPC.Client {
    readonly options: DiscordRPC.RPCClientOptions;
    private closeinterval?;
    private _clientID?;
    private transport;
    get clientID(): string | undefined;
    constructor(options: DiscordRPC.RPCClientOptions);
    private onClose;
    private endlessConnect;
    endlessLogin(options: DiscordRPC.RPCLoginOptions): Promise<this>;
}
declare const _default: {
    register(id: string): boolean;
    Client: typeof DiscordRPC.Client;
    AutoClient: typeof AutoClient;
};
export default _default;
