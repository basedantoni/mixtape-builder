'use client'

import { loginSpotify } from '@/app/actions'
import { Button } from '@/components/ui/button'

export const LoginButton = () => {
  return (
    <Button onClick={() => loginSpotify()}>Login</Button>
  )
}