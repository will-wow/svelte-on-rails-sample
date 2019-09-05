# Your Rails devs will want to write JS: Svelte Components in Rails

At Carbon Five, we try to be agile about our technology choices, and pick the simplest tool for the job at hand. That means that even in 2019, in era of React and Redux and GraphQL and all the other fancy tools for web client-side web applications, sometimes the best tool for our clients is a good old Rails app, serving HTML.

Often the vision for the project pushes us towards an SPA instead - maybe the app is going to be highly interactive, or include realtime data, or they're already invested in a front-end framework. In those cases, of course we'll reach for React (or Angular or Vue).

But for the traditional CRUD app, that just needs to show some data and let users update it, a small team of experienced Rails developers can get an idea to market incredibly quickly.

Generally, pretty quickly we find ourselves adding a few API routes and a bit of client-side code, to make pieces of UI refresh a little more often, or check their validity, or some other small quality of life improvement. But all is still well, a little bit of jQuery goes a long way, and velocity is still good.

Then it happens. That moment where the dev teams says "oh no, should we have used React?" Maybe a user in an interview mentions, "why can't I edit this data right here, why do I have to go to another page to do it?" Or maybe the next big feature is wizard, with lots of state, conditional fields based on values from previous pages, a dynamic progress bar, validation that should warn you about missing data, but not stop you from progressing until you try to submit... the stuff they invented SPAs to deal with.

So then the team has two choices. They can just go deep with jQuery, build their 
own abstractions, and end up half-way to a framework, but it doesn't have 
anything they don't need. Or they can add React. That'll make the wizard a lot easier! But it's never just React, or the problem wouldn't be complicated enough
to warrant it. So you'll probably want Redux for cross-component communication,
and thunks or sagas for API calls. If the team is already experienced with all that tech, it's fine. But if they're not, that's a ton of ramp-up ("I have to touch _how_ many files to save an input field?" "Oh it's not saving because you forgot to `mapDispatchToProps`") and setup that's going to crater your nice high Rail-y velocity.

That doesn't mean the team made a mistake going with Rails - an SPA adds drag to any project, and if you can get an MVP out faster without it, then you're in a great place. But still, it would be nice if there was something 

---

Every framework solves the annoyances of a previous one, and introduces some of its own. When a jQuery project goes on for a while, the developers start to long for an organized, predictable, declarative framework. And when a React project goes on for a while, the developers start to wonder if life wasn't better when you could just `$('input[name="title"]').addClass('error')` and call it a day.

---

Sure, hacking it together in jQuery will be a pain, but if feels a little ridiculous to bring in this big SPA framework for a couple little components. 

