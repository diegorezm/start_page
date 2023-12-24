// See https://kit.svelte.dev/docs/types#app

import type { Bookmarks } from "$lib/interfaces";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
      data: Bookmarks
    }
		// interface Platform {}
	}
}

export {};
