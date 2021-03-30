import isEqual from 'lodash/isEqual';

export const useMemo = <T> (func: () => T): ((dep: any[]) => T) => {
    const _depsChagedAuxiliar = (): Generator => {
        let previousDeps

        return (function* () {
            let nextDepsToTest = yield
            while (true) {
                if (!isEqual(previousDeps, nextDepsToTest)) {
                    previousDeps = nextDepsToTest
                    nextDepsToTest = yield true
                } else {
                    nextDepsToTest = yield true
                }

            }
        })()
    }

    const depsChanged = (deps: any[]) => {
        return _depsChagedAuxiliar().next(deps).value
    }

    const getFuncValue = ((): (boolean) => T => {
        let previousValue: T

        return (depsHaveChanged: boolean): T => {
            if (!previousValue || depsHaveChanged) {
                previousValue = func()
            }
            return previousValue
        }
    })()

    return (dep: any[]) => {
        const depsHaveChanged = depsChanged(dep)
        return getFuncValue(depsHaveChanged)
    }

}