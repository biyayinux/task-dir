<template>
  <div
    class="flex min-h-screen flex-col bg-white text-black transition-colors duration-500 ease-in-out dark:bg-black dark:text-white"
  >
    <Header />
    <main class="flex-1 p-4 py-6">
      <slot />
    </main>
    <Footer />
  </div>
</template>
