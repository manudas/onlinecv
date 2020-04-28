const fs = require('fs');
const cp = require('child_process');
const ncu = require('npm-check-updates');

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(element => element.isDirectory())
        .map(element => element.name)

const updateDependencies = async () => {
    const directories = getDirectories('.');
    directories.push('.');

    const arrPromises = [];
    directories.forEach(directory => {
        if (fs.existsSync(directory + '/package.json')) {
            // ncu
            const promise = ncu.run({
                // Any command-line option can be specified here.
                // These are set by default:
                jsonUpgraded: true,
                packageManager: 'npm',
                silent: true,
                packageFile: directory + '/package.json',
                upgrade: true
            }).then((upgraded) => {
                console.log('dependencies to upgrade:', upgraded);
            });
            arrPromises.push(promise);
        }
    });
    await Promise.all(arrPromises);

    directories.forEach(directory => {
        if (fs.existsSync(directory + '/package.json')) {

            cp.spawn( 'npm', ['update'], {
                cwd: directory,
                stdio: 'inherit',
                env: process.env,
                encoding: 'utf-8'
            });

        }
    });
}

if (require.main === module) {
    updateDependencies()
} else {
    module.exports = updateDependencies
}