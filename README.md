# Zomvids
The Trial Week project developed at Zomato HQ during 6-10 May, 2019.

## Project Deliverables

Here is a list of tasks.

Design and implement a video sharing service like youtube with the below-given functionalities.

1. An API to upload a video. [Done]
2. An API to view the video. [Done]
3. User should be able to start the video from the same point where it left. [Done]
4. An API to like the video. [Not Done]
5. Share functionality for the video. [Done]
6. Create a view to list all the uploaded videos. [Done]

## Tech Stack

### Front End

* EJS

### Back End

* NodeJS
* Mongoose (MongoDB)

## Features

1. **Large File Uploads** - The project requires support for uploading files upto the size of 1 GB. So, a simple **multipart/form-data** request won't be a good choice. Instead, **chunking** is done i.e. the file is divided into fixed size chunks at the user's end and then these chunks are uploaded to server one-by-one. The server aggregates these chunks to the permanent storage thereby reducing memory footprint of both the user as well as the server.

2. **Login and Authentication** - A new user registers with the unique username and then logins to use the platform to upload videos of his own. Registration/login is not required for **viewing** videos.

3. **Resume Video** - The previously watched video resumes from the same point at which it was left earlier. This is facilitated by storing the currently watched time of each video for each user. 

  Five user events are captured to store the current time of the video being watched and inform the server about the same:

* Browser closed
* Tab closed
* Page refreshed
* Video paused
* Video seek/slided to different time

4. **Share functionality** - When a video is uploaded to server, a permanent link is generated using which this video can be shared to be viewed by anyone. The user need not login/register to view videos. However, for unregistered users, current time won't be stored and video won't be resumed from last watched time.

5. **Uploaded Videos List** - All the videos uploaded by a particular user are listed on his home page.

6. **Local File System** - Since the videos are uploaded to the local server and no third-party cloud storage is used, a local file system is designed. In this system, the videos uploaded by different users are stored in different directories as :

`<path_to_project>/uploads/<username>/video_file.mp4`
  
  
