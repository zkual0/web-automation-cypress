# web-automation-cypress
#### Setup instructions
**1) Make sure Node is already installed in your system**

```
node -v
```

+ if that doesn't work run this command to make its installation:
`
$ curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
`

	visit this link for more information: https://nodejs.org/en/download/package-manager

**2) Install the project libraries**

```
npm install
```

**3) Launch the cypress dashboard**
```
npx cypress open
```

#### Extras:

**Command line scripts:**
- Set of available scripts (last update: July 19th 2023)

```
cy:open:dashboard      - opens the cypress dashboard
cy:run:full_regression - runs the full regression
cy:run:smoke           - runs smoke specs only
cy:run:sanity          - runs sanity specs only
cy:run:e2e             - runs e2e specs only
cmd:show:filter        - generates a list of available filters already 
                         implemmented in the fly
```
- to get the latest list of then use the command:

```
npm run
```

- to run a specific run script, run:

```
syntax: 
	npm run <SCRIPT_NAME>
	
ie: 
	npm run cy:open:dashboard
```

**Specs execution filtering**

Specs execution filtering is also supported by using the specs tagging feature. So in case you are looking for running specific sets of tests, depending on its scope/functionality (ie: *smoke, sanity, e2e, etc*), try by using the examples below:
```
Syntax:
	npx cypress run --env grepTags=<@YOUR_BEAUTIFUL_TAG>
	
 ie:
	npx cypress run --env grepTags=@smoke
	npx cypress run --env grepTags=@e2e
```
By default al the specs that doesn't match with your tag are executed by the `it.skip` command, so if you'd like to omit them use extra parameter `grepOmitFiltered=true`
```
ie:
	npx cypress run --env grepTags=@sanity,grepOmitFiltered=true
```
