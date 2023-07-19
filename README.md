# web-automation-cypress
1) Make sure Node is already installed in your system
> node -v


> if that doesn't work run this command to make its installation:
> `$ curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > 
"$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"`

> visit this link for more information: 
>  https://nodejs.org/en/download/package-manager

2) run the next command to setup the project libraries

   `npm install`

4) launch cypress dashboard

   `npx cypress open`

Extras:

### Running scripts
- to list available scripts run:

   `npm run`

- to run a specific run command, use:

   `syntax: npm run <command>    // ie: "npm run cypress:dashboard"`

### Specs execution filtering
Specs execution filtering is also implemented by the specs tagging feature. So in case you are looking for running specific sets of tests, depending on its scope/functionality (ie: smoke, sanity, e2e, etc), try by using the examples below:
>
> Syntax: 
>     npx cypress run --env grepTags=<@YOUR_BEAUTIFUL_TAG>
> ie: 
>     npx cypress run --env grepTags=@smoke
>     npx cypress run --env grepTags=@e2e
>
By default al the specs that doesn't match with your tag are executed by the `it.skip` command, so if you'd like to omit them use extra parameter `grepOmitFiltered=true`
>
> ie:
>  "npx cypress run --env grepTags=@sanity,grepOmitFiltered=true"
>
