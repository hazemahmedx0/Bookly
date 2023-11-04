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
import { loginFormSchema } from '@/models/User'
import type { LoginForm } from '@/models/User'

// Icons & Assets
import Logo from './../assets/logo.svg'
import { Loader2 } from 'lucide-react'

// React hook form & zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

function Login() {
    // 1. form definition
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // 2. form submit handler
    const onSubmit = async (data: LoginForm) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
    }

    return (
        <CenterdPage>
            <img src={Logo} alt="Bookly" width={66} className="mb-14 mt-44" />
            <h1 className=" text-display-X-small mb-6 text-zinc-950">Login</h1>

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
                                <FormLabel>Email Address</FormLabel>
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
                                        placeholder="Enter your password"
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
                            'Sign In'
                        )}{' '}
                    </Button>

                    <p className=" text-indigo-700 text-label-small mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className=" underline">
                            Create an account
                        </Link>
                    </p>
                </form>
            </Form>
        </CenterdPage>
    )
}

export default Login
