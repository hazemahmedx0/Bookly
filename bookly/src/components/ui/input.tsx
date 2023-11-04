import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    `flex h-8 w-full rounded-md border border-input bg-background px-2 py-1.5 text-body-small ring-offset-background inputshadow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-1 focus-visible:ring-indigo-500/23 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error
                            ? 'border-red-500 ring-1 ring-red-200 ring-offset-1 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-200 focus-visible:ring-offset-1'
                            : ''
                    }`,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
