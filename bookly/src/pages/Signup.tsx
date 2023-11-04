import CenterdPage from '../ui/app/CenterdPage'

// Components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

// Types
import { signupFormSchema } from '@/models/User'
import type { SignUpForm } from '@/models/User'

// Icons & Assets
import Logo from './../assets/logo.svg'
import { Loader2 } from 'lucide-react'

// React hook form & zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

function Signup() {
    // 1. form definition
    const form = useForm<SignUpForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // 2. form submit handler
    const onSubmit = async (data: SignUpForm) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        form.reset({
            email: '',
            password: '',
        })
    }

    return (
        <CenterdPage>
            <img src={Logo} alt="Bookly" width={66} className="mb-14 mt-44" />
            <h1 className=" text-display-X-small mb-6 text-zinc-950">
                Create an account
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" w-80 min-w-max "
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-6">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter a strong password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        size="sm"
                        type="submit"
                        className="w-full mt-6"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <Loader2 className="animate-spin" size={16} />
                        ) : (
                            'Create Account'
                        )}{' '}
                    </Button>

                    <p className=" text-indigo-700 text-label-small mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className=" underline">
                            Login
                        </Link>
                    </p>
                </form>
            </Form>
        </CenterdPage>
    )
}

export default Signup
