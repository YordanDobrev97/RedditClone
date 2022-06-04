const Aside = () => {
  return (
    <div class="w-1/3 ml-5">
      <div class="py-2">
        <div class="rounded bg-white mb-4">
          <div class="p-3">
            <div class="h-8 -m-3 bg-no-repeat" />
          </div>
          <div>
            <div class="inline-flex items-center">
              <span class="text-lg ml-4 mt-6">r/popular</span>
            </div>
            <p class="font-normal mb-3 text-sm leading-normal">
              The best posts on Reddit for you, pulled from the most active
              communities on Reddit. Check here to see the most shared, upvoted,
              and commented content on the internet.
            </p>
            <button class="bg-blue-dark text-sm text-dark font-semibold rounded px-4 py-2 w-full">
              CREATE POST
            </button>
          </div>
        </div>
      </div>

      <div class="rounded bg-white mb-4">
        <div class="p-3 text-xxs font-semibold w-full">
          TRENDING COMMUNITIES
        </div>
        <div class="pb-4">
          <div class="px-3 py-2">
            <div class="flex">
              <img
                class="h-8 w-8 border rounded-full mr-2"
                src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"
              />
              <div class="flex flex-col font-medium">
                <a
                  href="#"
                  class="text-xs text-black-alt no-underline leading-tight"
                >
                  r/tailwind
                </a>
                <span class="text-xxs">1.000 subscribers</span>
              </div>
              <div class="flex ml-auto">
                <button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
