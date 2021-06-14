# Fractional product engineer coding challenge:

## Getting started

1. Clone:
   ```bash
   git clone git@github.com:fractionalapp/product-eng-challenge.git
   cd product-eng-challenge
   ```
2. Install dependencies
   ```bash
   yarn install
   ```
3. Seed local database
   ```bash
   yarn dev:seed
   ```
4. Start server
   ```bash
   yarn dev
   ```
5. Open `http://localhost:3000`

## The Challenge

A big part of Fractional’s social platform is to build trusted communities so that our users can interact with each other and find real estate investing more educational and collaborative.

The goal of this project is to build a simplified version of Fractional’s social platform.

Like any social media platform, users have the ability to create posts on their personal timeline, follow other users, join group communities, and create posts within group communities.

For example, a user can follow their friends and other users, like a seasoned investor who specializes in owning long-term rental properties. A user can also join different group communities, like a “Dallas Fort Worth Investors” community where investors discuss trends and opportunities happening in the greater DFW market.

## Part 1: Implementation

Implement the basic functionalities of Fractional’s social platform:

- Creating posts on your own timeline (you can select a fixed user_id to represent yourself).
- Creating posts in a community (you can select a fixed user_id to represent yourself).
- (optional) Deleting your own posts.
- (optional) Commenting on another user’s posts.
- Displaying posts on a user’s timeline and a community’s feed.
  - Posts should be sorted by date, newest first.
  - Posts should be infinitely scrollable, don't download and display all entries at once.
- Consolidated newsfeed consisting of the posts from the people and communities you follow.
  - Posts should be sorted by date, newest first.
  - Posts should be infinitely scrollable, don't download and display all entries at once.

Notes:

- Feel free to change any part of the stack with what makes you most comfortable.
- Feel free to install any NPM modules that seem helpful.
- Don't worry about how “pretty” the UI looks, just make things consistent.
- Try not to spend more than a day overall.

## Part 2: Questions (optional for internship positions)

Please answer these questions after implementing:

1. If you were building this for a production environment, what changes, if any, would you make to improve team / code scalability?
2. If we had thousands of users creating thousands of posts, do you foresee any issues with scalability? If so, what would you change to make it more scalable?
3. If we wanted to improve user engagement and connectivity, what product changes do you think would be best to work on next?

## Part 3: Submit

1. (part 1) Implement your solution in a copy of this repo (please don't create a fork with your solution) and feel free to either add it to a private repo or bundle it in a zip file.
2. (part 2) Write your answers in a Notion, Google Doc, this README or whatever you feel most comfortable with.
3. (optional) Record a short walk-through of your implementation on [Loom](https://www.loom.com/)
4. Send links to all of the above to [work@fractional.app](mailto:work@fractional.app)

## File Structure

- `components/`: contains our stateless React components.
- `pages/`: contains the app's routes (the file path/name represents the route)
- `server/`: contains our GraphQL schema and resolvers
- `seed.sql`: contains a basic seed of users and communities to populate the DB locally. Feel free to add/modify tables and data as you see fit.

## Route Structure

- `/` (home page)
  - You'll see a list of communities on this page that you can navigate to.
  - Your newsfeed should be rendered in this page.
- `/community/[id]` (community page)
  - This page will contain a specific community’s information and display a list of its community members.
  - The community feed containing all the community’s posts should be rendered here.
- `/profile/[id]` (profile page)
  - This page contains some basic user information and a list of communities the user is a member of.
  - Posts created by the user (the user's timeline) should be rendered here.
- `/api/graphql` (GraphQL API)
  - Our GraphQL API is hosted here.
