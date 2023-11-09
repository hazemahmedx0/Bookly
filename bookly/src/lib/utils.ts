import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '../../context/auth'

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

// refactor tree

export function menuTreeRefactor(tree: any, parentid: number) {
    if (tree === undefined) return
    const filteredData = tree?.filter((item: any) => item.id !== 2)

    const transformedData = filteredData.map((item: any) => {
        return {
            id: item.id,
            parent: item.parentId || parentid, // Use 0 if parentId is null
            droppable: true,
            text: item.name,
        }
    })

    return transformedData
}
