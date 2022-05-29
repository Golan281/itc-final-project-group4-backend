# run with 'npm start'

# .env settings:
- DB_URI=bla
- JWT_SECRET=bla
- SALT=10
- CORS_ORIGIN=http://localhost:3000

# The general idea:
- a browser management app on steriods,something like:
> https://workona.com/ 
> https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall?hl=en

- should be pretty straightforward and simple to implement 
- the problem with workona/oneTab is they're not organized enough, I want to allow the user to create like 4-5 workspaces and then manage them
- the react app will have 5 boxes, one for each workspace (something like "school", "work", "money", etc), and inside each one the user will have access to the browser tabs and previously archived tabs. 
- Each workspace change collapses the previous one and so forth. It will also limit the amount of tabs to prevent cluttering the RAM, but there's gonna be a button that offers to archive tabs for each workspace.


# technoglogies:
- definitely a mern stack app


