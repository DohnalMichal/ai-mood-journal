import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/journal"
        signUpFallbackRedirectUrl="/journal"
      />
    </div>
  )
}

export default SignInPage
