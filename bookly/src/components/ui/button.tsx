import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    ' inline-flex items-center justify-center whitespace-nowrap rounded-md text-label-small ring-offset-background transation-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ',
    {
        variants: {
            variant: {
                default:
                    'primary-btn-bg primary-btn-border primary-btn-shadow text-primary-foreground focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-1 focus-visible:ring-indigo-500/23  focus-visible:ring-offset-1 focus-visible:border-indigo-500 text-base',
                destructive:
                    'destructive-btn-bg destructive-btn-border destructive-btn-shadow text-primary-foreground focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500/23  focus-visible:ring-offset-1 focus-visible:border-red-500',
                // 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'Secondary-btn-bg Secondary-btn-border Secondary-btn-shadow text-zinc-900  focus-visible:outline-none focus-visible:border-Neutral-500 focus-visible:ring-1 focus-visible:ring-Neutral-500/23  focus-visible:ring-offset-1 focus-visible:border-Neutral-500',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
