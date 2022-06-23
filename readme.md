

# tabCollect

> installation: 
- after running 'npm install', create your local .env file

> run with 'npm start'


> The general idea:
- a browser management & dashboard app on steriods
- one that actually helps you to stay organized!

> the problem:
- the problem with workona/oneTab is they're not organized enough, in reality it's still easy to clutter the browser/RAM memory
- you can open as many tab groups as you like
- people open tabs according to random reasons and or situations
- modern computers allow unlimited tabs and digital clutter, because they are powerful and almost unlimited in memory (both RAM and hard drives, and cloud services, of course)
- but people still need a clear and organized desk (both virtual and physical) to work efficiently and to get distracted less

> the solution:
- the goal is to allow the user to create max 5 workspaces, and then help the user manage them
- the react app index page will have 5 assignable boxes, one for each workspace (default: "school", "work", "money", "hobbies", "family",)
- inside each one the user will have access to the browser tabs and previously archived tabs. 
- Each workspace switch collapses the previous tabs and so forth. It will also limit (default: 10 tabs) the amount of tabs to prevent cluttering the RAM and the human mind :) any additional tab (the 11th, in this case - pushes the older one to archive)
- plus, there's gonna be a button that offers to archive tabs for each workspace - on demand.
- Auto assign similar urls (for example: starting with www.google.com) to the category that already has tabs with this url
- API CRUD routes - will handle the workspace level and the single tab layer
- the data entities will be: 

> technoglogies:

- Mern stack
- SCSS, MUI
- react router
- jwt


> Roles:
- backend API & schemas & DBA - Golan
- backend API & schemas & DBA - Raphael
- front main pages - Vale
- front smaller components & front-back integration - Johnathan



> our sitemap chart:
https://drive.google.com/file/d/1cLWwhJDU3qmSbKKoNLMIZAGDjs7IqHee/view?usp=sharing



