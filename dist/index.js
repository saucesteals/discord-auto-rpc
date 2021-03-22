"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_rpc_1 = __importDefault(require("discord-rpc"));
class AutoClient extends discord_rpc_1.default.Client {
    constructor(options) {
        super(options);
        this.options = options;
        if (options.transport == "ipc") {
            this.transport.on("close", this.onClose.bind(this));
        }
    }
    onClose() {
        if (!this.closeinterval) {
            this.closeinterval = setInterval(() => {
                this.transport
                    .connect()
                    .then(() => {
                    this.closeinterval && clearInterval(this.closeinterval);
                    this.closeinterval = undefined;
                })
                    .catch(() => { });
            }, 15e3);
            this.closeinterval.unref();
        }
    }
    endlessConnect(clientId) {
        return new Promise((res) => {
            this.clientId = clientId;
            const fn = () => {
                this.transport
                    .connect(this.clientId)
                    .then(() => {
                    clearInterval(interval);
                })
                    .catch(() => { });
            };
            const interval = setInterval(fn, 15e3);
            interval.unref();
            fn();
            this.once("connected", () => {
                res();
            });
        });
    }
    async endlessLogin(options) {
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
exports.default = {
    AutoClient,
    ...discord_rpc_1.default,
};
