# installation: after running 'npm install', create your local .env file

# run with 'npm start'

# API endpoints:
- http://localhost:8000/v1/auth/register
- http://localhost:8000/v1/auth/login

> App name ideas:
- motivational tabs? || dontKeepTabs || ToGather || to tab or not to tab?
- new ideas: meticulous tabs || accurateTabs || dilligentTabs



> The general idea:
- a browser management & dashboard app on steriods,something that resembles the following (but does it better!):
    1. Workona - https://workona.com/ 
    2. OneTab - https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall?hl=en

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
- Each workspace switch collapses the previous tabs and so forth. It will also limit (default: 10 tabs, but editable) the amount of tabs to prevent cluttering the RAM and the human mind :) any additional tab (the 11th, in this case - pushes the older one to archive)
- plus, there's gonna be a button that offers to archive tabs for each workspace - on demand.
- Auto assign similar urls (for example: starting with www.google.com) to the category that already has tabs with this url
- API CRUD routes - will handle the workspace level and the single tab layer
- mongoDB will have the following docs: users, tokens, userWorkspaces (object that has 5 keys according to the user's workspaces, each stores two arrays - current tabs and archived tabs)

> technoglogies:

- definitely a mern stack app, SCSS, MUI
- react router


> Roles:
- backend API & schemas & DBA - Golan
- backend API & schemas & DBA - Raphael
- front - main pages - Vale
- front - smaller components - Johnathan


> design ref:
- https://codepen.io/abasiubong/pen/QWQOmqv

> our chart:
https://drive.google.com/file/d/1cLWwhJDU3qmSbKKoNLMIZAGDjs7IqHee/view?usp=sharing


> json structure ref:

{
	"User": {
		"createdAt": 1621438077211,
		"updatedAt": 1655553191476,
		"name": "",
		"id": "",
		"lastActive": 1655552745395,
		"domain": "gmail.com",
		"email": "user@gmail.com",
		"avatar": "https://lh3.googleusercontent.com/a-/token"
	},
	"Workspaces": [
		{
			"title": "Ungrouped",
			"workspaces": [
				{
					"title": "HEB & ESP & recent code",
					"color": "magenta",
					"tabs": [],
					"resources": [
						{
							"title": "Resources",
							"resources": []
						}
					],
					"notes": [
						{
							"title": "Notes",
							"notes": [
								{
									"title": "",
									"description": null,
									"attachments": []
								}
							]
						}
					],
					"tasks": [
						{
							"title": "Tasks",
							"tasks": []
						}
					]
				},
				{
					"title": "OI",
					"color": "blue",
					"tabs": [
						{
							"title": "Workona",
							"url": "https://workona.com/export/mydata/"
						},
						{
							"title": "ניהול כספיאפריל 2022 - Documentos de Google",
							"url": "https://docs.google.com/document/d/111333555/edit"
					