# socketsAssets

Using this you can send assets or any other file via WebSockets. Actually, you can request any file from you `public` folder via WebSocket.

## Why

I was inspired by SPDY idea to hold one connection with server for files. It means, it is possible to save 
a lot of time and traffic by using single connection. WebSocket connection.

It is also possible to load a separate file or an array of files or even a whole directory.

Imagine you have a directory, like this:

```
...
public
  app
    login
      module.css
      module.html
      module.js
...
```

Then, you can load it by doing this:

`socketStatic.request('/app/login', someCallback);`

In your callback you'll receive an object like

```
{
  module.css: "/* another file */",
  module.html: "<!-- some html markup -->",
  module.js: "/*some content goed here like this: */ (function(){ ... })"
}
```

Almost immediately! Isn't great!

## Demo

Just clone it, run `npm install` and `node app`. After that, go to `localhost:3344`

## Plans
* I want to make it able to use some middleware in order to extend it's functionality.
* Implement caching both on client side and server side.
* Implement special methods for using caching.
* Add speed comparison test with big number of files
