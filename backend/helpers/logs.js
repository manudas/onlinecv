import { Chalk } from 'chalk';

const chalk = new Chalk( {level: 1} );

const log = console.log;
const warn = console.warn;
const error = console.error;

const logStyleFn = new Map([
    ['red', chalk['red']],
    ['yellow', chalk['yellow']],
    ['green', chalk['green']],
    ['blue', chalk['blue']],
    ['default', (str) => str]
]);

const logTypeFn = new Map([
    ['log', log],
    ['warn', warn],
    ['error', error],
    ['default', log]
]);

/**
 * Prints to console the given styled text in the pointed log level
 * @param {{data: [{text, style}], logLevel: string, attachTimeStamp: boolean}} param0:
 * the text to print with respective styling options + the log level + dateTime attach
 *
 * @returns { void }
 */
const niceLog = ({
    data, // Array of objects or object
    logLevel = 'default',
    attachTimeStamp = false,
    styleTimeStamp = 'green'
} = {}) => {
    if (!data) return;
    let styledData = data;
    if (!Array.isArray(data)) {
        styledData = [data];
    }
    if (attachTimeStamp) {
        styledData.unshift({
            text: `${new Date().toLocaleString()} ::`,
            style: styleTimeStamp
        })
    }
    const styledText = styledData.map(({text, style}) => {
        const styleFn = logStyleFn.get(style) ?? logStyleFn.get('default');
        return styleFn(text);
    })

    logTypeFn.get(logLevel)(...styledText);
}

export default niceLog;