import { AbstractControl, ValidationErrors } from "@angular/forms";

export const assessmentFromOneToTen = (
    control: AbstractControl
): ValidationErrors | null => {
    const outOfRange =
        control.value &&
        (control.value > 10 || control.value < 1);
    return outOfRange
        ? { outOfRange: { value: control.value } }
        : null;
};