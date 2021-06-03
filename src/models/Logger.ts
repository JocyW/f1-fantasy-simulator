import * as fs from "fs";
import * as path from "path";

const LOG_LEVEL_ENUM = {
    'debug': 1,
    'info': 2,
    'warn': 3,
    'error': 4
}

const LOG_TRANSPORTS_ENUM = {
    'console': 1,
    'file': 2
}

const LOG_LEVEL = 'info';
const LOG_TRANSPORTS = [LOG_TRANSPORTS_ENUM.console, LOG_TRANSPORTS_ENUM.file];

const now = new Date();
const fileStream = fs.createWriteStream(path.join('./dist', `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}--${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-debug.log`))

export default class Logger {
    private className: string;

    constructor(className: string) {
        this.className = className;
    }

    private static toFixedLength(string: string, length: number) {
        let outString = string;
        if (string.length < length) {
            outString = string;
            for (let i = string.length; i < length; i++) {
                outString += ' ';
            }
        } else if (string.length > length) {
            outString = string.slice(0, length - 3) + '...'
        }

        return outString;
    }

    public log(level: 'error' | 'warn' | 'info' | 'debug', ...messages) {
        const now = new Date();

        if (LOG_LEVEL_ENUM[level] >= LOG_LEVEL_ENUM[LOG_LEVEL]) {
            if (LOG_TRANSPORTS.includes(LOG_TRANSPORTS_ENUM.console)) {
                console[level](`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${Logger.toFixedLength(level.toUpperCase(), 5)} ${Logger.toFixedLength(this.className, 20)}`, ...messages)
            }
        }

        if (LOG_TRANSPORTS.includes(LOG_TRANSPORTS_ENUM.file)) {
            fileStream.write(JSON.stringify({
                level,
                className: this.className,
                messages: [...messages]
            }) + '\n')
        }
    }

    public error(...messages) {
        this.log('error', ...messages);
    }

    public warn(...messages) {
        this.log('warn', ...messages);
    }

    public info(...messages) {
        this.log('info', ...messages);
    }

    public debug(...messages) {
        this.log('debug', ...messages);
    }
}
