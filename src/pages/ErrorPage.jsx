import React from 'react'

function ErrorPage() {
  return (
    <section class="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <img
        src="../error-404.png"
        alt="Not Found Cat"
        class="max-w-xs sm:max-w-sm mb-8"
      />

      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
        OOPS!! PAGE NOT FOUND
      </h1>

      <p class="text-slate-500 max-w-md mx-auto mb-6">
        The page you are looking for is not available.
      </p>

      <a
        href="/"
        class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-6 py-2 shadow-md transition-all"
      >
        Go Back!
      </a>
    </section>
  )
}

export default ErrorPage