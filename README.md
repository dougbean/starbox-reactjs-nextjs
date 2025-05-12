# starbox-reactjs-nextjs

This is the front end part of a simple barista or drink dispensing application. It is written with React (https://react.dev/) using Nextjs (https://nextjs.org/) as a framework. 

This React front end uses a .NET backend WebAPI and Sql Server. 

The backend can be found in this repository: https://github.com/dougbean/StarboxNet8CoreApiEF	

The requirements document is here - https://github.com/dougbean/StarboxNet8CoreApiEF/blob/main/StarboxLibraryNet8EF/Docs/Starbox.pdf

I followed the requirements more or less, though I used .NET for the back end rather than Ruby on Rails or Groovy on Grails.

The requirements document is a code challange presented to job applications of my former employer. I did it originally to practice and to learn new technologies, such as Angular and React.

I commented out the line in the .gitignore file that would prevent .env files from being added to github, so I could checkin hte .env.local file which contains the baseUrl for the .NET web api.

# .env.local
NEXT_PUBLIC_API_BASE_URL=https://localhost:7070/api

Run 'npm install' to install the node packages.

Run 'npm run dev' to run the react appliction. 

It runs on - http://localhost:3000