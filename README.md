<div align="center">
  <a href="https://samay.app/">
    <img
      src="./public/favicon.svg"
      alt="Samay Logo"
      height="64"
    />
  </a>
  <p>
    <b>
      Samay — free and open source group scheduling tool
    </b>
  </p>
  <p>

[![License](https://img.shields.io/github/license/anandbaburajan/samay?color=%23000000&style=for-the-badge)](https://github.com/anandbaburajan/samay/blob/main/LICENSE)
[![Polls created: 2500+](https://shields.io/badge/style-2500+-black?&style=for-the-badge&label=Polls%20created)](https://samay.app/)
[![Create a poll](https://shields.io/badge/style-Now-black?&style=for-the-badge&label=Create%20a%20poll)](https://samay.app/)

  </p>
  <br/>
</div>

<img src="./public/banner.png" alt="Samay banner"/>

<br/>

Samay is a free and open source group scheduling tool. Quickly find a time which works for everyone without the back-and-forth texts/emails!

> #### Create a poll
>
> Select times you're free (click and drag), and optionally enter the title, description and location. The default poll type is "group" — to find a common time which works for everyone. If you want to have one-on-one meetings (parent-teacher meetings for example), select the "one-on-one" poll type.
>
> #### Share the poll
>
> Copy and share the poll link with the participants to let them mark their availability. In group polls, participants can either vote [yes] by clicking once or [if need be] by clicking twice. In one-on-one polls, participants can select their one preferred time. No login required. No time zone confusion since Samay automatically shows participants times in their local time zone.
>
> #### Book the meeting
>
> In group polls, find the most popular times and see who's free with [yes] votes - or who can be - with [if need be] votes, book the meeting and share the final time with the participants! In one-on-one polls, find who has chosen which time slot for a one-on-one with you!

Create a poll now at [Samay.app](https://samay.app/)!

## Motivation

After my GSoC '20 at LiberTEM, I wanted to have a video call with my mentors. They said yes, and since the next step was to find a suitable and common time, one of them sent me a link to a meeting poll created using a proprietary online service. It had surprisingly bad UX and was covered with advertisements. I searched for good, free and open source group scheduling tools, but didn't find any. So I decided to fix that problem.

## Get in touch

If you have suggestions for how Samay could be improved or want to report an issue, check if a corresponding GitHub issue is already opened [here](https://github.com/anandbaburajan/samay/issues), otherwise open a new issue.

## Self-hosting

### Docker

We have an experimental Docker Compose file that can be used for self-hosting without need for an external database on MongoDB Atlas or other provider. To proceed with self-hosting using Docker Compose:

1. Clone the repository.

   ``` shell
   git clone https://github.com/anandbaburajan/samay
   cd samay
   ```

2. Populate the environment variables based on `.env.docker` file based on the instructions provided in it.

   ``` shell
   cp .env.docker .env
   ```

3. Start the cluster after setting the needed values.

   ``` shell
   docker compose up --build
   ```

The web app can be accessed at http://localhost:3000.

> [!TIP]
>
> You can stop the cluster using `docker compose down` in the repository directory.
> This does not delete the volumes and data in it, to delete along with volumes (this also deletes all poll data):
> ``` shell
> docker compose down --volumes
> ```

> [!TIP]
>
> You may wish to use an external database (on Atlas), for which you can remove the `database` section in `compose.yaml` and define `NEXT_MONGODB_URI` with the connection string to the external database.


### Vercel and MongoDB Atlas

Samay is built with MongoDB and Next.js, so for a quick and free setup, you can use a free MongoDB Atlas cluster and Vercel's hobby plan.

You can get started with MongoDB Atlas for free [here](https://www.mongodb.com/basics/mongodb-atlas-tutorial). Make sure to add all IP addresses (0.0.0.0/0) to the IP access list of your Atlas cluster since it is not possible to determine the IP addresses of Vercel deployments.

You can get started with Vercel's hobby plan for free:

1. Fork this repo to your own GitHub account
2. Go to https://vercel.com/dashboard
3. Create a new project
4. Import your forked repository
5. Set the environment variables (according to the instructions in .env.example)
6. Deploy

## Contributing

### Development

First, make sure you have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials) installed. Then, to develop locally:

1. Fork this repo to your own GitHub account and then clone it.

   ```sh
   git clone https://github.com/<your-username>/samay.git
   ```

2. Go to the project folder

   ```sh
   cd samay
   ```

3. Create a new branch:

   ```sh
   git checkout -b MY_BRANCH_NAME
   ```

4. Install the dependencies with:

   ```sh
   npm i
   ```

5. Copy `.env.example` to `.env`

   ```sh
   cp .env.example .env
   ```

6. Set the env variables according to the instructions in the .env file

7. Start developing and watch for code changes:

   ```sh
   npm run dev
   ```

8. Please make sure that you can make a full production build before opening a PR. You can build the project with:

   ```sh
   npm run build
   ```

## Acknowledgements

Thanks to FOSS United for selecting Samay as one of the [winning projects](https://forum.fossunited.org/t/foss-hack-3-0-results/1882) at FOSS Hack 3.0.

Thanks to these amazing projects which help power Samay:

- React-big-calendar
- React
- Next.js
- Day.js
- Bootstrap
- MongoDB
- Mongoose
- Inter
- Cal Sans

## License

Samay is distributed under the [MIT License](https://github.com/anandbaburajan/samay/blob/main/LICENSE).
