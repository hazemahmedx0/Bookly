// Layout
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
import { useToast } from '@/components/ui/use-toast'

// Types
import { loginFormSchema } from '@/models/User'
import type { LoginForm } from '@/models/User'

// Icons & Assets
import Logo from './../assets/logo.svg'
import { Loader2 } from 'lucide-react'

// React hook form & zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// React router
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

// API
import userApi from '../api/modules/user.api'
import { useEffect } from 'react'

function Login() {
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    const { toast } = useToast()

    useEffect(() => {
        if (searchParams.get('signup') === 'success') {
            const toastCall = () =>
                toast({
                    title: 'Account created successfully',
                    description: 'You can now login to your account',
                })
            toastCall()
        }
    }, [searchParams, toast])

    // 1. form definition
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginForm) => {
        try {
            const { response, err } = await userApi.login(data)
            if (response) {
                navigate(`/all`, { replace: true })
            }
            if (err) {
                console.log(err.error.data.email)
                form.setError('email', {
                    type: 'server',
                    message: err.error?.data?.email,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CenterdPage>
            <img src={Logo} alt="Bookly" width={66} className="mb-14 mt-44" />
            <h1 className=" text-display-X-small mb-6 text-zinc-950">Login</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" authForms "
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
                                        error={form.formState.errors?.email}
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
                                        error={form.formState.errors?.password}
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
