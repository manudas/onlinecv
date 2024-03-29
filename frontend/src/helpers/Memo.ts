import { MemoOptions } from '../types/Memo';
import isEqual from 'lodash/isEqual';

export const Memoization = <T>(
    func: (...dep: any) => T,
    options: MemoOptions = {}
): ((...dep: any) => T) => {
    const depsChangedGenerator = ((): Generator => {
        let previousDeps;
        /*
            function* myfun(): Generator<
                WhatYouYield,
                WhatYouReturn,
                WhatYouAccept
            > {
                const myYield = "foo" //type of myYield is WhatYouYield
                const myAccepted = yield myYield; //type of myAccepted is WhatYouAccept
                return "baz" //type of this value is WhatYouReturn
            }
        */
        return (function* (): Generator<
            boolean | undefined,
            any,
            undefined
        > {
            let nextDepsToTest = yield;
            while (true) {
                if (
                    !isEqual(previousDeps, nextDepsToTest)
                ) {
                    previousDeps = nextDepsToTest;
                    nextDepsToTest = yield true;
                } else {
                    nextDepsToTest = yield false;
                }
            }
        })();
    })();

    depsChangedGenerator.next(); // initialising the generator

    const { ignoreMemorisedValue = false } = options;

    const depsChanged = (...deps: any) => {
        return depsChangedGenerator.next(deps).value;
    };

    const getFuncValue = ((): ((
        hasChanged: boolean,
        ...dep: any
    ) => T) => {
        let previousValue: T;

        return (
            depsHaveChanged: boolean,
            ...dep: any
        ): T => {
            // if we have set ignoreMemorisedValue to false, take into account previousValue
            if (
                (!ignoreMemorisedValue && !previousValue) ||
                depsHaveChanged
            ) {
                previousValue = func(...dep);
            }
            return previousValue;
        };
    })();

    return (...dep: any) => {
        const depsHaveChanged = depsChanged(dep);
        return getFuncValue(depsHaveChanged, dep);
    };
};
