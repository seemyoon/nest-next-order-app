'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/services/api.services'

const SignInClientFormComponent = () => {
  const { register, handleSubmit } = useForm<IAuthUserData>({
    defaultValues: {
      username: 'userAS1',
      password: 'P@$$word1',
    },
  })
  const [, setAuthState] = useState(false)

  const authenticate = async (formData: IAuthUserData) => {
    const isAuth = await authService.authentication(formData)
    setAuthState(isAuth)
  }

  return (
    <form onSubmit={handleSubmit(authenticate)}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              {...register('username')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register('password')}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-md">
            Sign In
          </button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center text-sm">
        Don&#39;t have an account?
        <Link className="underline ml-2" href="signup">
          Sign Up
        </Link>
      </div>
    </form>
  )
}

export default SignInClientFormComponent
