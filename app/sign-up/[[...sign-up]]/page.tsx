import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SignUp afterSignInUrl="/new-user" redirectUrl="/new-user" />
    </div>
  )
}

export default SignUpPage
