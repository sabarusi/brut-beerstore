# Brút Boutique Beer
This project is a beer e-commerce made with NextJS and ChakraUI.  

It also uses Supabase as Database service, NextJS API Routes for handling requests and SWR for client-side fetching and caching.  

Both Home page and Shop page use ISG so they can be revalidated and have fresh data, but also still serve cached static data during a prudential amount of time.

In the /utils folder still persists, but commmented out, the mockup data and a basic filtering function. This was made in early development and was left there in case you want to setup the project without having to use Supabase to test it out (although some functionalities would be lost). Feel free to delete them if you clone this repository.
## Demo

https://brut-beerstore.vercel.app

## Preview
### Home
![img](https://i.imgur.com/X8lSnqa.png?1)
![img](https://i.imgur.com/mGdKBE6.png?2)
### Shop
![img](https://i.imgur.com/XHgiXYk.png)

