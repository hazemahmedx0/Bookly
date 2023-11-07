import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Get name from email

export function extractNameFromEmail(email: string) {
    // Use a regular expression to match alphanumeric characters in the email
    const name = email.match(/^[a-zA-Z\s]+$/)
    // Check if a match was found, and return it
    if (name) {
        return name[0]
    }

    // Return an empty string if no match was found
    return 'user'
}
