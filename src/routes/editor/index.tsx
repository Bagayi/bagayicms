import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Counter from "~/components/counter/counter";
import Gridstack from "~/components/gridstack";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik! editor
        <br />
        Happy coding.
      </div>
      <div>
        <Gridstack></Gridstack>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Editor",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
