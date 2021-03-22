"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_rpc_1 = __importDefault(require("discord-rpc"));
class AutoClient extends discord_rpc_1.default.Client {
    constructor(options) {
        super(options);
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
    async endlessLogin(options) {
        await new Promise((res) => {
            const fn = () => {
                this.connect(options.clientId)
                    .then(() => {
                    clearInterval(interval);
                    res();
                })
                    .catch(console.error);
            };
            const interval = setInterval(fn, 10e3);
            fn();
            interval.unref();
        });
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
    ...discord_rpc_1.default
};
