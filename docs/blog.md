# Your Rails devs will want to write JS: Svelte Components in HTML Apps

At Carbon Five, we try to be agile about our technology choices, and pick the simplest tool for the job at hand. That means that even in 2019, in era of React and Redux and GraphQL and all the other fancy tools for client-side web applications, sometimes the best tool for our clients is a good old Rails app, serving HTML.

Often the vision for the project pushes us towards an SPA instead - maybe the app is going to be highly interactive, or include realtime data, or the client is already invested in a front-end framework. In those cases, of course we'll reach for React (or Angular or Vue).

But for the traditional CRUD app that just needs to show some data and let users update it, a small team of experienced Rails developers can get an idea to market incredibly quickly.

Sometimes we find ourselves adding a few API routes and a bit of client-side jQuery to make pieces of UI refresh a little more often, or check their validity, or some other small quality of life improvement. The jQuery not ideal, but there's a feeling of "we don't want to pull in a whole front-end framework just for this."

Then it happens. That moment where the dev teams says "oh no, should we have used React?" Maybe a user in an interview mentions, "why can't I edit this data right here, why do I have to go to another page to do it?" Or maybe the next big feature is wizard, with lots of state, conditional fields based on values from previous pages, a dynamic progress bar, validation that should warn you about missing data, but not stop you from progressing until you try to submit... the stuff they invented SPAs to deal with.

That doesn't mean the team made a mistake going with Rails - an SPA adds drag to any project, and if you can get an MVP out faster without it, then you're in a great place. But still, it would be nice if there was something in between -- that had the size and simplicty of jQuery, with the more powerful declarative abstractions of React.

## Svelte to the Rescue

This is where Svelte comes in. Svelte is a pretty new framework, that got its final shape only in TODO WHEN. So it's a little bleeding edge. But Svelte 1 and 2 have been going for a couple years now, and it's gotten to be a pretty slick little framework.

And little is the right word. The big idea behind Svelte is that humans writing declarative code (like React), but the browser prefers imperitive changes (like jQuery). So Svelte isn't acutally a runtime library; it's a compiler, that takes React-like component code and turns it into a set of watches and DOM manipulations. That means builds are smaller and performance is better. And maybe more importantly, because it's a compiler, Svelte lets you spend less time writing extra code to get around performance issues because it does those optimizations for you. This will make more sense with an example.

Here's a simple React component that lets you count down from 10:

```jsx
import React, { useState } from 'react';

const CountDown = () => {
  const [count, setCount] = useState(0);

  const remaining = 10 - count;

  const increment = () => {
    if (remaining > 0) {
      setCount(count + 1)
    }
  }

  return (
    <div>
      <div>Count: {count}</div>
      <div>Remaining: {remaining}</div>
      <button onClick={increment}>Click</button>
    </div>
  );
}
```

And here's the equivilant in svelte:

```html
<script>
  let count = 0;
  $: remaining = 10 - count;

  const increment = () => {
    if (remaining > 0) {
      count++;
    }
  }
</script>

<div>
  <div>Count: {count}</div>
  <div>Remaining: {remaining}</div>
  <button on:click={increment}>Click</button>
</div>
```

That `$:` symbols is a "reactive declaration", and is the heart of Svelte's magic. It's like a let declearation, but whenever any variable referenenced in the expression -- `count` in this case -- is updated, the expression is re-run and `remaining`'s value is updated. So it declares a relationship - `remaining` is always `10 - count`. This might seem crazy, but it's conceptually the same as declaring a variable that you know will be updated in every React render loop.

Reactive declaration means that you're able to do simple assignment in Svelte, but without the performance problems of the old AngularJS digest cycle. That's because those assignments get _compiled_ into something a lot like `setState`, except that only the reactive declarations that depend on a given value will be re-run when that value is chaged. Pretty rad! That means your Rails devs don't have to learn a whole new programming paradigm just to write a little component. They can assign like they would in Ruby, and everything just works.

If you want to see what gets compiled, Svelte has a nice online REPL that lets you code a component, run it, and see its compiled output. [Here's the `CountDown` component](https://svelte.dev/repl/5d2edc49838f479eb1a784be0cb01f43?version=3.10.0).

## Simple State management

The other big expense with switching to React is it's never just React, or the problem wouldn't be complicated enough to warrant it. You'll probably want Redux for cross-component communication, and thunks or sagas for API calls. If the team is already experienced with all that tech, it's fine. But if they're not, that's a ton of ramp-up ("I have to touch _how_ many files to save an input field?" "Oh it's not saving because you forgot to `mapDispatchToProps`") and setup that's going to crater your nice high Rail-y velocity. 

Instead, Svelte has the concept of Stores, which are just simple implementations of the Observer pattern. You can set their value, update it, and subscribe to updates. YOu can also make Stores that are derived from other stores, which makes it work like a simple version of RxJS. But the magic is that within a component you can treat a store like a reactive value, that you can update and get updates from, without any boilerplate. Using one looks like this:

A store version of CountDown looks like this. And you can play with it [here](https://svelte.dev/repl/f670fcbb5b65483899e5e7d490a606da?version=3.10.0).

```javascript
// Store.js
import { writable, derived } from 'svelte/store';

export const count = writable(0);
export const remaining = derived(count, n => 10 - n);
export const increment = () => count.update(n => n < 10 ? n + 1 : n);
```

```html
<!-- Countdown.svelte -->
<script>
	import { count, remaining, increment } from './store.js';
</script>

<div>
  <div>Count: {$count}</div>
  <div>Remaining: {$remaining}</div>
  <button on:click={increment}>Click</button>
</div>
```

For a large SPA, you'll want to introduce some structure to your data model or it'll turn into spegetti code, with stores being created and updated all over the place. Svelte actually works with RxJS [out of the box](https://twitter.com/sveltejs/status/1121762491917328384?lang=en), so I might use that for a large project. But if all you need is a few isolated groups of components, then a simple store is a great way to share state between them.

## Rails Integration

That simple case is what I want to focus on in this post. You've got a working server-rendered web app, and you want to add a little dynamic content to it. This example will focus on Rails, but if you're using another framework like Python's Django or Elixir's Phoenix then this all still applies. There's just a little glue code you'll have to add to your app, while I've got a library for integrating with Rails.

To have a concrete example to work through, let's imagine we're working on a Rails app with a Contacts List page. It has an `index.html.erb` file for showing all your contacts, an `edit.html.erb` file for editing one contact, and a `new.html.erb` file for creating a new one. You can generate that whole thing with a simple `rails g scaffold contacts ETC.` command.

But of course, it can't last. Eventually someone is going to say, "I can see all my contacts on this one index page, I want to be able to add, edit, and delete them without going to a seperate page." And they're right! The `edit.html.erb` model works, but it can feel clunky in 2019. Coding up the logic to do CRUD operations on the rows in that index table, and keep a running count in the corner, is totally doable in jQuery. But this is a great case for a few components - a ContactList, a ContactRow, and a ContactCounter for that badge in the corner. Let's see how we could build those in Svelte.

First off, let's take the HTML for a row, which looks like this:

And turn it into a svelte component that looks like this:




## Tool integrations

There are other tutorials for getting set up with Svelte, but when evaluating a new framework I want to know how well it works with the tools I like, like TypeScript and Jest.

Happily the testing situation with Svelte is pretty good. [Svelte Testing Library]() gives you the same testing syntax as the popular React Testing Library. You'll need the [svelte-jest-transformer]() to make it work, which caused me some problems when dealing with TypeScript and Webpack loaders. But I've got a fix for that here [will-wow/svelte-jest-transformer]() that you can use until it gets merged.



---

At the begining of these projects, there's a choice: server-rendered rails, or React?

Every framework solves the annoyances of a previous one, and introduces some of its own. When a jQuery project goes on for a while, the developers start to long for an organized, predictable, declarative framework. And when a React project goes on for a while, the developers start to wonder if life wasn't better when you could just `$('input[name="title"]').addClass('error')` and call it a day.

---

Sure, hacking it together in jQuery will be a pain, but if feels a little ridiculous to bring in this big SPA framework for a couple little components. 

