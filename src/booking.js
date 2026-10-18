import { site } from './data/site'

// Labels for direct-booking calls to action, e.g. "Book direct and save up to 15%".
export const bookLabel = site.directSavings ? `Book direct and save up to ${site.directSavings}%` : 'Book direct and save'
export const savingsLabel = site.directSavings ? `Save up to ${site.directSavings}%` : 'Book direct and save'
