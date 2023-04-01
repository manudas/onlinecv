import { Validators } from '@angular/forms'
import { AcceptedTypes } from '@app/ui/dialog/dialog.component'
import { assessmentFromOneToTen } from '@utils/commonFormValidators'

export const colsToRender            = [ 'tag', 'description', 'school', 'average_grade', 'edit', 'delete', 'order' ]
export const dataInputs              = [ 'id', 'tag', 'type', 'finish_date', 'description', 'final_project', 'school', 'school_url', 'start_date', 'average_grade' ]
export const dataDefaultInputValues  = new Map()
export const dataDefaultInputTypes   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', ['hidden']],
    ['type', ['hidden']],
    ['start_date', ['date', 'readonly']],
    ['finish_date', ['date', 'readonly']],
    ['average_grade', ['number']],
])
export const dataInputValidators     = new Map([ ['tag', [Validators.required]], ['type', [Validators.required]], ['average_grade', [assessmentFromOneToTen]] ])
export const dataInputErrors         = new Map([ ['tag', 'You should provide a valid tag for your training'], ['average_grade', 'Out of range, should be between 1 and 10 or empty'] ])
export const dataInputPlaceholders = new Map([
    ['tag', 'Enter the training name'],
    ['description', 'Optional: a brief description of your training'],
    ['school', 'Optional: the name of the place you got your training'],
    ['school_url', 'Optional: the url of your School, if any'],
    ['start_date', 'Optional: the date in which you started your training'],
    ['finish_date', 'Optional: the date in which you finished your training'],
    ['final_project', 'Optional: the name or a brief description of your Final Training Project, if any'],
    ['average_grade', 'Optional: write down here an average of your marks during the training course'],
])
export const dataInputLabels = new Map([
    ['tag', 'Tag your training'],
    ['description', 'Please enter a description'],
    ['school', 'Please enter the school, academy or place where you got your training'],
    ['school_url', 'Add the web address of the School'],
    ['start_date', 'Provide your starting date'],
    ['finish_date', 'Provide your finishing date'],
    ['final_project', 'Do you want to add some info about your Final Project?'],
    ['average_grade', 'Do you want to show up your average marks?'],
])
export const dataInputHelpBlocks = new Map([
    ['tag', 'E.g: Bachelor Degree on Computer Science'],
    ['description', 'E.g.: I learnt Java and Javascript in this bootcamp'],
    ['school', 'E.g.: Upper Technical School of Computer Science in University of Málaga'],
    // ['school_url', 'Optional: the url of your School, if any'],
    ['start_date', 'Click on the toggle button to open the date selector'],
    ['finish_date', 'Click on the toggle button to open the date selector'],
    ['final_project', 'E.g.: Experimentation with 3D technologies for mobile devices'],
    ['average_grade', 'E.g.: 8.5'],
])