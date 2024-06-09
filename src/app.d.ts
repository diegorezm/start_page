// See https://kit.svelte.dev/docs/types#app

import type Section from "$lib/interfaces/section";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      data: Section[];
    }
    // interface Platform {}
  }
}

export {};
