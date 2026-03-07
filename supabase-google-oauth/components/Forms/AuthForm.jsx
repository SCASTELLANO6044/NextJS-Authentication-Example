'use client'
import { signinWithGitHub, signinWithGoogle } from '@/utils/actions'

const AuthForm = () => {
  return (
    <form className='flex flex-col gap-2'>
      <button className='btn' formAction={signinWithGoogle}>
        Sign in with Google
      </button>
      <button className='btn' formAction={signinWithGitHub}>
        Sign in with GitHub
      </button>
    </form>
  )
}

export default AuthForm