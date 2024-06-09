import type { SectionRecord } from "$lib/interfaces/section";
import { writable, type Writable } from "svelte/store";

const sections: Writable<SectionRecord> = writable({});
export default sections;