import PocketBase from "pocketbase";
import { AuthModel } from "pocketbase";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase;
      admin: AuthModel | undefined;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
