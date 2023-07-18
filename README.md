# web-automation-cypress
1) Make sure Node is alredy installed in your system

    `node -v`

> if that doesn't work run this command to make its installation:
> `$ curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > 
"$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"`

> visit this link for more information: 
>  https://nodejs.org/en/download/package-manager

2) run the next command to setup the project libraries

   `npm install`

4) launch cypress dashboard

   `npx cypress open`
