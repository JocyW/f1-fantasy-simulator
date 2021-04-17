const LOG_LEVEL_ENUM = {
    'debug': 1,
    'info': 2,
    'warn': 3,
    'error': 4
}

const LOG_LEVEL = 'info';

export default class Logger {
    private className: string;

    constructor(className: string) {
        this.className = className;
    }

    public log(level: 'error' | 'warn' | 'info' | 'debug', ...messages) {
        if (LOG_LEVEL_ENUM[level] >= LOG_LEVEL_ENUM[LOG_LEVEL]) {
            const now = new Date();
            console[level](`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}|${level}`, ...messages)
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
