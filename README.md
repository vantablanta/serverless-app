## Buidling an application using React, GraphQL and AWSApp Sync

I got started with AWS Amplify just the other day. This application follows an idea from a workshop video by Nader Dabit.
Although at some point I decided to use a different approach and add abit more functionalities. My key focus in documenting this will be on GraphQL.
I used a JS backend.

### What I have implemented.

- Fetching data
- Fetching sorted data
- Adding data from the UI
- Updating data
- Deleting data

The logic can be applied for any crud application you'd like to make, in my case the data is for confrences to be held.

### Mistakes I made.

I can only term them as such coz I managed to fix them otherwise thy are bugs I encountered

- I tried passing actual values to the varaibales in my queries. I think just pass values from the frontend .
- In most cases the data being passed as a parameter will usually be a map . So, for instance you are passing an id for deletion,
  it should be inside { nameoFMutationFunction, variable : {id : {theValueAsAMAp}}}

### First time with GraphQL

To make calls to the database (Dynamo DB ), use queries,

To add, update or delete data use mutations

If you used the amplify cli to add an api these files will be generated for you.

### About Developer

When I imagined documenting this, I had a good idea of what should have been highlighted and it was interesting, but on paper it's not :(
Anyway, please go through the code it might be able to answer questions you might have.
